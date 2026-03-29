import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const exercices_initial = [
  { id: 1, matiere: "Maths", niveau: "TS", question: "Calculer la dérivée de f(x) = x² + 3x + 2", choix: ["2x + 3", "x + 3", "2x + 2", "x² + 3"], reponse: 0 },
  { id: 2, matiere: "Maths", niveau: "3ème", question: "Résoudre : 2x + 4 = 10", choix: ["x = 2", "x = 3", "x = 4", "x = 5"], reponse: 1 },
  { id: 3, matiere: "Physique-Chimie", niveau: "TS", question: "La formule de la force en mécanique est :", choix: ["F = ma", "F = mv", "F = m/a", "F = m+a"], reponse: 0 },
  { id: 4, matiere: "Physique-Chimie", niveau: "1ère S", question: "La loi d'Ohm est :", choix: ["U = RI", "U = R/I", "U = R+I", "U = I/R"], reponse: 0 },
]

const GestionExercices = () => {
  const navigate = useNavigate()
  const [exercices] = useState(exercices_initial)

  return (
    <div className='gestion_page'>

      <div className="gestion_header">
        <div>
          <h1>📝 Gestion des exercices</h1>
          <p>Ajouter, modifier ou supprimer des exercices</p>
        </div>
        <div className="gestion_header_btns">
          <button className="filtre_btn" onClick={() => navigate('/prof')}>
            ← Retour
          </button>
          <button className="filtre_actif" onClick={() => navigate('/ajouter-exercice')}>
            + Ajouter un exercice
          </button>
        </div>
      </div>

      {/* liste exercices */}
      <div className="gestion_liste">
        {exercices.map((ex, index) => (
          <div key={ex.id} className="gestion_card">
            <div className="gestion_card_infos">
              <div className="cours_card_top">
                <span className="cours_badge">{ex.matiere}</span>
                <span className="cours_niveau">{ex.niveau}</span>
              </div>
              <h3>Question {index + 1}</h3>
              <p>{ex.question}</p>
              <span>✅ Bonne réponse : {ex.choix[ex.reponse]}</span>
            </div>
            <div className="gestion_card_btns">
              <button
                className="gestion_btn_modif"
                onClick={() => navigate(`/modifier-exercice/${ex.id}`)}
              >
                ✏️ Modifier
              </button>
              <button
                className="gestion_btn_suppr"
                onClick={() => navigate(`/supprimer-exercice/${ex.id}`)}
              >
                🗑️ Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default GestionExercices