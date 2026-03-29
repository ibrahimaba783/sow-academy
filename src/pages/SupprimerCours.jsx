import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { cours_bd } from '../data/cours_bd'

const SupprimerCours = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [supprime, setSupprime] = useState(false)

  const cours = cours_bd.find(c => c.id == id)

  if (!cours) return (
    <div className='gestion_page'>
      <h1>Cours introuvable</h1>
      <button className="filtre_btn" onClick={() => navigate('/gestion-cours')}>Retour</button>
    </div>
  )

  const handleSupprimer = () => {
    const coursSupprimes = JSON.parse(localStorage.getItem("cours_supprimes") || "[]")
    coursSupprimes.push(Number(id))
    localStorage.setItem("cours_supprimes", JSON.stringify(coursSupprimes))
    setSupprime(true)
  }

  if (supprime) return (
    <div className='gestion_page'>
      <div className="paiement_succes">
        <span>🗑️</span>
        <h2>Cours supprimé !</h2>
        <p>Le cours <strong>{cours.titre}</strong> a été supprimé.</p>
        <button className="auth_btn" onClick={() => navigate('/gestion-cours')}>
          Voir tous les cours
        </button>
      </div>
    </div>
  )

  return (
    <div className='gestion_page'>

      <div className="gestion_header">
        <div>
          <h1>🗑️ Supprimer le cours</h1>
          <p>Cette action est irréversible</p>
        </div>
        <button className="filtre_btn" onClick={() => navigate('/gestion-cours')}>
          ← Retour
        </button>
      </div>

      {/* apercu cours */}
      <div className="supprimer_apercu">
        <div className="gestion_card">
          <div className="gestion_card_infos">
            <div className="cours_card_top">
              <span className="cours_badge">{cours.matiere}</span>
              <span className="cours_niveau">{cours.niveau}</span>
            </div>
            <h3>{cours.titre}</h3>
            <p>{cours.description}</p>
            <span>⏱ {cours.duree} — {cours.chapitres?.length || 0} chapitres</span>
          </div>
        </div>
      </div>

      {/* confirmation */}
      <div className="supprimer_confirmation">
        <div className="supprimer_warning">
          <span>⚠️</span>
          <div>
            <h3>Êtes-vous sûr de vouloir supprimer ce cours ?</h3>
            <p>Tous les chapitres et leçons associés seront également supprimés. Cette action est irréversible.</p>
          </div>
        </div>

        <div className="gestion_form_btns">
          <button className="gestion_btn_suppr" style={{ padding: '12px 30px', fontSize: '16px' }}
            onClick={handleSupprimer}>
            🗑️ Oui, supprimer définitivement
          </button>
          <button className="filtre_actif" onClick={() => navigate('/gestion-cours')}>
            Annuler
          </button>
        </div>
      </div>

    </div>
  )
}

export default SupprimerCours