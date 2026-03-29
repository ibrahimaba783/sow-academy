import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { cours_bd } from '../data/cours_bd'

const ModifierCours = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const coursOriginal = cours_bd.find(c => c.id == id)

  const [form, setForm] = useState({
    titre: coursOriginal?.titre || '',
    matiere: coursOriginal?.matiere || 'Maths',
    niveau: coursOriginal?.niveau || '4ème',
    description: coursOriginal?.description || '',
    duree: coursOriginal?.duree || ''
  })
  const [erreur, setErreur] = useState('')
  const [succes, setSucces] = useState(false)

  if (!coursOriginal) return (
    <div className='gestion_page'>
      <h1>Cours introuvable</h1>
      <button className="filtre_btn" onClick={() => navigate('/gestion-cours')}>Retour</button>
    </div>
  )

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSauvegarder = () => {
    if (!form.titre || !form.description || !form.duree) {
      setErreur("Veuillez remplir tous les champs")
      return
    }
    setErreur('')

    // sauvegarde modification dans localStorage
    const coursModifies = JSON.parse(localStorage.getItem("cours_modifies") || "{}")
    coursModifies[id] = { ...coursOriginal, ...form }
    localStorage.setItem("cours_modifies", JSON.stringify(coursModifies))
    setSucces(true)
  }

  if (succes) return (
    <div className='gestion_page'>
      <div className="paiement_succes">
        <span>✅</span>
        <h2>Cours modifié avec succès !</h2>
        <p>Le cours <strong>{form.titre}</strong> a été mis à jour.</p>
        <button className="auth_btn" onClick={() => navigate('/gestion-cours')}>
          Voir tous les cours
        </button>
      </div>
    </div>
  )

  return (
    <div className='gestion_page'>

      <div className="gestion_header">
        <div>
          <h1>✏️ Modifier le cours</h1>
          <p>{coursOriginal.titre}</p>
        </div>
        <button className="filtre_btn" onClick={() => navigate('/gestion-cours')}>
          ← Retour
        </button>
      </div>

      <div className="gestion_form">

        {erreur && <div className="auth_erreur">❌ {erreur}</div>}

        <div className="gestion_form_grid">

          <div className="auth_group">
            <label>Titre du cours</label>
            <input
              name="titre"
              value={form.titre}
              onChange={handleChange}
              placeholder="Titre du cours"
            />
          </div>

          <div className="auth_group">
            <label>Durée</label>
            <input
              name="duree"
              value={form.duree}
              onChange={handleChange}
              placeholder="Ex: 2h30"
            />
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

          <div className="auth_group" style={{ gridColumn: '1 / -1' }}>
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description du cours..."
              rows="4"
            />
          </div>

        </div>

        <div className="gestion_form_btns">
          <button className="auth_btn" onClick={handleSauvegarder}>
            💾 Sauvegarder les modifications
          </button>
          <button className="filtre_btn" onClick={() => navigate('/gestion-cours')}>
            Annuler
          </button>
        </div>

      </div>

    </div>
  )
}

export default ModifierCours