import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AjouterPDF = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    titre: '', matiere: 'Maths', niveau: '4ème', description: ''
  })
  const [fichier, setFichier] = useState(null)
  const [erreur, setErreur] = useState('')
  const [succes, setSucces] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleFichier = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'application/pdf') {
      setFichier(file)
      setErreur('')
    } else {
      setErreur("Veuillez sélectionner un fichier PDF valide")
    }
  }

  const handleSauvegarder = () => {
    if (!form.titre) { setErreur("Le titre est obligatoire"); return }
    if (!fichier) { setErreur("Veuillez sélectionner un fichier PDF"); return }
    setErreur('')

    const ressources = JSON.parse(localStorage.getItem("ressources") || "[]")
    ressources.push({
      id: Date.now(),
      ...form,
      type: 'pdf',
      nom_fichier: fichier.name,
      url: URL.createObjectURL(fichier),
      date: new Date().toISOString().split('T')[0]
    })
    localStorage.setItem("ressources", JSON.stringify(ressources))
    setSucces(true)
  }

  if (succes) return (
    <div className='gestion_page'>
      <div className="paiement_succes">
        <span>✅</span>
        <h2>PDF ajouté avec succès !</h2>
        <p><strong>{fichier.name}</strong> a été uploadé.</p>
        <div className="gestion_form_btns">
          <button className="auth_btn" onClick={() => navigate('/ressources')}>Voir les ressources</button>
          <button className="filtre_btn" onClick={() => { setSucces(false); setForm({ titre: '', matiere: 'Maths', niveau: '4ème', description: '' }); setFichier(null) }}>
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
          <h1>📄 Ajouter un PDF</h1>
          <p>Uploader un document PDF</p>
        </div>
        <button className="filtre_btn" onClick={() => navigate('/ressources')}>← Retour</button>
      </div>

      <div className="gestion_form">
        {erreur && <div className="auth_erreur">❌ {erreur}</div>}

        <div className="gestion_form_grid">
          <div className="auth_group">
            <label>Titre du document</label>
            <input name="titre" value={form.titre} onChange={handleChange} placeholder="Ex: Cours complet — Les fonctions TS" />
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
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description du document..." rows="3" />
          </div>
        </div>

        {/* upload PDF */}
        <div className="pdf_upload_zone" onClick={() => document.getElementById('pdf_input').click()}>
          {fichier ? (
            <div className="pdf_upload_selected">
              <span>📄</span>
              <p>{fichier.name}</p>
              <span className="pdf_taille">{(fichier.size / 1024 / 1024).toFixed(2)} MB</span>
            </div>
          ) : (
            <div className="pdf_upload_placeholder">
              <span>📁</span>
              <p>Cliquez pour sélectionner un PDF</p>
              <span>ou glissez-déposez votre fichier ici</span>
            </div>
          )}
          <input
            id="pdf_input"
            type="file"
            accept=".pdf"
            onChange={handleFichier}
            style={{ display: 'none' }}
          />
        </div>

        <div className="gestion_form_btns">
          <button className="auth_btn" onClick={handleSauvegarder}>📤 Uploader le PDF</button>
          <button className="filtre_btn" onClick={() => navigate('/ressources')}>Annuler</button>
        </div>
      </div>

    </div>
  )
}

export default AjouterPDF