import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Register = () => {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    motdepasse: '',
    niveau: '',
    matiere: ''
  })
  const [erreur, setErreur] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.nom || !formData.email || !formData.motdepasse || !formData.niveau || !formData.matiere) {
      setErreur("Veuillez remplir tous les champs")
      return
    }
    const result = register(formData)
    if (result.success) navigate('/paiement')
    else setErreur(result.message)
  }

  return (
    <div className='auth_page'>
      <div className="auth_box">

        <div className="auth_header">
          <h1>🎓 SowCours</h1>
          <p>Créez votre compte étudiant</p>
        </div>

        {erreur && <div className="auth_erreur">❌ {erreur}</div>}

        <div className="auth_form">

          <div className="auth_group">
            <label>Nom complet</label>
            <input
              type="text"
              name="nom"
              placeholder="Votre nom"
              value={formData.nom}
              onChange={handleChange}
            />
          </div>

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

          <div className="auth_group">
            <label>Niveau</label>
            <select name="niveau" value={formData.niveau} onChange={handleChange}>
              <option value="">Choisir un niveau</option>
              <option value="4ème">4ème</option>
              <option value="3ème">3ème</option>
              <option value="2nde S">2nde S</option>
              <option value="1ère S">1ère S</option>
              <option value="TS">TS</option>
            </select>
          </div>

          <div className="auth_group">
            <label>Matière</label>
            <select name="matiere" value={formData.matiere} onChange={handleChange}>
              <option value="">Choisir une matière</option>
              <option value="Maths">Maths</option>
              <option value="Physique-Chimie">Physique-Chimie</option>
            </select>
          </div>

          <button className="auth_btn" onClick={handleSubmit}>
            S'inscrire
          </button>

          <p className="auth_lien">
            Déjà un compte ?
            <NavLink to="/login"> Se connecter</NavLink>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Register