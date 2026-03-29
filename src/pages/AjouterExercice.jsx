import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AjouterExercice = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    matiere: 'Maths',
    niveau: '4ème',
    question: '',
    choix: ['', '', '', ''],
    reponse: 0,
    video_url: '',
    video_source: 'YouTube'
  })
  const [pdf, setPdf] = useState(null)
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [erreur, setErreur] = useState('')
  const [succes, setSucces] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleChoixChange = (index, valeur) => {
    const nouveauxChoix = [...form.choix]
    nouveauxChoix[index] = valeur
    setForm({ ...form, choix: nouveauxChoix })
  }

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
    if (!form.question) { setErreur("La question est obligatoire"); return }
    if (form.choix.some(c => !c)) { setErreur("Remplissez tous les choix"); return }
    setErreur('')

    const exercices = JSON.parse(localStorage.getItem("exercices") || "[]")
    exercices.push({
      ...form,
      id: Date.now(),
      reponse: Number(form.reponse),
      video_url: form.video_url ? convertirUrl(form.video_url) : '',
      pdf_nom: pdf ? pdf.name : '',
      pdf_url: pdf ? URL.createObjectURL(pdf) : '',
      image_url: imagePreview || '',
      date: new Date().toISOString().split('T')[0]
    })
    localStorage.setItem("exercices", JSON.stringify(exercices))
    setSucces(true)
  }

  if (succes) return (
    <div className='gestion_page'>
      <div className="paiement_succes">
        <span>✅</span>
        <h2>Exercice ajouté avec succès !</h2>
        <p>La question a été créée pour le niveau <strong>{form.niveau}</strong></p>
        <div className="gestion_form_btns">
          <button className="auth_btn" onClick={() => navigate('/gestion-exercices')}>
            Voir tous les exercices
          </button>
          <button className="filtre_btn" onClick={() => {
            setSucces(false)
            setForm({ matiere: 'Maths', niveau: '4ème', question: '', choix: ['', '', '', ''], reponse: 0, video_url: '', video_source: 'YouTube' })
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
          <h1>➕ Ajouter un exercice</h1>
          <p>Créer une nouvelle question</p>
        </div>
        <button className="filtre_btn" onClick={() => navigate('/gestion-exercices')}>
          ← Retour
        </button>
      </div>

      <div className="gestion_form">

        {erreur && <div className="auth_erreur">❌ {erreur}</div>}

        {/* infos */}
        <div className="gestion_form_grid">
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
            <label>Question</label>
            <textarea
              name="question"
              value={form.question}
              onChange={handleChange}
              placeholder="Écrivez la question ici..."
              rows="3"
            />
          </div>
        </div>

        {/* choix reponses */}
        <div className="lecon_section">
          <h3>🔤 Choix de réponses</h3>
          <div className="exercice_choix_form">
            {form.choix.map((choix, index) => (
              <div key={index} className="exercice_choix_ligne">
                <div
                  className={`exercice_choix_radio ${form.reponse == index ? 'radio_actif' : ''}`}
                  onClick={() => setForm({ ...form, reponse: index })}
                >
                  {String.fromCharCode(65 + index)}
                </div>
                <input
                  value={choix}
                  onChange={(e) => handleChoixChange(index, e.target.value)}
                  placeholder={`Choix ${String.fromCharCode(65 + index)}`}
                  className="exercice_choix_input"
                />
                {form.reponse == index && (
                  <span className="exercice_bonne_reponse">✅ Bonne réponse</span>
                )}
              </div>
            ))}
            <p className="exercice_hint">Cliquez sur la lettre pour définir la bonne réponse</p>
          </div>
        </div>

        {/* video */}
        <div className="lecon_section">
          <h3>🎥 Vidéo explicative (optionnel)</h3>
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
            onClick={() => document.getElementById('exercice_pdf').click()}
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
            <input id="exercice_pdf" type="file" accept=".pdf" onChange={handlePDF} style={{ display: 'none' }} />
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
          <h3>🖼️ Image (optionnel)</h3>
          <div
            className="pdf_upload_zone"
            onClick={() => document.getElementById('exercice_image').click()}
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
            <input id="exercice_image" type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
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
            ✅ Ajouter l'exercice
          </button>
          <button className="filtre_btn" onClick={() => navigate('/gestion-exercices')}>
            Annuler
          </button>
        </div>

      </div>

    </div>
  )
}

export default AjouterExercice