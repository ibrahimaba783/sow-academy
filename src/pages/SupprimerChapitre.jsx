import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { cours_bd } from '../data/cours_bd'

const SupprimerChapitre = () => {
  const { coursId, chapitreId } = useParams()
  const navigate = useNavigate()
  const cours = cours_bd.find(c => c.id == coursId)
  const chapitre = cours?.chapitres.find(ch => ch.id == chapitreId)
  const [supprime, setSupprime] = useState(false)

  if (!cours || !chapitre) return (
    <div className='gestion_page'>
      <h1>Chapitre introuvable</h1>
      <button className="filtre_btn" onClick={() => navigate(`/gestion-chapitres/${coursId}`)}>Retour</button>
    </div>
  )

  const handleSupprimer = () => {
    const chapitresSupprimes = JSON.parse(localStorage.getItem("chapitres_supprimes") || "[]")
    chapitresSupprimes.push(Number(chapitreId))
    localStorage.setItem("chapitres_supprimes", JSON.stringify(chapitresSupprimes))
    setSupprime(true)
  }

  if (supprime) return (
    <div className='gestion_page'>
      <div className="paiement_succes">
        <span>🗑️</span>
        <h2>Chapitre supprimé !</h2>
        <p>Le chapitre <strong>{chapitre.titre}</strong> a été supprimé.</p>
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
          <h1>🗑️ Supprimer le chapitre</h1>
          <p>{cours.titre} — {cours.niveau}</p>
        </div>
        <button className="filtre_btn" onClick={() => navigate(`/gestion-chapitres/${coursId}`)}>
          ← Retour
        </button>
      </div>

      <div className="supprimer_apercu">
        <div className="gestion_card">
          <div className="gestion_card_infos">
            <h3>{chapitre.titre}</h3>
            <span>{chapitre.lecons?.length || 0} leçons associées</span>
          </div>
        </div>
      </div>

      <div className="supprimer_confirmation">
        <div className="supprimer_warning">
          <span>⚠️</span>
          <div>
            <h3>Supprimer ce chapitre ?</h3>
            <p>Toutes les leçons associées seront également supprimées. Action irréversible.</p>
          </div>
        </div>
        <div className="gestion_form_btns">
          <button className="gestion_btn_suppr"
            style={{ padding: '12px 30px', fontSize: '16px' }}
            onClick={handleSupprimer}>
            🗑️ Oui, supprimer
          </button>
          <button className="filtre_actif" onClick={() => navigate(`/gestion-chapitres/${coursId}`)}>
            Annuler
          </button>
        </div>
      </div>

    </div>
  )
}

export default SupprimerChapitre