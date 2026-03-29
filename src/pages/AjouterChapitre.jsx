import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { cours_bd } from '../data/cours_bd'

const AjouterChapitre = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const cours = cours_bd.find(c => c.id == id)
  const [form, setForm] = useState({ titre: '' })
  const [erreur, setErreur] = useState('')
  const [succes, setSucces] = useState(false)

  if (!cours) return (
    <div className='gestion_page'>
      <h1>Cours introuvable</h1>
      <button className="filtre_btn" onClick={() => navigate('/gestion-cours')}>Retour</button>
    </div>
  )

  const handleSauvegarder = () => {
    if (!form.titre) { setErreur("Le titre est obligatoire"); return }
    setErreur('')
    const chapitres = JSON.parse(localStorage.getItem(`chapitres_${id}`) || "[]")
    chapitres.push({ id: Date.now(), titre: form.titre, lecons: [] })
    localStorage.setItem(`chapitres_${id}`, JSON.stringify(chapitres))
    setSucces(true)
  }

  if (succes) return (
    <div className='gestion_page'>
      <div className="paiement_succes">
        <span>✅</span>
        <h2>Chapitre ajouté !</h2>
        <p>Le chapitre <strong>{form.titre}</strong> a été créé.</p>
        <div className="gestion_form_btns">
          <button className="auth_btn" onClick={() => navigate(`/gestion-chapitres/${id}`)}>
            Voir les chapitres
          </button>
          <button className="filtre_btn" onClick={() => { setSucces(false); setForm({ titre: '' }) }}>
            Ajouter un autre
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className='gestion_page'>

      <div className="gestion_header">
        <div>
          <h1>➕ Ajouter un chapitre</h1>
          <p>{cours.titre} — {cours.niveau}</p>
        </div>
        <button className="filtre_btn" onClick={() => navigate(`/gestion-chapitres/${id}`)}>
          ← Retour
        </button>
      </div>

      <div className="gestion_form">

        {erreur && <div className="auth_erreur">❌ {erreur}</div>}

        <div className="auth_group">
          <label>Titre du chapitre</label>
          <input
            value={form.titre}
            onChange={(e) => setForm({ titre: e.target.value })}
            placeholder="Ex: Les fonctions dérivées"
          />
        </div>

        <div className="gestion_form_btns">
          <button className="auth_btn" onClick={handleSauvegarder}>
            ✅ Ajouter le chapitre
          </button>
          <button className="filtre_btn" onClick={() => navigate(`/gestion-chapitres/${id}`)}>
            Annuler
          </button>
        </div>

      </div>

    </div>
  )
}

export default AjouterChapitre