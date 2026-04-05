import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { cours_bd } from '../data/cours_bd'

const GestionChapitres = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  // cherche dans cours_bd ET dans localStorage
  const getTousCours = () => {
    const coursLocal = JSON.parse(localStorage.getItem("tous_cours") || "[]")
    return [...cours_bd, ...coursLocal]
  }

  const cours = getTousCours().find(c => c.id == id)
  const [chapitres, setChapitres] = useState(cours?.chapitres || [])
  const [confirmation, setConfirmation] = useState(null)
  const [mode, setMode] = useState(null)
  const [chapitreSelectionne, setChapitreSelectionne] = useState(null)
  const [form, setForm] = useState({ titre: '' })

  if (!cours) return (
    <div className='gestion_page'>
      <h1>Cours introuvable</h1>
      <button className="filtre_btn" onClick={() => navigate('/gestion-cours')}>Retour</button>
    </div>
  )

  const sauvegarderChapitres = (nouveauxChapitres) => {
    // met à jour dans localStorage
    const coursLocal = JSON.parse(localStorage.getItem("tous_cours") || "[]")
    const indexLocal = coursLocal.findIndex(c => c.id == id)
    if (indexLocal !== -1) {
      coursLocal[indexLocal].chapitres = nouveauxChapitres
      localStorage.setItem("tous_cours", JSON.stringify(coursLocal))
    } else {
      // cours de cours_bd — sauvegarde dans cours_modifies
      const coursModifies = JSON.parse(localStorage.getItem("cours_modifies") || "{}")
      coursModifies[id] = { ...cours, chapitres: nouveauxChapitres }
      localStorage.setItem("cours_modifies", JSON.stringify(coursModifies))
    }
    setChapitres(nouveauxChapitres)
  }

  const handleAjouter = () => {
    setMode('ajouter')
    setForm({ titre: '' })
  }

  const handleModifier = (ch) => {
    setMode('modifier')
    setChapitreSelectionne(ch)
    setForm({ titre: ch.titre })
  }

  const handleSauvegarder = () => {
    if (!form.titre) return
    let nouveauxChapitres
    if (mode === 'ajouter') {
      nouveauxChapitres = [...chapitres, { id: Date.now(), titre: form.titre, lecons: [] }]
    } else {
      nouveauxChapitres = chapitres.map(ch =>
        ch.id === chapitreSelectionne.id ? { ...ch, titre: form.titre } : ch
      )
    }
    sauvegarderChapitres(nouveauxChapitres)
    setMode(null)
  }

  const handleSupprimer = (chapId) => {
    const nouveauxChapitres = chapitres.filter(ch => ch.id !== chapId)
    sauvegarderChapitres(nouveauxChapitres)
    setConfirmation(null)
  }

  return (
    <div className='gestion_page'>

      <div className="gestion_header">
        <div>
          <h1>📋 Chapitres — {cours.titre}</h1>
          <p>{cours.matiere} — {cours.niveau}</p>
        </div>
        <div className="gestion_header_btns">
          <button className="filtre_btn" onClick={() => navigate('/gestion-cours')}>← Retour</button>
          <button className="filtre_actif" onClick={handleAjouter}>+ Ajouter un chapitre</button>
        </div>
      </div>

      {/* formulaire */}
      {mode && (
        <div className="gestion_form">
          <h2>{mode === 'ajouter' ? '➕ Nouveau chapitre' : '✏️ Modifier le chapitre'}</h2>
          <div className="auth_group">
            <label>Titre du chapitre</label>
            <input
              value={form.titre}
              onChange={(e) => setForm({ titre: e.target.value })}
              placeholder="Titre du chapitre"
            />
          </div>
          <div className="gestion_form_btns">
            <button className="auth_btn" onClick={handleSauvegarder}>
              {mode === 'ajouter' ? 'Ajouter' : 'Sauvegarder'}
            </button>
            <button className="filtre_btn" onClick={() => setMode(null)}>Annuler</button>
          </div>
        </div>
      )}

      {/* liste chapitres */}
      <div className="gestion_liste">
        {chapitres.length === 0 && (
          <p className="cours_empty">Aucun chapitre. Ajoutez-en un !</p>
        )}
        {chapitres.map((ch, index) => (
          <div key={ch.id} className="gestion_card">
            <div className="gestion_card_infos">
              <h3>{index + 1}. {ch.titre}</h3>
              <span>{ch.lecons?.length || 0} leçons</span>
            </div>
            <div className="gestion_card_btns">
              <button className="filtre_btn"
                onClick={() => navigate(`/gestion-lecons/${cours.id}/${ch.id}`)}>
                📖 Leçons
              </button>
              <button className="gestion_btn_modif" onClick={() => handleModifier(ch)}>
                ✏️ Modifier
              </button>
              <button className="gestion_btn_suppr" onClick={() => setConfirmation(ch.id)}>
                🗑️ Supprimer
              </button>
            </div>

            {confirmation === ch.id && (
              <div className="gestion_confirmation">
                <p>Supprimer <strong>{ch.titre}</strong> ?</p>
                <button className="gestion_btn_suppr" onClick={() => handleSupprimer(ch.id)}>
                  Oui
                </button>
                <button className="filtre_btn" onClick={() => setConfirmation(null)}>
                  Annuler
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  )
}

export default GestionChapitres