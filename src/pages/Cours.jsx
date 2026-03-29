import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { cours_bd } from '../data/cours_bd'

const Cours = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [filtre, setFiltre] = useState('tous')
  const [niveau, setNiveau] = useState('tous')

  // prof a toujours accès à tout
  // étudiant voit uniquement sa matière et son niveau
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

  // prof voit tous les cours avec filtres
  // étudiant voit uniquement ses cours
  const cours_filtres = cours_bd.filter(c => {
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

      {/* filtres uniquement pour le prof */}
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

      {/* info abonnement pour etudiant */}
      {user.role === 'etudiant' && (
        <div className={`dashboard_abonnement ${aAcces(cours_filtres[0] || {}) ? 'actif' : 'inactif'}`}>
          {aAcces(cours_filtres[0] || {}) ? (
            <p>✅ Abonnement actif — {user.matiere} {user.niveau} — Accès complet</p>
          ) : (
            <div className="abonnement_inactif_content">
              <p>⚠️ Aucun abonnement actif — 6000 FCFA/an</p>
              <button onClick={() => navigate('/paiement')}>Payer maintenant</button>
            </div>
          )}
        </div>
      )}

      {/* liste cours */}
      <div className="cours_grid">
        {cours_filtres.map((cours) => (
          <div
            key={cours.id}
            className={`cours_card ${!aAcces(cours) ? 'locked' : ''}`}
            onClick={() => aAcces(cours) ? navigate(`/cours/${cours.id}`) : navigate('/paiement')}
          >
            <div className="cours_card_top">
              <span className="cours_badge">{cours.matiere}</span>
              <span className="cours_niveau">{cours.niveau}</span>
            </div>
            <h3>{cours.titre}</h3>
            <p>{cours.description}</p>
            <div className="cours_card_footer">
              <span>⏱ {cours.duree}</span>
              <span>{cours.chapitres.length} chapitres</span>
              {!aAcces(cours) && <span className="lock">🔒 Abonnement requis</span>}
            </div>
          </div>
        ))}
      </div>

      {cours_filtres.length === 0 && (
        <p className="cours_empty">Aucun cours disponible.</p>
      )}

    </div>
  )
}

export default Cours