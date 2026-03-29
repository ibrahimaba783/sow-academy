import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const exercices_initial = [
  { id: 1, matiere: "Maths", niveau: "TS", question: "Calculer la dérivée de f(x) = x² + 3x + 2", choix: ["2x + 3", "x + 3", "2x + 2", "x² + 3"], reponse: 0 },
  { id: 2, matiere: "Maths", niveau: "3ème", question: "Résoudre : 2x + 4 = 10", choix: ["x = 2", "x = 3", "x = 4", "x = 5"], reponse: 1 },
  { id: 3, matiere: "Physique-Chimie", niveau: "TS", question: "La formule de la force en mécanique est :", choix: ["F = ma", "F = mv", "F = m/a", "F = m+a"], reponse: 0 },
  { id: 4, matiere: "Physique-Chimie", niveau: "1ère S", question: "La loi d'Ohm est :", choix: ["U = RI", "U = R/I", "U = R+I", "U = I/R"], reponse: 0 },
]

const SupprimerExercice = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [supprime, setSupprime] = useState(false)

  const exercice = exercices_initial.find(e => e.id == id)

  if (!exercice) return (
    <div className='gestion_page'>
      <h1>Exercice introuvable</h1>
      <button className="filtre_btn" onClick={() => navigate('/gestion-exercices')}>Retour</button>
    </div>
  )

  const handleSupprimer = () => {
    const exercicesSupprimes = JSON.parse(localStorage.getItem("exercices_supprimes") || "[]")
    exercicesSupprimes.push(Number(id))
    localStorage.setItem("exercices_supprimes", JSON.stringify(exercicesSupprimes))
    setSupprime(true)
  }

  if (supprime) return (
    <div className='gestion_page'>
      <div className="paiement_succes">
        <span>🗑️</span>
        <h2>Exercice supprimé !</h2>
        <p>La question a été supprimée définitivement.</p>
        <button className="auth_btn" onClick={() => navigate('/gestion-exercices')}>
          Voir tous les exercices
        </button>
      </div>
    </div>
  )

  return (
    <div className='gestion_page'>

      <div className="gestion_header">
        <div>
          <h1>🗑️ Supprimer l'exercice</h1>
          <p>Cette action est irréversible</p>
        </div>
        <button className="filtre_btn" onClick={() => navigate('/gestion-exercices')}>
          ← Retour
        </button>
      </div>

      {/* apercu exercice */}
      <div className="supprimer_apercu">
        <div className="gestion_card">
          <div className="gestion_card_infos">
            <div className="cours_card_top">
              <span className="cours_badge">{exercice.matiere}</span>
              <span className="cours_niveau">{exercice.niveau}</span>
            </div>
            <h3>{exercice.question}</h3>
            <div style={{ marginTop: '10px' }}>
              {exercice.choix.map((choix, i) => (
                <p key={i} style={{ color: i === exercice.reponse ? '#059669' : '#6b7280', fontSize: '14px' }}>
                  {String.fromCharCode(65 + i)}. {choix} {i === exercice.reponse ? '✅' : ''}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* confirmation */}
      <div className="supprimer_confirmation">
        <div className="supprimer_warning">
          <span>⚠️</span>
          <div>
            <h3>Êtes-vous sûr de vouloir supprimer cet exercice ?</h3>
            <p>Cette question sera définitivement supprimée et ne sera plus accessible aux étudiants.</p>
          </div>
        </div>
        <div className="gestion_form_btns">
          <button
            className="gestion_btn_suppr"
            style={{ padding: '12px 30px', fontSize: '16px' }}
            onClick={handleSupprimer}
          >
            🗑️ Oui, supprimer définitivement
          </button>
          <button className="filtre_actif" onClick={() => navigate('/gestion-exercices')}>
            Annuler
          </button>
        </div>
      </div>

    </div>
  )
}

export default SupprimerExercice