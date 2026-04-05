import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getCours } from '../data/cours_bd' 

const Cours = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [filtre, setFiltre] = useState('tous')
  const [niveau, setNiveau] = useState('tous')

  // ✅ récupération dynamique des cours
  const cours = getCours()

  const aAcces = (cours) => {
    if (user.role === 'prof') return true
    if (!user.abonnements || user.abonnements.length === 0) return false

    const abonnement = user.abonnements.find(
      a => a.matiere === cours.matiere && a.niveau === cours.niveau
    )

    if (!abonnement) return false

    const dateExpiration = new Date(abonnement.date)
    dateExpiration.setFullYear(dateExpiration.getFullYear() + 1)

    return new Date() < dateExpiration
  }

  // ✅ on utilise maintenant "cours" au lieu de cours_bd
  const cours_filtres = cours.filter(c => {
    if (user.role === 'prof') {
      const matiereOk = filtre === 'tous' || c.matiere === filtre
      const niveauOk = niveau === 'tous' || c.niveau === niveau
      return matiereOk && niveauOk
    } else {
      return c.matiere === user.matiere && c.niveau === user.niveau
    }
  })

  return (
    <div className='cours_page'>

      <div className="cours_header">
        <h1>📚 {user.role === 'prof' ? 'Tous les cours' : 'Mes cours'}</h1>
        <p>Professeur : M. ALIOU SOW</p>
      </div>

      {user.role === 'prof' && (
        <div className="cours_filtres">

          <div className="cours_filtre_groupe">
            <label>Matière</label>
            <div className="cours_filtre_btns">
              {["tous", "Maths", "Physique-Chimie"].map(f => (
                <button
                  key={f}
                  className={filtre === f ? 'filtre_actif' : 'filtre_btn'}
                  onClick={() => setFiltre(f)}
                >
                  {f === 'tous' ? 'Toutes' : f}
                </button>
              ))}
            </div>
          </div>

          <div className="cours_filtre_groupe">
            <label>Niveau</label>
            <div className="cours_filtre_btns">
              {["tous", "4ème", "3ème", "2nde S", "1ère S", "TS"].map(n => (
                <button
                  key={n}
                  className={niveau === n ? 'filtre_actif' : 'filtre_btn'}
                  onClick={() => setNiveau(n)}
                >
                  {n === 'tous' ? 'Tous' : n}
                </button>
              ))}
            </div>
          </div>

        </div>
      )}

      {user.role === 'etudiant' && (
        <div className={`dashboard_abonnement ${aAcces(cours_filtres[0] || {}) ? 'actif' : 'inactif'}`}>
          {aAcces(cours_filtres[0] || {}) ? (
            <p>✅ Abonnement actif — {user.matiere} {user.niveau}</p>
          ) : (
            <div className="abonnement_inactif_content">
              <p>⚠️ Aucun abonnement actif — 6000 FCFA/an</p>
              <button onClick={() => navigate('/paiement')}>
                Payer maintenant
              </button>
            </div>
          )}
        </div>
      )}

      {/* 🔥 CARDS */}
      <div className="cours_grid">
        {cours_filtres.map((cours) => {
          const acces = aAcces(cours)

          return (
            <div
              key={cours.id}
              className="book"
              onClick={() =>
                acces
                  ? navigate(`/cours/${cours.id}`)
                  : navigate('/paiement')
              }
            >

              <div className="book_inner">
                <h3>{cours.titre}</h3>
                <p>{cours.description}</p>

                <p>⏱ {cours.duree}</p>
                <p>{cours.chapitres.length} chapitres</p>

                {!acces && <p>🔒 Abonnement requis</p>}
              </div>

              <div className="cover">
                <div className="cover_content">
                  <h3>
                    {cours.matiere === "Maths" ? "Maths" : "Physique"}
                  </h3>
                  <p>{cours.niveau}</p>

                  {!acces && <span>🔒</span>}
                </div>
              </div>

            </div>
          )
        })}
      </div>

      {cours_filtres.length === 0 && (
        <p className="cours_empty">Aucun cours disponible.</p>
      )}

    </div>
  )
}

export default Cours