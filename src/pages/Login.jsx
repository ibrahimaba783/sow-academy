import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({ email: '', motdepasse: '' })
  const [erreur, setErreur] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = login(formData.email, formData.motdepasse)
    if (result.success) {
      if (result.role === "prof") navigate('/prof')
      else navigate('/dashboard')
    } else {
      setErreur(result.message)
    }
  }

  return (
    <div className='auth_page'>
      <div className="auth_box">

        <div className="auth_header">
          <h1>🎓 SowCours</h1>
          <p>Connectez-vous à votre espace</p>
        </div>

        {erreur && <div className="auth_erreur">❌ {erreur}</div>}

        <div className="auth_form">

          <div className="auth_group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Votre email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="auth_group">
            <label>Mot de passe</label>
            <input
              type="password"
              name="motdepasse"
              placeholder="Votre mot de passe"
              value={formData.motdepasse}
              onChange={handleChange}
            />
          </div>

          <button className="auth_btn" onClick={handleSubmit}>
            Se connecter
          </button>

          <p className="auth_lien">
            Pas encore de compte ?
            <NavLink to="/register"> S'inscrire</NavLink>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Login