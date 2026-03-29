import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { evaluations_bd } from '../data/evaluations_bd'

const SupprimerEvaluation = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const evaluation = evaluations_bd.find(e => e.id == id)
  const [supprime, setSupprime] = useState(false)

  if (!evaluation) return (
    <div className='gestion_page'>
      <h1>Évaluation introuvable</h1>
      <button className="filtre_btn" onClick={() => navigate('/gestion-evaluations')}>Retour</button>
    </div>
  )

  const handleSupprimer = () => {
    const evalsSuppr = JSON.parse(localStorage.getItem("evaluations_supprimees") || "[]")
    evalsSuppr.push(Number(id))
    localStorage.setItem("evaluations_supprimees", JSON.stringify(evalsSuppr))
    setSupprime(true)
  }

  if (supprime) return (
    <div className='gestion_page'>
      <div className="paiement_succes">
        <span>🗑️</span>
        <h2>Évaluation supprimée !</h2>
        <button className="auth_btn" onClick={() => navigate('/gestion-evaluations')}>Voir les évaluations</button>
      </div>
    </div>
  )

  return (
    <div className='gestion_page'>
      <div className="gestion_header">
        <div>
          <h1>🗑️ Supprimer l'évaluation</h1>
          <p>Action irréversible</p>
        </div>
        <button className="filtre_btn" onClick={() => navigate('/gestion-evaluations')}>← Retour</button>
      </div>

      <div className="supprimer_apercu">
        <div className="gestion_card">
          <div className="gestion_card_infos">
            <div className="cours_card_top">
              <span className="cours_badge">{evaluation.matiere}</span>
              <span className="cours_niveau">{evaluation.niveau}</span>
            </div>
            <h3>{evaluation.titre}</h3>
            <p>📅 {evaluation.date} — ⏱ {evaluation.duree} — {evaluation.questions.length} questions</p>
          </div>
        </div>
      </div>

      <div className="supprimer_confirmation">
        <div className="supprimer_warning">
          <span>⚠️</span>
          <div>
            <h3>Supprimer cette évaluation ?</h3>
            <p>Cette évaluation sera définitivement supprimée.</p>
          </div>
        </div>
        <div className="gestion_form_btns">
          <button className="gestion_btn_suppr" style={{ padding: '12px 30px', fontSize: '16px' }} onClick={handleSupprimer}>
            🗑️ Oui, supprimer
          </button>
          <button className="filtre_actif" onClick={() => navigate('/gestion-evaluations')}>Annuler</button>
        </div>
      </div>
    </div>
  )
}

export default SupprimerEvaluation