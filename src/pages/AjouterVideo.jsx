import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AjouterVideo = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    titre: '', matiere: 'Maths', niveau: '4ème', description: '', url: '', source: 'YouTube'
  })
  const [erreur, setErreur] = useState('')
  const [succes, setSucces] = useState(false)
  const [preview, setPreview] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (e.target.name === 'url') setPreview('')
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

  const handlePreview = () => {
    if (!form.url) { setErreur("Entrez un lien vidéo"); return }
    setErreur('')
    setPreview(convertirUrl(form.url))
  }

  const handleSauvegarder = () => {
    if (!form.titre) { setErreur("Le titre est obligatoire"); return }
    if (!form.url) { setErreur("Le lien vidéo est obligatoire"); return }
    setErreur('')

    const ressources = JSON.parse(localStorage.getItem("ressources") || "[]")
    ressources.push({
      id: Date.now(),
      ...form,
      type: 'video',
      url: convertirUrl(form.url),
      date: new Date().toISOString().split('T')[0]
    })
    localStorage.setItem("ressources", JSON.stringify(ressources))
    setSucces(true)
  }

  if (succes) return (
    <div className='gestion_page'>
      <div className="paiement_succes">
        <span>✅</span>
        <h2>Vidéo ajoutée avec succès !</h2>
        <p><strong>{form.titre}</strong> est maintenant disponible.</p>
        <div className="gestion_form_btns">
          <button className="auth_btn" onClick={() => navigate('/ressources')}>Voir les ressources</button>
          <button className="filtre_btn" onClick={() => { setSucces(false); setForm({ titre: '', matiere: 'Maths', niveau: '4ème', description: '', url: '', source: 'YouTube' }); setPreview('') }}>
            Ajouter une autre
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className='gestion_page'>

      <div className="gestion_header">
        <div>
          <h1>🎥 Ajouter une vidéo</h1>
          <p>Ajouter un lien YouTube ou Google Drive</p>
        </div>
        <button className="filtre_btn" onClick={() => navigate('/ressources')}>← Retour</button>
      </div>

      <div className="gestion_form">
        {erreur && <div className="auth_erreur">❌ {erreur}</div>}

        <div className="gestion_form_grid">
          <div className="auth_group">
            <label>Titre de la vidéo</label>
            <input name="titre" value={form.titre} onChange={handleChange} placeholder="Ex: Introduction aux dérivées" />
          </div>
          <div className="auth_group">
            <label>Source</label>
            <select name="source" value={form.source} onChange={handleChange}>
              <option value="YouTube">YouTube</option>
              <option value="Google Drive">Google Drive</option>
              <option value="Autre">Autre</option>
            </select>
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
            <label>Lien de la vidéo</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                name="url"
                value={form.url}
                onChange={handleChange}
                placeholder="https://www.youtube.com/watch?v=..."
                style={{ flex: 1 }}
              />
              <button className="filtre_actif" onClick={handlePreview}>👁️ Aperçu</button>
            </div>
          </div>
          <div className="auth_group" style={{ gridColumn: '1 / -1' }}>
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description de la vidéo..." rows="3" />
          </div>
        </div>

        {/* preview video */}
        {preview && (
          <div className="video_preview">
            <h3>👁️ Aperçu de la vidéo</h3>
            <iframe
              src={preview}
              title="preview"
              allowFullScreen
              style={{ width: '100%', height: '300px', borderRadius: '12px', border: 'none' }}
            />
          </div>
        )}

        <div className="gestion_form_btns">
          <button className="auth_btn" onClick={handleSauvegarder}>✅ Ajouter la vidéo</button>
          <button className="filtre_btn" onClick={() => navigate('/ressources')}>Annuler</button>
        </div>
      </div>

    </div>
  )
}

export default AjouterVideo