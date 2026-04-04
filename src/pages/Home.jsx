import React from 'react'
import { useNavigate } from 'react-router-dom'
import Hero from '../components/Hero'
import { cours_bd } from '../data/cours_bd'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className='home'>

      {/* hero */}
      <Hero />

      {/* infos */}
      <section className="home_infos">
        <div className="home_info_card">
          <span>📚</span>
          <h3>2 Matières</h3>
          <p>Maths & Physique-Chimie</p>
        </div>
        <div className="home_info_card">
          <span>🎯</span>
          <h3>5 Niveaux</h3>
          <p>4ème, 3ème, 2nde S, 1ère S, TS</p>
        </div>
        <div className="home_info_card">
          <span>💰</span>
          <h3>6000 FCFA</h3>
          <p>Par matière / an</p>
        </div>
        <div className="home_info_card">
          <span>👨‍🏫</span>
          <h3>M. ALIOU SOW</h3>
          <p>Professeur expérimenté</p>
        </div>
      </section>

      {/* apercu cours — caché pour le prof */}
      {user?.role !== 'prof' && (
        <div className="home_cours">
          <h2>Nos cours disponibles</h2>
          <div className="home_cours_grid">
            {cours_bd.slice(0, 3).map((cours) => (
              <div key={cours.id} className="home_cours_card">
                <div className="home_cours_badge">{cours.matiere}</div>
                <h3>{cours.titre}</h3>
                <p>{cours.description}</p>
                <div className="home_cours_footer">
                  <span className="home_cours_niveau">{cours.niveau}</span>
                  <span className="home_cours_duree">⏱ {cours.duree}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="home_btn1"
            onClick={() => user ? navigate('/cours') : navigate('/login')}>
            Voir tous les cours →
          </button>
        </div>
      )}

      {/* espace rapide pour le prof */}
      {user?.role === 'prof' && (
        <div className="home_cours">
          <h2>Espace Professeur</h2>
          <div className="home_cours_grid">
            <div className="home_cours_card"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/prof')}>
              <div className="home_cours_badge">Dashboard</div>
              <h3>Mon tableau de bord</h3>
              <p>Gérer mes cours, étudiants et évaluations.</p>
            </div>
            <div className="home_cours_card"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/cours')}>
              <div className="home_cours_badge">Cours</div>
              <h3>Tous les cours</h3>
              <p>Voir et gérer tous les cours disponibles.</p>
            </div>
            <div className="home_cours_card"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/gestion-cours')}>
              <div className="home_cours_badge">Gestion</div>
              <h3>Gérer les cours</h3>
              <p>Ajouter, modifier ou supprimer des cours.</p>
            </div>
          </div>
          <button className="home_btn1" onClick={() => navigate('/prof')}>
            Accéder au dashboard →
          </button>
        </div>
      )}

    </div>
  )
}

export default Home