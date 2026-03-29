import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { cours_bd } from '../data/cours_bd'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const mes_cours = cours_bd.filter(c =>
    c.matiere === user.matiere && c.niveau === user.niveau
  )

  const abonnementActif = () => {
    if (!user.abonnements || user.abonnements.length === 0) return false
    const dernierPaiement = user.abonnements[user.abonnements.length - 1]
    const dateExpiration = new Date(dernierPaiement.date)
    dateExpiration.setMonth(dateExpiration.getMonth() + 1)
    return new Date() < dateExpiration
  }

  return (
    <div className='dashboard'>

      {/* header */}
      <div className="dashboard_header">
        <div>
          <h1>Bonjour, {user.nom} 👋</h1>
          <p>{user.niveau} — {user.matiere}</p>
        </div>
        <div className="dashboard_header_btns">
          <button className="dash_btn_profil" onClick={() => navigate('/profil')}>
            Mon profil
          </button>
          <button className="dash_btn_logout" onClick={() => { logout(); navigate('/') }}>
            Déconnexion
          </button>
        </div>
      </div>

      {/* statut abonnement */}
      <div className={`dashboard_abonnement ${abonnementActif() ? 'actif' : 'inactif'}`}>
        {abonnementActif() ? (
          <p>✅ Abonnement actif — Accès complet à vos cours</p>
        ) : (
          <div className="abonnement_inactif_content">
            <p>⚠️ Aucun abonnement actif — 2000 FCFA/matière/mois</p>
            <button onClick={() => navigate('/paiement')}>Payer maintenant</button>
          </div>
        )}
      </div>

      {/* mes cours */}
      <div className="dashboard_section">
        <h2>📚 Mes cours — {user.matiere} ({user.niveau})</h2>
        <div className="dashboard_cours_grid">
          {mes_cours.length === 0 ? (
            <p className="dashboard_empty">Aucun cours disponible pour votre niveau.</p>
          ) : (
            mes_cours.map((cours) => (
              <div
                key={cours.id}
                className={`dashboard_cours_card ${!abonnementActif() ? 'locked' : ''}`}
                onClick={() => abonnementActif() ? navigate(`/cours/${cours.id}`) : navigate('/paiement')}
              >
                <div className="dashboard_cours_badge">{cours.matiere}</div>
                <h3>{cours.titre}</h3>
                <p>{cours.description}</p>
                <div className="dashboard_cours_footer">
                  <span>⏱ {cours.duree}</span>
                  {!abonnementActif() && <span className="lock_icon">🔒</span>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* liens rapides */}
      <div className="dashboard_section">
        <h2>🔗 Accès rapide</h2>
        <div className="dashboard_liens">
          <div className="dashboard_lien_card" onClick={() => navigate('/exercices')}>
            <span>📝</span>
            <p>Exercices</p>
          </div>
          <div className="dashboard_lien_card" onClick={() => navigate('/forum')}>
            <span>💬</span>
            <p>Forum</p>
          </div>
          <div className="dashboard_lien_card" onClick={() => navigate('/profil')}>
            <span>👤</span>
            <p>Mon profil</p>
          </div>
          <div className="dashboard_lien_card" onClick={() => navigate('/paiement')}>
            <span>💳</span>
            <p>Paiement</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard