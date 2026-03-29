import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { evaluations_bd } from '../data/evaluations_bd'

const GestionEvaluations = () => {
  const navigate = useNavigate()
  const [evaluations] = useState(evaluations_bd)

  return (
    <div className='gestion_page'>

      <div className="gestion_header">
        <div>
          <h1>📊 Gestion des évaluations</h1>
          <p>Ajouter, modifier ou supprimer des évaluations</p>
        </div>
        <div className="gestion_header_btns">
          <button className="filtre_btn" onClick={() => navigate('/prof')}>
            ← Retour
          </button>
          <button className="filtre_actif" onClick={() => navigate('/ajouter-evaluation')}>
            + Ajouter une évaluation
          </button>
        </div>
      </div>

      <div className="gestion_liste">
        {evaluations.map((ev) => (
          <div key={ev.id} className="gestion_card">
            <div className="gestion_card_infos">
              <div className="cours_card_top">
                <span className="cours_badge">{ev.matiere}</span>
                <span className="cours_niveau">{ev.niveau}</span>
              </div>
              <h3>{ev.titre}</h3>
              <p>📅 {ev.date} — ⏱ {ev.duree} — {ev.questions.length} questions — {ev.total_points} pts</p>
            </div>
            <div className="gestion_card_btns">
              <button className="gestion_btn_modif"
                onClick={() => navigate(`/modifier-evaluation/${ev.id}`)}>
                ✏️ Modifier
              </button>
              <button className="gestion_btn_suppr"
                onClick={() => navigate(`/supprimer-evaluation/${ev.id}`)}>
                🗑️ Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default GestionEvaluations