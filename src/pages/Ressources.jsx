import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ressources_bd } from '../data/ressources_bd'

const Ressources = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [filtre, setFiltre] = useState('tous')
  const [type, setType] = useState('tous')
  const [niveau, setNiveau] = useState('tous')
  const [videoActive, setVideoActive] = useState(null)

  const ressourcesLocales = JSON.parse(localStorage.getItem("ressources") || "[]")
  const toutes_ressources = [...ressources_bd, ...ressourcesLocales]

  const ressources_filtrees = toutes_ressources.filter(r => {
    const matiereOk = filtre === 'tous' || r.matiere === filtre
    const typeOk = type === 'tous' || r.type === type
    const niveauOk = niveau === 'tous' || r.niveau === niveau
    return matiereOk && typeOk && niveauOk
  })

  return (
    <div className='ressources_page'>

      <div className="cours_header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h1>📚 Ressources pédagogiques</h1>
            <p>PDF et vidéos de M. ALIOU SOW</p>
          </div>
          {user.role === 'prof' && (
            <div className="gestion_header_btns">
              <button className="filtre_actif" onClick={() => navigate('/ajouter-pdf')}>📄 Ajouter PDF</button>
              <button className="filtre_actif" onClick={() => navigate('/ajouter-video')}>🎥 Ajouter Vidéo</button>
            </div>
          )}
        </div>
      </div>

      {/* filtres */}
      <div className="cours_filtres">
        <div className="cours_filtre_groupe">
          <label>Type</label>
          <div className="cours_filtre_btns">
            {["tous", "pdf", "video"].map(t => (
              <button key={t} className={type === t ? 'filtre_actif' : 'filtre_btn'} onClick={() => setType(t)}>
                {t === 'tous' ? 'Tous' : t === 'pdf' ? '📄 PDF' : '🎥 Vidéo'}
              </button>
            ))}
          </div>
        </div>
        <div className="cours_filtre_groupe">
          <label>Matière</label>
          <div className="cours_filtre_btns">
            {["tous", "Maths", "Physique-Chimie"].map(f => (
              <button key={f} className={filtre === f ? 'filtre_actif' : 'filtre_btn'} onClick={() => setFiltre(f)}>
                {f === 'tous' ? 'Toutes' : f}
              </button>
            ))}
          </div>
        </div>
        <div className="cours_filtre_groupe">
          <label>Niveau</label>
          <div className="cours_filtre_btns">
            {["tous", "4ème", "3ème", "2nde S", "1ère S", "TS"].map(n => (
              <button key={n} className={niveau === n ? 'filtre_actif' : 'filtre_btn'} onClick={() => setNiveau(n)}>
                {n === 'tous' ? 'Tous' : n}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* liste ressources */}
      <div className="ressources_grid">
        {ressources_filtrees.map((r) => (
          <div key={r.id} className="ressource_card">
            <div className="ressource_card_top">
              <span className={`ressource_type_badge ${r.type === 'pdf' ? 'badge_pdf' : 'badge_video'}`}>
                {r.type === 'pdf' ? '📄 PDF' : '🎥 Vidéo'}
              </span>
              <span className="cours_niveau">{r.niveau}</span>
            </div>
            <h3>{r.titre}</h3>
            <p>{r.description}</p>
            <div className="ressource_card_infos">
              <span className="cours_badge">{r.matiere}</span>
              <span className="ressource_date">📅 {r.date}</span>
            </div>

            {/* actions */}
            <div className="ressource_card_actions">
              {r.type === 'pdf' && r.url && (
                <a href={r.url} target="_blank" rel="noreferrer" className="ressource_btn_pdf">
                  📥 Télécharger
                </a>
              )}
              {r.type === 'video' && (
                <button
                  className="ressource_btn_video"
                  onClick={() => setVideoActive(videoActive === r.id ? null : r.id)}
                >
                  {videoActive === r.id ? '✖️ Fermer' : '▶️ Regarder'}
                </button>
              )}
            </div>

            {/* player video */}
            {r.type === 'video' && videoActive === r.id && r.url && (
              <div className="ressource_video_player">
                <iframe
                  src={r.url}
                  title={r.titre}
                  allowFullScreen
                  style={{ width: '100%', height: '250px', borderRadius: '10px', border: 'none', marginTop: '15px' }}
                />
              </div>
            )}

          </div>
        ))}

        {ressources_filtrees.length === 0 && (
          <p className="cours_empty">Aucune ressource pour ce filtre.</p>
        )}
      </div>

    </div>
  )
}

export default Ressources