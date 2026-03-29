import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const exercices_bd = [
  { id: 1, matiere: "Maths", niveau: "TS", question: "Calculer la dérivée de f(x) = x² + 3x + 2", choix: ["2x + 3", "x + 3", "2x + 2", "x² + 3"], reponse: 0 },
  { id: 2, matiere: "Maths", niveau: "3ème", question: "Résoudre : 2x + 4 = 10", choix: ["x = 2", "x = 3", "x = 4", "x = 5"], reponse: 1 },
  { id: 3, matiere: "Physique-Chimie", niveau: "TS", question: "La formule de la force en mécanique est :", choix: ["F = ma", "F = mv", "F = m/a", "F = m+a"], reponse: 0 },
  { id: 4, matiere: "Physique-Chimie", niveau: "1ère S", question: "La loi d'Ohm est :", choix: ["U = RI", "U = R/I", "U = R+I", "U = I/R"], reponse: 0 },
]

const Exercices = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [reponses, setReponses] = useState({})
  const [valide, setValide] = useState(false)

  // ✅ sécurisation user
  const aAcces = () => {
    if (!user) return false
    if (user.role === 'prof') return true

    if (!user.abonnements || user.abonnements.length === 0) return false

    const abonnement = user.abonnements.find(
      a => a.matiere === user.matiere && a.niveau === user.niveau
    )

    if (!abonnement) return false

    const dateExpiration = new Date(abonnement.date)
    dateExpiration.setFullYear(dateExpiration.getFullYear() + 1)

    return new Date() < dateExpiration
  }

  // ✅ sécurisation user
  const mes_exercices = exercices_bd.filter(e =>
    user?.role === 'prof'
      ? true
      : e.matiere === user?.matiere && e.niveau === user?.niveau
  )

  const handleReponse = (exerciceId, choixIndex) => {
    if (valide) return
    setReponses(prev => ({ ...prev, [exerciceId]: choixIndex }))
  }

  const handleValider = () => setValide(true)

  const score = mes_exercices.filter(
    e => reponses[e.id] === e.reponse
  ).length

  // ✅ blocage sécurisé
  if (!aAcces() && user?.role !== 'prof') {
    return (
      <div className='exercices_page'>
        <h1>📝 Exercices</h1>

        <div className="cours_bloque">
          <h2>🔒 Accès restreint</h2>
          <p>Les exercices sont réservés aux abonnés.</p>

          <p>Matière : <strong>{user?.matiere}</strong></p>
          <p>Niveau : <strong>{user?.niveau}</strong></p>

          <button onClick={() => navigate('/paiement')}>
            💳 S'abonner — 6000 FCFA
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='exercices_page'>

      <h1>📝 Exercices</h1>
      <p>
        {user?.role === 'prof'
          ? 'Tous les exercices'
          : `${user?.matiere} — ${user?.niveau}`}
      </p>

      {mes_exercices.length === 0 ? (
        <p>Aucun exercice disponible.</p>
      ) : (
        <>
          <div className="exercices_liste">

            {mes_exercices.map((ex, index) => (
              <div key={ex.id} className="exercice_card">

                {/* badge prof */}
                {user?.role === 'prof' && (
                  <div>
                    <span>{ex.matiere}</span>
                    <span>{ex.niveau}</span>
                  </div>
                )}

                <h3>Question {index + 1}</h3>
                <p>{ex.question}</p>

                {/* image */}
                {ex.image_url && (
                  <img src={ex.image_url} alt="question" />
                )}

                {/* choix */}
                <div>
                  {ex.choix.map((choix, i) => (
                    <div
                      key={i}
                      onClick={() => handleReponse(ex.id, i)}
                      style={{
                        cursor: 'pointer',
                        padding: '10px',
                        margin: '5px 0',
                        border: '1px solid #ccc'
                      }}
                    >
                      {String.fromCharCode(65 + i)}. {choix}
                    </div>
                  ))}
                </div>

                {/* video */}
                {valide && ex.video_url && (
                  <iframe
                    src={ex.video_url}
                    title="correction"
                    style={{ width: '100%', height: '200px' }}
                    allowFullScreen
                  />
                )}

                {/* ✅ PDF CORRIGÉ */}
                {valide && ex.pdf_url && (
                  <a
                    href={ex.pdf_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    📥 Télécharger la correction PDF
                  </a>
                )}

              </div>
            ))}

          </div>

          {!valide ? (
            <button onClick={handleValider}>
              Valider
            </button>
          ) : (
            <div>
              <h2>Score : {score} / {mes_exercices.length}</h2>

              <button onClick={() => {
                setReponses({})
                setValide(false)
              }}>
                Recommencer
              </button>
            </div>
          )}

        </>
      )}
    </div>
  )
}

export default Exercices