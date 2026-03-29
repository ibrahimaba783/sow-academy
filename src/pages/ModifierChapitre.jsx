import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { cours_bd } from '../data/cours_bd'

const ModifierChapitre = () => {
  const { coursId, chapitreId } = useParams()
  const navigate = useNavigate()
  const cours = cours_bd.find(c => c.id == coursId)
  const chapitre = cours?.chapitres.find(ch => ch.id == chapitreId)
  const [form, setForm] = useState({ titre: chapitre?.titre || '' })
  const [erreur, setErreur] = useState('')
  const [succes, setSucces] = useState(false)

  if (!cours || !chapitre) return (
    <div className='gestion_page'>
      <h1>Chapitre introuvable</h1>
      <button className="filtre_btn" onClick={() => navigate(`/gestion-chapitres/${coursId}`)}>Retour</button>
    </div>
  )

  const handleSauvegarder = () => {
    if (!form.titre) { setErreur("Le titre est obligatoire"); return }
    setErreur('')
    const chapitresModifies = JSON.parse(localStorage.getItem("chapitres_modifies") || "{}")
    chapitresModifies[chapitreId] = { ...chapitre, titre: form.titre }
    localStorage.setItem("chapitres_modifies", JSON.stringify(chapitresModifies))
    setSucces(true)
  }

  if (succes) return (
    <div className='gestion_page'>
      <div className="paiement_succes">
        <span>✅</span>
        <h2>Chapitre modifié !</h2>
        <p>Le chapitre a été mis à jour avec succès.</p>
        <button className="auth_btn" onClick={() => navigate(`/gestion-chapitres/${coursId}`)}>
          Voir les chapitres
        </button>
      </div>
    </div>
  )

  return (
    <div className='gestion_page'>

      <div className="gestion_header">
        <div>
          <h1>✏️ Modifier le chapitre</h1>
          <p>{cours.titre} — {cours.niveau}</p>
        </div>
        <button className="filtre_btn" onClick={() => navigate(`/gestion-chapitres/${coursId}`)}>
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
            placeholder="Titre du chapitre"
          />
        </div>

        <div className="gestion_form_btns">
          <button className="auth_btn" onClick={handleSauvegarder}>
            💾 Sauvegarder
          </button>
          <button className="filtre_btn" onClick={() => navigate(`/gestion-chapitres/${coursId}`)}>
            Annuler
          </button>
        </div>

      </div>

    </div>
  )
}

export default ModifierChapitre