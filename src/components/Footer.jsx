import React from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()

  return (
    <footer className='sow_footer'>

      <div className="sow_footer_content">

        {/* logo */}
        <div className="sow_footer_logo">
          <h2>🎓 SowCours</h2>
          <p>Cours de Maths & Physique-Chimie en ligne avec M. ALIOU SOW</p>
        </div>

        {/* liens */}
        <div className="sow_footer_liens">
          <h4>Navigation</h4>
          <p onClick={() => navigate('/')}>Accueil</p>
          <p onClick={() => navigate('/login')}>Connexion</p>
          <p onClick={() => navigate('/register')}>S'inscrire</p>
        </div>

        {/* matieres */}
        <div className="sow_footer_liens">
          <h4>Matières</h4>
          <p>Mathématiques</p>
          <p>Physique-Chimie</p>
        </div>

        {/* contact */}
        <div className="sow_footer_liens">
          <h4>Contact</h4>
          <p>prof@sow.com</p>
          <p>6000 FCFA / matière / Annees</p>
        </div>

      </div>

      <div className="sow_footer_bottom">
        <p>© 2026 SowCours — M. ALIOU SOW. Tous droits réservés.</p>
      </div>

    </footer>
  )
}

export default Footer