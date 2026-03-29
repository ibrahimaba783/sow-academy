import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { cours_bd } from '../data/cours_bd'

const AjouterLecon = () => {
  const { coursId, chapitreId } = useParams()
  const navigate = useNavigate()
  const cours = cours_bd.find(c => c.id == coursId)
  const chapitre = cours?.chapitres.find(ch => ch.id == chapitreId)

  const [form, setForm] = useState({
    titre: '',
    contenu: '',
    video_url: '',
    video_source: 'YouTube'
  })
  const [pdf, setPdf] = useState(null)
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [erreur, setErreur] = useState('')
  const [succes, setSucces] = useState(false)

  if (!cours || !chapitre) return (
    <div className='gestion_page'>
      <h1>Introuvable</h1>
      <button className="filtre_btn" onClick={() => navigate('/gestion-cours')}>Retour</button>
    </div>
  )

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
    if (!form.titre) { setErreur("Le titre est obligatoire"); return }
    if (!form.contenu) { setErreur("Le contenu est obligatoire"); return }
    setErreur('')

    const lecons = JSON.parse(localStorage.getItem(`lecons_${coursId}_${chapitreId}`) || "[]")
    lecons.push({
      id: Date.now(),
      titre: form.titre,
      contenu: form.contenu,
      video_url: form.video_url ? convertirUrl(form.video_url) : '',
      video_source: form.video_source,
      pdf_nom: pdf ? pdf.name : '',
      pdf_url: pdf ? URL.createObjectURL(pdf) : '',
      image_url: imagePreview || '',
      date: new Date().toISOString().split('T')[0]
    })
    localStorage.setItem(`lecons_${coursId}_${chapitreId}`, JSON.stringify(lecons))
    setSucces(true)
  }

  if (succes) return (
    <div className='gestion_page'>
      <div className="paiement_succes">
        <span>✅</span>
        <h2>Leçon ajoutée !</h2>
        <p>La leçon <strong>{form.titre}</strong> a été créée.</p>
        <div className="gestion_form_btns">
          <button className="auth_btn"
            onClick={() => navigate(`/gestion-lecons/${coursId}/${chapitreId}`)}>
            Voir les leçons
          </button>
          <button className="filtre_btn" onClick={() => {
            setSucces(false)
            setForm({ titre: '', contenu: '', video_url: '', video_source: 'YouTube' })
            setPdf(null)
            setImage(null)
            setImagePreview('')
          }}>
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
          <h1>➕ Ajouter une leçon</h1>
          <p>{chapitre.titre} — {cours.titre}</p>
        </div>
        <button className="filtre_btn"
          onClick={() => navigate(`/gestion-lecons/${coursId}/${chapitreId}`)}>
          ← Retour
        </button>
      </div>

      <div className="gestion_form">

        {erreur && <div className="auth_erreur">❌ {erreur}</div>}

        {/* titre */}
        <div className="auth_group">
          <label>Titre de la leçon</label>
          <input
            name="titre"
            value={form.titre}
            onChange={handleChange}
            placeholder="Ex : Définition et propriétés"
          />
        </div>

        {/* contenu */}
        <div className="auth_group">
          <label>Contenu de la leçon</label>
          <textarea
            name="contenu"
            value={form.contenu}
            onChange={handleChange}
            placeholder="Écrivez le contenu de la leçon ici..."
            rows="6"
          />
        </div>

        {/* video */}
        <div className="lecon_section">
          <h3>🎥 Vidéo</h3>
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
              <label>Lien de la vidéo (optionnel)</label>
              <input
                name="video_url"
                value={form.video_url}
                onChange={handleChange}
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>
          </div>

          {/* preview video */}
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
          <h3>📄 Document PDF</h3>
          <div
            className="pdf_upload_zone"
            onClick={() => document.getElementById('lecon_pdf').click()}
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
            <input
              id="lecon_pdf"
              type="file"
              accept=".pdf"
              onChange={handlePDF}
              style={{ display: 'none' }}
            />
          </div>
          {pdf && (
            <button
              className="gestion_btn_suppr"
              style={{ marginTop: '10px', width: 'fit-content' }}
              onClick={() => setPdf(null)}
            >
              🗑️ Supprimer le PDF
            </button>
          )}
        </div>

        {/* IMAGE */}
        <div className="lecon_section">
          <h3>🖼️ Image</h3>
          <div
            className="pdf_upload_zone"
            onClick={() => document.getElementById('lecon_image').click()}
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
            <input
              id="lecon_image"
              type="file"
              accept="image/*"
              onChange={handleImage}
              style={{ display: 'none' }}
            />
          </div>
          {imagePreview && (
            <button
              className="gestion_btn_suppr"
              style={{ marginTop: '10px', width: 'fit-content' }}
              onClick={() => { setImage(null); setImagePreview('') }}
            >
              🗑️ Supprimer l'image
            </button>
          )}
        </div>

        <div className="gestion_form_btns">
          <button className="auth_btn" onClick={handleSauvegarder}>
            ✅ Ajouter la leçon
          </button>
          <button className="filtre_btn"
            onClick={() => navigate(`/gestion-lecons/${coursId}/${chapitreId}`)}>
            Annuler
          </button>
        </div>

      </div>

    </div>
  )
}

export default AjouterLecon