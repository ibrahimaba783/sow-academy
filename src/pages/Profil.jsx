import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Profil = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [modif, setModif] = useState(false)
  const [nom, setNom] = useState(user.nom)

  const abonnementActif = () => {
    if (!user.abonnements || user.abonnements.length === 0) return false
    const dernierPaiement = user.abonnements[user.abonnements.length - 1]
    const dateExpiration = new Date(dernierPaiement.date)
    dateExpiration.setMonth(dateExpiration.getMonth() + 1)
    return new Date() < dateExpiration
  }

  const dateExpiration = () => {
    if (!user.abonnements || user.abonnements.length === 0) return null
    const dernierPaiement = user.abonnements[user.abonnements.length - 1]
    const date = new Date(dernierPaiement.date)
    date.setMonth(date.getMonth() + 1)
    return date.toLocaleDateString('fr-FR')
  }

  const handleSauvegarder = () => {
    const etudiants = JSON.parse(localStorage.getItem("etudiants") || "[]")
    const index = etudiants.findIndex(e => e.id === user.id)
    if (index !== -1) {
      etudiants[index].nom = nom
      localStorage.setItem("etudiants", JSON.stringify(etudiants))
    }
    setModif(false)
  }

  return (
    <div className='profil_page'>

      <div className="profil_header">
        <div className="profil_avatar">
          {user.nom.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1>{user.nom}</h1>
          <p>{user.email}</p>
          <span className="profil_role">
            {user.role === 'prof' ? '👨‍🏫 Professeur' : '👤 Étudiant'}
          </span>
        </div>
      </div>

      <div className="profil_content">

        {/* infos personnelles */}
        <div className="profil_section">
          <div className="profil_section_header">
            <h2>📋 Informations personnelles</h2>
            {user.role !== 'prof' && (
              <button
                className="filtre_btn"
                onClick={() => setModif(!modif)}
              >
                {modif ? 'Annuler' : '✏️ Modifier'}
              </button>
            )}
          </div>

          <div className="profil_infos">
            <div className="profil_info_ligne">
              <span>Nom</span>
              {modif ? (
                <input
                  className="profil_input"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                />
              ) : (
                <strong>{user.nom}</strong>
              )}
            </div>
            <div className="profil_info_ligne">
              <span>Email</span>
              <strong>{user.email}</strong>
            </div>
            {user.role !== 'prof' && (
              <>
                <div className="profil_info_ligne">
                  <span>Niveau</span>
                  <strong>{user.niveau}</strong>
                </div>
                <div className="profil_info_ligne">
                  <span>Matière</span>
                  <strong>{user.matiere}</strong>
                </div>
              </>
            )}
          </div>

          {modif && (
            <button className="auth_btn" onClick={handleSauvegarder}>
              Sauvegarder
            </button>
          )}
        </div>

        {/* abonnement */}
        {user.role !== 'prof' && (
          <div className="profil_section">
            <h2>💳 Abonnement</h2>
            <div className={`profil_abonnement ${abonnementActif() ? 'actif' : 'inactif'}`}>
              {abonnementActif() ? (
                <>
                  <div className="profil_info_ligne">
                    <span>Statut</span>
                    <strong className="statut_actif">✅ Actif</strong>
                  </div>
                  <div className="profil_info_ligne">
                    <span>Expire le</span>
                    <strong>{dateExpiration()}</strong>
                  </div>
                  <div className="profil_info_ligne">
                    <span>Matière</span>
                    <strong>{user.matiere}</strong>
                  </div>
                </>
              ) : (
                <div className="profil_inactif_content">
                  <p>⚠️ Aucun abonnement actif</p>
                  <button className="auth_btn" onClick={() => navigate('/paiement')}>
                    S'abonner — 6000 FCFA
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* historique paiements */}
        {user.role !== 'prof' && user.abonnements && user.abonnements.length > 0 && (
          <div className="profil_section">
            <h2>🧾 Historique des paiements</h2>
            <div className="profil_historique">
              {user.abonnements.map((p, i) => (
                <div key={i} className="profil_paiement">
                  <div>
                    <strong>6000 FCFA</strong>
                    <span>{p.methode}</span>
                  </div>
                  <span className="profil_date">
                    {new Date(p.date).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* deconnexion */}
        <button
          className="dash_btn_logout"
          onClick={() => { logout(); navigate('/') }}
        >
          Se déconnecter
        </button>

      </div>
    </div>
  )
}

export default Profil