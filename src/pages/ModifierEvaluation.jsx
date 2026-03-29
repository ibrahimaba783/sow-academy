import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { evaluations_bd } from '../data/evaluations_bd'

const ModifierEvaluation = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const evalOriginal = evaluations_bd.find(e => e.id == id)

  const [form, setForm] = useState({
    titre: evalOriginal?.titre || '',
    matiere: evalOriginal?.matiere || 'Maths',
    niveau: evalOriginal?.niveau || '4ème',
    date: evalOriginal?.date || '',
    duree: evalOriginal?.duree || '',
    total_points: evalOriginal?.total_points || 20
  })
  const [succes, setSucces] = useState(false)

  if (!evalOriginal) return (
    <div className='gestion_page'>
      <h1>Évaluation introuvable</h1>
      <button className="filtre_btn" onClick={() => navigate('/gestion-evaluations')}>Retour</button>
    </div>
  )

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSauvegarder = () => {
    const evalsModifiees = JSON.parse(localStorage.getItem("evaluations_modifiees") || "{}")
    evalsModifiees[id] = { ...evalOriginal, ...form }
    localStorage.setItem("evaluations_modifiees", JSON.stringify(evalsModifiees))
    setSucces(true)
  }

  if (succes) return (
    <div className='gestion_page'>
      <div className="paiement_succes">
        <span>✅</span>
        <h2>Évaluation modifiée !</h2>
        <button className="auth_btn" onClick={() => navigate('/gestion-evaluations')}>Voir les évaluations</button>
      </div>
    </div>
  )

  return (
    <div className='gestion_page'>
      <div className="gestion_header">
        <div>
          <h1>✏️ Modifier l'évaluation</h1>
          <p>{evalOriginal.titre}</p>
        </div>
        <button className="filtre_btn" onClick={() => navigate('/gestion-evaluations')}>← Retour</button>
      </div>

      <div className="gestion_form">
        <div className="gestion_form_grid">
          <div className="auth_group">
            <label>Titre</label>
            <input name="titre" value={form.titre} onChange={handleChange} />
          </div>
          <div className="auth_group">
            <label>Durée</label>
            <input name="duree" value={form.duree} onChange={handleChange} />
          </div>
          <div className="auth_group">
            <label>Matière</label>
            <select name="matiere" value={form.matiere} onChange={handleChange}>
              <option value="Maths">Maths</option>
              <option value="Physique-Chimie">Physique-Chimie</option>
            </select>
          </div>
          <div className="auth_group">
            <label>Niveau</label>
            <select name="niveau" value={form.niveau} onChange={handleChange}>
              <option value="4ème">4ème</option>
              <option value="3ème">3ème</option>
              <option value="2nde S">2nde S</option>
              <option value="1ère S">1ère S</option>
              <option value="TS">TS</option>
            </select>
          </div>
          <div className="auth_group">
            <label>Date</label>
            <input name="date" type="date" value={form.date} onChange={handleChange} />
          </div>
          <div className="auth_group">
            <label>Total points</label>
            <input name="total_points" type="number" value={form.total_points} onChange={handleChange} />
          </div>
        </div>

        <div className="gestion_form_btns">
          <button className="auth_btn" onClick={handleSauvegarder}>💾 Sauvegarder</button>
          <button className="filtre_btn" onClick={() => navigate('/gestion-evaluations')}>Annuler</button>
        </div>
      </div>
    </div>
  )
}

export default ModifierEvaluation