import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { cours_bd } from '../data/cours_bd'

const ModifierLecon = () => {
  const { coursId, chapitreId, leconId } = useParams()
  const navigate = useNavigate()
  const cours = cours_bd.find(c => c.id == coursId)
  const chapitre = cours?.chapitres.find(ch => ch.id == chapitreId)
  const lecon = chapitre?.lecons.find(l => l.id == leconId)
  const [form, setForm] = useState({ titre: lecon?.titre || '', contenu: lecon?.contenu || '' })
  const [erreur, setErreur] = useState('')
  const [succes, setSucces] = useState(false)

  if (!cours || !chapitre || !lecon) return (
    <div className='gestion_page'>
      <h1>Leçon introuvable</h1>
      <button className="filtre_btn" onClick={() => navigate(`/gestion-lecons/${coursId}/${chapitreId}`)}>Retour</button>
    </div>
  )

  const handleSauvegarder = () => {
    if (!form.titre) { setErreur("Le titre est obligatoire"); return }
    if (!form.contenu) { setErreur("Le contenu est obligatoire"); return }
    setErreur('')
    const leconsModifiees = JSON.parse(localStorage.getItem("lecons_modifiees") || "{}")
    leconsModifiees[leconId] = { ...lecon, ...form }
    localStorage.setItem("lecons_modifiees", JSON.stringify(leconsModifiees))
    setSucces(true)
  }

  if (succes) return (
    <div className='gestion_page'>
      <div className="paiement_succes">
        <span>✅</span>
        <h2>Leçon modifiée !</h2>
        <p>La leçon <strong>{form.titre}</strong> a été mise à jour.</p>
        <button className="auth_btn" onClick={() => navigate(`/gestion-lecons/${coursId}/${chapitreId}`)}>
          Voir les leçons
        </button>
      </div>
    </div>
  )

  return (
    <div className='gestion_page'>

      <div className="gestion_header">
        <div>
          <h1>✏️ Modifier la leçon</h1>
          <p>{chapitre.titre} — {cours.titre}</p>
        </div>
        <button className="filtre_btn" onClick={() => navigate(`/gestion-lecons/${coursId}/${chapitreId}`)}>
          ← Retour
        </button>
      </div>

      <div className="gestion_form">

        {erreur && <div className="auth_erreur">❌ {erreur}</div>}

        <div className="auth_group">
          <label>Titre de la leçon</label>
          <input
            value={form.titre}
            onChange={(e) => setForm({ ...form, titre: e.target.value })}
            placeholder="Titre de la leçon"
          />
        </div>

        <div className="auth_group">
          <label>Contenu de la leçon</label>
          <textarea
            value={form.contenu}
            onChange={(e) => setForm({ ...form, contenu: e.target.value })}
            placeholder="Contenu de la leçon..."
            rows="8"
          />
        </div>

        <div className="gestion_form_btns">
          <button className="auth_btn" onClick={handleSauvegarder}>
            💾 Sauvegarder
          </button>
          <button className="filtre_btn" onClick={() => navigate(`/gestion-lecons/${coursId}/${chapitreId}`)}>
            Annuler
          </button>
        </div>

      </div>

    </div>
  )
}

export default ModifierLecon