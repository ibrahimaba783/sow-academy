import React from 'react'
import { useNavigate } from 'react-router-dom'
import Hero from '../components/Hero'
import { cours_bd } from '../data/cours_bd'

const Home = () => {
  const navigate = useNavigate()

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

      {/* apercu cours */}
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
        <button className="home_btn1" onClick={() => navigate('/login')}>
          Voir tous les cours →
        </button>
      </div>

    </div>
  )
}

export default Home