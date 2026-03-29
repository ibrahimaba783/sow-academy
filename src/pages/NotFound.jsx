import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className='notfound'>
      <div className="notfound_content">
        <h1>404</h1>
        <h2>Page introuvable</h2>
        <p>La page que vous cherchez n'existe pas ou a été déplacée.</p>
        <button className="auth_btn" onClick={() => navigate('/')}>
          Retour à l'accueil
        </button>
      </div>
    </div>
  )
}

export default NotFound