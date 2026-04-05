import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { cours_bd } from '../data/cours_bd'

const ProfDashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const etudiants = JSON.parse(localStorage.getItem("etudiants") || "[]")
  const [onglet, setOnglet] = useState("cours")

  return (
    <div className='dashboard prof_dashboard'>

      {/* header */}
      <div className="dashboard_header prof_header">
        <div>
          <h1>👨‍🏫 Prof. {user.nom}</h1>
          <p>Maths & Physique-Chimie</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button className="filtre_actif"
            onClick={() => navigate('/prof-parametres')}>
            ⚙️ Paramètres
          </button>
          <button className="dash_btn_logout"
            onClick={() => { logout(); navigate('/') }}>
            Déconnexion
          </button>
        </div>
      </div>

      {/* stats */}
      <div className="prof_stats">
        <div className="prof_stat_card">
          <h3>{etudiants.length}</h3>
          <p>Étudiants inscrits</p>
        </div>
        <div className="prof_stat_card">
          <h3>{cours_bd.length}</h3>
          <p>Cours disponibles</p>
        </div>
        <div className="prof_stat_card">
          <h3>2</h3>
          <p>Matières</p>
        </div>
        <div className="prof_stat_card">
          <h3>5</h3>
          <p>Niveaux</p>
        </div>
      </div>

      {/* boutons gestion */}
      <div className="prof_gestion_btns">
        <button className="filtre_actif" onClick={() => navigate('/gestion-cours')}>
          ⚙️ Gérer les cours
        </button>
        <button className="filtre_actif" onClick={() => navigate('/gestion-exercices')}>
          📝 Gérer les exercices
        </button>
        <button className="filtre_actif" onClick={() => navigate('/gestion-evaluations')}>
          📊 Gérer les évaluations
        </button>
        <button className="filtre_actif" onClick={() => navigate('/ressources')}>
          📚 Ressources
        </button>
      </div>

      {/* onglets */}
      <div className="prof_onglets">
        <button
          className={onglet === "cours" ? "onglet_actif" : "onglet"}
          onClick={() => setOnglet("cours")}
        >
          📚 Cours
        </button>
        <button
          className={onglet === "etudiants" ? "onglet_actif" : "onglet"}
          onClick={() => setOnglet("etudiants")}
        >
          👨‍🎓 Étudiants
        </button>
        <button
          className={onglet === "forum" ? "onglet_actif" : "onglet"}
          onClick={() => setOnglet("forum")}
        >
          💬 Forum
        </button>
      </div>

      {/* onglet cours — style book */}
      {onglet === "cours" && (
        <div className="dashboard_section">
          <h2>📚 Tous les cours</h2>
          <div className="dashboard_cours_grid">
            {cours_bd.map((cours) => (
              <div key={cours.id} className="book"
                onClick={() => navigate(`/cours/${cours.id}`)}>
                <div className="book_inner">
                  <span className="cours_badge">{cours.matiere}</span>
                  <h3>{cours.titre}</h3>
                  <p>{cours.description}</p>
                  <div className="dashboard_cours_footer">
                    <span>{cours.niveau}</span>
                    <span>⏱ {cours.duree}</span>
                  </div>
                </div>
                <div className="cover">
                  <div className="cover_content">
                    <span className="cours_badge">{cours.matiere}</span>
                    <h3>{cours.titre}</h3>
                    <span className="cours_niveau">{cours.niveau}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* onglet etudiants */}
      {onglet === "etudiants" && (
        <div className="dashboard_section">
          <h2>👨‍🎓 Liste des étudiants ({etudiants.length})</h2>
          {etudiants.length === 0 ? (
            <p className="dashboard_empty">Aucun étudiant inscrit pour le moment.</p>
          ) : (
            <div className="prof_etudiants">
              {etudiants.map((e) => (
                <div key={e.id} className="prof_etudiant_card">
                  <div className="prof_etudiant_avatar">
                    {e.nom.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3>{e.nom}</h3>
                    <p>{e.email}</p>
                    <span>{e.niveau} — {e.matiere}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* onglet forum */}
      {onglet === "forum" && (
        <div className="dashboard_section">
          <h2>💬 Forum</h2>
          <button className="auth_btn" onClick={() => navigate('/forum')}>
            Voir le forum
          </button>
        </div>
      )}

    </div>
  )
}

export default ProfDashboard