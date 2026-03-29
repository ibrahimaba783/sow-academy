import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AjouterCours = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    titre: '',
    matiere: 'Maths',
    niveau: '4ème',
    description: '',
    duree: '',
    video_url: '',
    video_source: 'YouTube'
  })
  const [pdf, setPdf] = useState(null)
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [erreur, setErreur] = useState('')
  const [succes, setSucces] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handlePDF = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'application/pdf') {
      setPdf(file)
      setErreur('')
    } else {
      setErreur("Veuillez sélectionner un fichier PDF valide")
    }
  }

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
      setErreur('')
    } else {
      setErreur("Veuillez sélectionner une image valide")
    }
  }

  const convertirUrl = (url) => {
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('v=')[1]?.split('&')[0]
      return `https://www.youtube.com/embed/${id}`
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0]
      return `https://www.youtube.com/embed/${id}`
    }
    if (url.includes('drive.google.com')) {
      const id = url.match(/[-\w]{25,}/)?.[0]
      return `https://drive.google.com/file/d/${id}/preview`
    }
    return url
  }

  const handleSauvegarder = () => {
    if (!form.titre || !form.description || !form.duree) {
      setErreur("Veuillez remplir tous les champs obligatoires")
      return
    }
    setErreur('')

    const cours = JSON.parse(localStorage.getItem("cours") || "[]")
    cours.push({
      ...form,
      id: Date.now(),
      chapitres: [],
      prix: 6000,
      video_url: form.video_url ? convertirUrl(form.video_url) : '',
      pdf_nom: pdf ? pdf.name : '',
      pdf_url: pdf ? URL.createObjectURL(pdf) : '',
      image_url: imagePreview || '',
      date: new Date().toISOString().split('T')[0]
    })
    localStorage.setItem("cours", JSON.stringify(cours))
    setSucces(true)
  }

  if (succes) return (
    <div className='gestion_page'>
      <div className="paiement_succes">
        <span>✅</span>
        <h2>Cours ajouté avec succès !</h2>
        <p>Le cours <strong>{form.titre}</strong> a été créé.</p>
        <div className="gestion_form_btns">
          <button className="auth_btn" onClick={() => navigate('/gestion-cours')}>
            Voir tous les cours
          </button>
          <button className="filtre_btn" onClick={() => {
            setSucces(false)
            setForm({ titre: '', matiere: 'Maths', niveau: '4ème', description: '', duree: '', video_url: '', video_source: 'YouTube' })
            setPdf(null)
            setImage(null)
            setImagePreview('')
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
        <button className="filtre_btn" onClick={() => navigate('/gestion-cours')}>
          ← Retour
        </button>
      </div>

      <div className="gestion_form">

        {erreur && <div className="auth_erreur">❌ {erreur}</div>}

        {/* infos principales */}
        <div className="lecon_section">
          <h3>📋 Informations du cours</h3>
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
        </div>

        {/* video */}
        <div className="lecon_section">
          <h3>🎥 Vidéo d'introduction (optionnel)</h3>
          <div className="gestion_form_grid">
            <div className="auth_group">
              <label>Source</label>
              <select name="video_source" value={form.video_source} onChange={handleChange}>
                <option value="YouTube">YouTube</option>
                <option value="Google Drive">Google Drive</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            <div className="auth_group">
              <label>Lien de la vidéo</label>
              <input
                name="video_url"
                value={form.video_url}
                onChange={handleChange}
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>
          </div>
          {form.video_url && (
            <div className="video_preview">
              <h4>👁️ Aperçu</h4>
              <iframe
                src={convertirUrl(form.video_url)}
                title="preview"
                allowFullScreen
                style={{ width: '100%', height: '250px', borderRadius: '12px', border: 'none', marginTop: '10px' }}
              />
            </div>
          )}
        </div>

        {/* PDF */}
        <div className="lecon_section">
          <h3>📄 Document PDF (optionnel)</h3>
          <div
            className="pdf_upload_zone"
            onClick={() => document.getElementById('cours_pdf').click()}
          >
            {pdf ? (
              <div className="pdf_upload_selected">
                <span>📄</span>
                <p>{pdf.name}</p>
                <span className="pdf_taille">{(pdf.size / 1024 / 1024).toFixed(2)} MB</span>
              </div>
            ) : (
              <div className="pdf_upload_placeholder">
                <span>📁</span>
                <p>Cliquez pour sélectionner un PDF</p>
                <span>Fichier PDF uniquement</span>
              </div>
            )}
            <input id="cours_pdf" type="file" accept=".pdf" onChange={handlePDF} style={{ display: 'none' }} />
          </div>
          {pdf && (
            <button className="gestion_btn_suppr" style={{ marginTop: '10px', width: 'fit-content' }}
              onClick={() => setPdf(null)}>
              🗑️ Supprimer le PDF
            </button>
          )}
        </div>

        {/* IMAGE */}
        <div className="lecon_section">
          <h3>🖼️ Image de couverture (optionnel)</h3>
          <div
            className="pdf_upload_zone"
            onClick={() => document.getElementById('cours_image').click()}
          >
            {imagePreview ? (
              <div className="image_preview_upload">
                <img src={imagePreview} alt="preview" />
              </div>
            ) : (
              <div className="pdf_upload_placeholder">
                <span>🖼️</span>
                <p>Cliquez pour sélectionner une image</p>
                <span>JPG, PNG, GIF acceptés</span>
              </div>
            )}
            <input id="cours_image" type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
          </div>
          {imagePreview && (
            <button className="gestion_btn_suppr" style={{ marginTop: '10px', width: 'fit-content' }}
              onClick={() => { setImage(null); setImagePreview('') }}>
              🗑️ Supprimer l'image
            </button>
          )}
        </div>

        <div className="gestion_form_btns">
          <button className="auth_btn" onClick={handleSauvegarder}>
            ✅ Ajouter le cours
          </button>
          <button className="filtre_btn" onClick={() => navigate('/gestion-cours')}>
            Annuler
          </button>
        </div>

      </div>

    </div>
  )
}

export default AjouterCours