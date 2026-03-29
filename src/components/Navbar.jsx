import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { GiHamburgerMenu } from "react-icons/gi"
import { IoClose } from "react-icons/io5"
import logoSow from '../assets/images/logo_sow.png'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className='sow_nav'>

      {/* logo image */}
      <div className="sow_logo" onClick={() => navigate('/')}>
        <img src={logoSow} alt="SOW-ACADEMY" className="sow_logo_img" />
        <span className="sow_logo_nom">SOW-ACADEMY</span>
      </div>

      {/* liens desktop */}
      <div className="sow_lien">
        <NavLink to="/"><p>Accueil</p></NavLink>
        {user && <NavLink to="/cours"><p>Cours</p></NavLink>}
        {user && <NavLink to="/exercices"><p>Exercices</p></NavLink>}
        {user && <NavLink to="/forum"><p>Forum</p></NavLink>}
        {user && <NavLink to="/ressources"><p>Ressources</p></NavLink>}
      </div>

      {/* droite desktop */}
      <div className="sow_nav_droite">
        {user ? (
          <>
            <button className="sow_btn_dashboard"
              onClick={() => navigate(user.role === 'prof' ? '/prof' : '/dashboard')}>
              {user.role === 'prof' ? '👨‍🏫 Professeur' : '👤 Mon espace'}
            </button>
            <button className="sow_btn_logout"
              onClick={() => { logout(); navigate('/') }}>
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <button className="sow_btn_login" onClick={() => navigate('/login')}>
              Connexion
            </button>
            <button className="sow_btn_register" onClick={() => navigate('/register')}>
              S'inscrire
            </button>
          </>
        )}
      </div>

      {/* burger mobile */}
      <div className="sow_burger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <IoClose /> : <GiHamburgerMenu />}
      </div>

      {/* menu mobile */}
      {menuOpen && (
        <div className="sow_menu_mobile">
          <NavLink to="/" onClick={() => setMenuOpen(false)}><p>Accueil</p></NavLink>
          {user && <NavLink to="/cours" onClick={() => setMenuOpen(false)}><p>Cours</p></NavLink>}
          {user && <NavLink to="/exercices" onClick={() => setMenuOpen(false)}><p>Exercices</p></NavLink>}
          {user && <NavLink to="/forum" onClick={() => setMenuOpen(false)}><p>Forum</p></NavLink>}
          {user && <NavLink to="/ressources" onClick={() => setMenuOpen(false)}><p>Ressources</p></NavLink>}
          {user ? (
            <>
              <p onClick={() => { navigate(user.role === 'prof' ? '/prof' : '/dashboard'); setMenuOpen(false) }}>
                Mon espace
              </p>
              <p onClick={() => { logout(); navigate('/'); setMenuOpen(false) }}>
                Déconnexion
              </p>
            </>
          ) : (
            <>
              <p onClick={() => { navigate('/login'); setMenuOpen(false) }}>Connexion</p>
              <p onClick={() => { navigate('/register'); setMenuOpen(false) }}>S'inscrire</p>
            </>
          )}
        </div>
      )}

    </nav>
  )
}

export default Navbar