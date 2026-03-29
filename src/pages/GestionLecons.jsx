import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { cours_bd } from '../data/cours_bd'

const GestionLecons = () => {
  const { coursId, chapitreId } = useParams()
  const navigate = useNavigate()
  const cours = cours_bd.find(c => c.id == coursId)
  const chapitre = cours?.chapitres.find(ch => ch.id == chapitreId)
  const [lecons] = useState(chapitre?.lecons || [])

  if (!cours || !chapitre) return (
    <div className='gestion_page'>
      <h1>Introuvable</h1>
      <button className="filtre_btn" onClick={() => navigate('/gestion-cours')}>Retour</button>
    </div>
  )

  return (
    <div className='gestion_page'>

      <div className="gestion_header">
        <div>
          <h1>📖 Leçons — {chapitre.titre}</h1>
          <p>{cours.titre} — {cours.niveau}</p>
        </div>
        <div className="gestion_header_btns">
          <button className="filtre_btn" onClick={() => navigate(`/gestion-chapitres/${coursId}`)}>
            ← Retour
          </button>
          <button className="filtre_actif" onClick={() => navigate(`/ajouter-lecon/${coursId}/${chapitreId}`)}>
            + Ajouter une leçon
          </button>
        </div>
      </div>

      {/* liste lecons */}
      <div className="gestion_liste">
        {lecons.map((l, index) => (
          <div key={l.id} className="gestion_card">
            <div className="gestion_card_infos">
              <h3>Leçon {index + 1} : {l.titre}</h3>
              {l.contenu && <p>{l.contenu.substring(0, 100)}...</p>}
            </div>
            <div className="gestion_card_btns">
              <button
                className="gestion_btn_modif"
                onClick={() => navigate(`/modifier-lecon/${coursId}/${chapitreId}/${l.id}`)}
              >
                ✏️ Modifier
              </button>
              <button
                className="gestion_btn_suppr"
                onClick={() => navigate(`/supprimer-lecon/${coursId}/${chapitreId}/${l.id}`)}
              >
                🗑️ Supprimer
              </button>
            </div>
          </div>
        ))}

        {lecons.length === 0 && (
          <p className="cours_empty">Aucune leçon. Ajoutez-en une !</p>
        )}
      </div>

    </div>
  )
}

export default GestionLecons