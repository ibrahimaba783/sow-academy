import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { cours_bd } from '../data/cours_bd'

const SupprimerLecon = () => {
  const { coursId, chapitreId, leconId } = useParams()
  const navigate = useNavigate()
  const cours = cours_bd.find(c => c.id == coursId)
  const chapitre = cours?.chapitres.find(ch => ch.id == chapitreId)
  const lecon = chapitre?.lecons.find(l => l.id == leconId)
  const [supprime, setSupprime] = useState(false)

  if (!cours || !chapitre || !lecon) return (
    <div className='gestion_page'>
      <h1>Leçon introuvable</h1>
      <button className="filtre_btn" onClick={() => navigate(`/gestion-lecons/${coursId}/${chapitreId}`)}>Retour</button>
    </div>
  )

  const handleSupprimer = () => {
    const leconsSuppr = JSON.parse(localStorage.getItem("lecons_supprimees") || "[]")
    leconsSuppr.push(Number(leconId))
    localStorage.setItem("lecons_supprimees", JSON.stringify(leconsSuppr))
    setSupprime(true)
  }

  if (supprime) return (
    <div className='gestion_page'>
      <div className="paiement_succes">
        <span>🗑️</span>
        <h2>Leçon supprimée !</h2>
        <p>La leçon <strong>{lecon.titre}</strong> a été supprimée.</p>
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
          <h1>🗑️ Supprimer la leçon</h1>
          <p>{chapitre.titre} — {cours.titre}</p>
        </div>
        <button className="filtre_btn" onClick={() => navigate(`/gestion-lecons/${coursId}/${chapitreId}`)}>
          ← Retour
        </button>
      </div>

      <div className="supprimer_apercu">
        <div className="gestion_card">
          <div className="gestion_card_infos">
            <h3>{lecon.titre}</h3>
            {lecon.contenu && <p>{lecon.contenu.substring(0, 100)}...</p>}
          </div>
        </div>
      </div>

      <div className="supprimer_confirmation">
        <div className="supprimer_warning">
          <span>⚠️</span>
          <div>
            <h3>Supprimer cette leçon ?</h3>
            <p>Cette leçon sera définitivement supprimée. Action irréversible.</p>
          </div>
        </div>
        <div className="gestion_form_btns">
          <button className="gestion_btn_suppr"
            style={{ padding: '12px 30px', fontSize: '16px' }}
            onClick={handleSupprimer}>
            🗑️ Oui, supprimer
          </button>
          <button className="filtre_actif"
            onClick={() => navigate(`/gestion-lecons/${coursId}/${chapitreId}`)}>
            Annuler
          </button>
        </div>
      </div>

    </div>
  )
}

export default SupprimerLecon