import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import profSow from '../assets/images/prof_sow.jpg'
import logoSow from '../assets/images/logo_sow.png'

const Hero = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className='sow_hero'>

      {/* image de fond prof SOW */}
      <div className="sow_hero_bg">
        <img src={profSow} alt="Prof ALIOU SOW" />
        <div className="sow_hero_overlay"></div>
      </div>

      <div className="sow_hero_content">

        <div className="sow_hero_badge">
          <img src={logoSow} alt="SOW-ACADEMY" className="sow_logo_badge" />
          M. ALIOU SOW — Professeur certifié
        </div>

        <h1>
          Apprenez les <span>Maths</span> et la <span>Physique-Chimie</span> en ligne
        </h1>

        <p>
          Des cours de qualité pour les niveaux 4ème, 3ème, 2nde S, 1ère S et TS.
          Accédez à des ressources pédagogiques, des exercices et un forum de discussion.
        </p>

        <div className="sow_hero_infos">
          <div className="sow_hero_info">
            <strong>📚 2 Matières</strong>
            <span>Maths & Physique-Chimie</span>
          </div>
          <div className="sow_hero_info">
            <strong>🎯 5 Niveaux</strong>
            <span>4ème au TS</span>
          </div>
          <div className="sow_hero_info">
            <strong>💰 6000 FCFA</strong>
            <span>Par matière / an</span>
          </div>
        </div>

        <div className="sow_hero_btns">
          {user ? (
            <button className="sow_hero_btn1"
              onClick={() => navigate(user.role === 'prof' ? '/prof' : '/dashboard')}>
              Mon espace →
            </button>
          ) : (
            <>
              <button className="sow_hero_btn1" onClick={() => navigate('/register')}>
                S'inscrire — 6000 FCFA/an
              </button>
              <button className="sow_hero_btn2" onClick={() => navigate('/login')}>
                Se connecter
              </button>
            </>
          )}
        </div>

      </div>

      {/* carte droite */}
      <div className="sow_hero_droite">
        <div className="sow_hero_card">
          <img src={logoSow} alt="SOW-ACADEMY" className="sow_hero_card_logo" />
          <h3>SOW-ACADEMY</h3>
          <p>Plateforme de cours en ligne</p>
          <div className="sow_hero_card_infos">
            <div><strong>+50</strong><span>Cours</span></div>
            <div><strong>5</strong><span>Niveaux</span></div>
            <div><strong>1 an</strong><span>Validité</span></div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Hero