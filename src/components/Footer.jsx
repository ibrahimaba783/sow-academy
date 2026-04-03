import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPhone, FaWhatsapp } from "react-icons/fa"
import { MdEmail } from "react-icons/md"

const Footer = () => {
  const navigate = useNavigate()

  // ✅ WhatsApp avec message
  const whatsappLink =
    "https://wa.me/221771023399?text=Bonjour%20je%20veux%20des%20informations%20sur%20SOW-ACADEMY"

  return (
    <footer className='sow_footer'>

      <div className="sow_footer_content">

        {/* logo + contact */}
        <div className="sow_footer_logo">
          <h2>🎓 SOW-ACADEMY</h2>
          <p>Cours de Maths & Physique-Chimie en ligne avec M. ALIOU SOW</p>

          <div className="sow_footer_contact">

            {/* téléphone */}
            <a href="tel:+221771023399" className="sow_footer_tel">
              <FaPhone />
              <span>+221 77 102 33 99</span>
            </a>

            {/* WhatsApp */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="sow_footer_tel"
            >
              <FaWhatsapp />
              <span>WhatsApp</span>
            </a>

            {/* ✅ email corrigé */}
            <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=Sowaliou2504@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="sow_footer_tel"
          >
            <MdEmail />
            <span>Sowaliou2504@gmail.com</span>
          </a>

          </div>
        </div>

        {/* navigation */}
        <div className="sow_footer_liens">
          <h4>Navigation</h4>

          <p onClick={() => navigate('/')}>Accueil</p>
          <p onClick={() => navigate('/login')}>Connexion</p>
          <p onClick={() => navigate('/register')}>S'inscrire</p>

        </div>

        {/* matières */}
        <div className="sow_footer_liens">
          <h4>Matières</h4>

          <p>Mathématiques</p>
          <p>Physique-Chimie</p>

        </div>

        {/* niveaux */}
        <div className="sow_footer_liens">
          <h4>Niveaux</h4>

          <p>4ème & 3ème</p>
          <p>2nde S & 1ère S</p>
          <p>Terminale S</p>
          <p>6000 FCFA / an</p>

        </div>

      </div>

      {/* bas du footer */}
      <div className="sow_footer_bottom">
        <p>
          © {new Date().getFullYear()} SOW-ACADEMY — M. ALIOU SOW. Tous droits réservés.
        </p>
      </div>

    </footer>
  )
}

export default Footer