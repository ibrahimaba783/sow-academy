import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AjouterCours = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    titre: '', matiere: 'Maths', niveau: '4ème', description: '', duree: ''
  })
  const [erreur, setErreur] = useState('')
  const [succes, setSucces] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSauvegarder = () => {
    if (!form.titre || !form.description || !form.duree) {
      setErreur("Veuillez remplir tous les champs")
      return
    }
    setErreur('')
    const cours = JSON.parse(localStorage.getItem("cours") || "[]")
    const nouveau = { ...form, id: Date.now(), chapitres: [], prix: 6000 }
    cours.push(nouveau)
    localStorage.setItem("cours", JSON.stringify(cours))
    setSucces(true)
  }

  if (succes) return (
    <div className='gestion_page'>
      <div className="paiement_succes">
        <span>✅</span>
        <h2>Cours ajouté !</h2>
        <p><strong>{form.titre}</strong> a été créé.</p>
        <div className="gestion_form_btns">
          <button className="auth_btn" onClick={() => navigate('/gestion-cours')}>
            Voir tous les cours
          </button>
          <button className="filtre_btn" onClick={() => {
            setSucces(false)
            setForm({ titre: '', matiere: 'Maths', niveau: '4ème', description: '', duree: '' })
          }}>
            Ajouter un autre
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className='gestion_page'>
      <div className="gestion_header">
        <div>
          <h1>➕ Ajouter un cours</h1>
          <p>Créer un nouveau cours</p>
        </div>
        <button className="filtre_btn" onClick={() => navigate('/gestion-cours')}>← Retour</button>
      </div>

      <div className="gestion_form">
        {erreur && <div className="auth_erreur">❌ {erreur}</div>}

        <div className="gestion_form_grid">
          <div className="auth_group">
            <label>Titre du cours *</label>
            <input name="titre" value={form.titre} onChange={handleChange} placeholder="Ex: Les fonctions" />
          </div>
          <div className="auth_group">
            <label>Durée *</label>
            <input name="duree" value={form.duree} onChange={handleChange} placeholder="Ex: 2h30" />
          </div>
          <div className="auth_group">
            <label>Matière *</label>
            <select name="matiere" value={form.matiere} onChange={handleChange}>
              <option value="Maths">Maths</option>
              <option value="Physique-Chimie">Physique-Chimie</option>
            </select>
          </div>
          <div className="auth_group">
            <label>Niveau *</label>
            <select name="niveau" value={form.niveau} onChange={handleChange}>
              <option value="4ème">4ème</option>
              <option value="3ème">3ème</option>
              <option value="2nde S">2nde S</option>
              <option value="1ère S">1ère S</option>
              <option value="TS">TS</option>
            </select>
          </div>
          <div className="auth_group" style={{ gridColumn: '1 / -1' }}>
            <label>Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange}
              placeholder="Description du cours..." rows="3" />
          </div>
          <div className="auth_group">
            <label>Prix</label>
            <input value="6000 FCFA" disabled style={{ opacity: 0.6 }} />
          </div>
        </div>

        <div className="gestion_form_btns">
          <button className="auth_btn" onClick={handleSauvegarder}>✅ Ajouter le cours</button>
          <button className="filtre_btn" onClick={() => navigate('/gestion-cours')}>Annuler</button>
        </div>
      </div>
    </div>
  )
}

export default AjouterCours