import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { cours_bd } from '../data/cours_bd'

const GestionLecons = () => {
  const { coursId, chapitreId } = useParams()
  const navigate = useNavigate()

  // cherche dans cours_bd ET dans localStorage
  const getTousCours = () => {
    const coursLocal = JSON.parse(localStorage.getItem("tous_cours") || "[]")
    const coursModifies = JSON.parse(localStorage.getItem("cours_modifies") || "{}")
    const tousLesCours = [...cours_bd, ...coursLocal]
    return tousLesCours.map(c => coursModifies[c.id] ? coursModifies[c.id] : c)
  }

  const cours = getTousCours().find(c => c.id == coursId)
  const chapitre = cours?.chapitres?.find(ch => ch.id == chapitreId)

  const [lecons, setLecons] = useState(chapitre?.lecons || [])
  const [confirmation, setConfirmation] = useState(null)
  const [mode, setMode] = useState(null)
  const [leconSelectionnee, setLeconSelectionnee] = useState(null)
  const [form, setForm] = useState({ titre: '', contenu: '', video_url: '' })

  if (!cours || !chapitre) return (
    <div className='gestion_page'>
      <h1>Introuvable</h1>
      <button className="filtre_btn" onClick={() => navigate('/gestion-cours')}>Retour</button>
    </div>
  )

  const sauvegarderLecons = (nouvellesLecons) => {
    const tousCours = getTousCours()
    const coursLocal = JSON.parse(localStorage.getItem("tous_cours") || "[]")
    const indexLocal = coursLocal.findIndex(c => c.id == coursId)

    if (indexLocal !== -1) {
      coursLocal[indexLocal].chapitres = coursLocal[indexLocal].chapitres.map(ch =>
        ch.id == chapitreId ? { ...ch, lecons: nouvellesLecons } : ch
      )
      localStorage.setItem("tous_cours", JSON.stringify(coursLocal))
    } else {
      const coursModifies = JSON.parse(localStorage.getItem("cours_modifies") || "{}")
      const coursActuel = coursModifies[coursId] || cours
      coursModifies[coursId] = {
        ...coursActuel,
        chapitres: coursActuel.chapitres.map(ch =>
          ch.id == chapitreId ? { ...ch, lecons: nouvellesLecons } : ch
        )
      }
      localStorage.setItem("cours_modifies", JSON.stringify(coursModifies))
    }
    setLecons(nouvellesLecons)
  }

  const handleAjouter = () => {
    setMode('ajouter')
    setForm({ titre: '', contenu: '', video_url: '' })
  }

  const handleModifier = (l) => {
    setMode('modifier')
    setLeconSelectionnee(l)
    setForm({ titre: l.titre, contenu: l.contenu || '', video_url: l.video_url || '' })
  }

  const handleSauvegarder = () => {
    if (!form.titre) return
    let nouvellesLecons
    if (mode === 'ajouter') {
      nouvellesLecons = [...lecons, { id: Date.now(), ...form }]
    } else {
      nouvellesLecons = lecons.map(l =>
        l.id === leconSelectionnee.id ? { ...l, ...form } : l
      )
    }
    sauvegarderLecons(nouvellesLecons)
    setMode(null)
  }

  const handleSupprimer = (leconId) => {
    const nouvellesLecons = lecons.filter(l => l.id !== leconId)
    sauvegarderLecons(nouvellesLecons)
    setConfirmation(null)
  }

  return (
    <div className='gestion_page'>

      <div className="gestion_header">
        <div>
          <h1>📖 Leçons — {chapitre.titre}</h1>
          <p>{cours.titre} — {cours.niveau}</p>
        </div>
        <div className="gestion_header_btns">
          <button className="filtre_btn"
            onClick={() => navigate(`/gestion-chapitres/${coursId}`)}>
            ← Retour
          </button>
          <button className="filtre_actif" onClick={handleAjouter}>
            + Ajouter une leçon
          </button>
        </div>
      </div>

      {/* formulaire */}
      {mode && (
        <div className="gestion_form">
          <h2>{mode === 'ajouter' ? '➕ Nouvelle leçon' : '✏️ Modifier la leçon'}</h2>
          <div className="gestion_form_grid">
            <div className="auth_group">
              <label>Titre de la leçon *</label>
              <input
                value={form.titre}
                onChange={(e) => setForm({ ...form, titre: e.target.value })}
                placeholder="Titre de la leçon"
              />
            </div>
            <div className="auth_group">
              <label>🎥 Lien vidéo (optionnel)</label>
              <input
                value={form.video_url}
                onChange={(e) => setForm({ ...form, video_url: e.target.value })}
                placeholder="https://youtube.com/..."
              />
            </div>
            <div className="auth_group" style={{ gridColumn: '1 / -1' }}>
              <label>Contenu de la leçon</label>
              <textarea
                value={form.contenu}
                onChange={(e) => setForm({ ...form, contenu: e.target.value })}
                placeholder="Contenu de la leçon..."
                rows="5"
              />
            </div>
          </div>
          <div className="gestion_form_btns">
            <button className="auth_btn" onClick={handleSauvegarder}>
              {mode === 'ajouter' ? '✅ Ajouter' : '💾 Sauvegarder'}
            </button>
            <button className="filtre_btn" onClick={() => setMode(null)}>Annuler</button>
          </div>
        </div>
      )}

      {/* liste lecons */}
      <div className="gestion_liste">
        {lecons.length === 0 && (
          <p className="cours_empty">Aucune leçon. Ajoutez-en une !</p>
        )}
        {lecons.map((l, index) => (
          <div key={l.id} className="gestion_card">
            <div className="gestion_card_infos">
              <h3>Leçon {index + 1} : {l.titre}</h3>
              {l.contenu && <p>{l.contenu.substring(0, 100)}...</p>}
              {l.video_url && <span>🎥 Vidéo disponible</span>}
            </div>
            <div className="gestion_card_btns">
              <button className="gestion_btn_modif" onClick={() => handleModifier(l)}>
                ✏️ Modifier
              </button>
              <button className="gestion_btn_suppr" onClick={() => setConfirmation(l.id)}>
                🗑️ Supprimer
              </button>
            </div>

            {confirmation === l.id && (
              <div className="gestion_confirmation">
                <p>Supprimer <strong>{l.titre}</strong> ?</p>
                <button className="gestion_btn_suppr" onClick={() => handleSupprimer(l.id)}>
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

export default GestionLecons