import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { cours_bd } from '../data/cours_bd'

const GestionChapitres = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const cours = cours_bd.find(c => c.id == id)
  const [chapitres] = useState(cours?.chapitres || [])

  if (!cours) return (
    <div className='gestion_page'>
      <h1>Cours introuvable</h1>
      <button className="filtre_btn" onClick={() => navigate('/gestion-cours')}>Retour</button>
    </div>
  )

  return (
    <div className='gestion_page'>

      <div className="gestion_header">
        <div>
          <h1>📋 Chapitres — {cours.titre}</h1>
          <p>{cours.matiere} — {cours.niveau}</p>
        </div>
        <div className="gestion_header_btns">
          <button className="filtre_btn" onClick={() => navigate('/gestion-cours')}>
            ← Retour
          </button>
          <button className="filtre_actif" onClick={() => navigate(`/ajouter-chapitre/${cours.id}`)}>
            + Ajouter un chapitre
          </button>
        </div>
      </div>

      {/* liste chapitres */}
      <div className="gestion_liste">
        {chapitres.map((ch, index) => (
          <div key={ch.id} className="gestion_card">
            <div className="gestion_card_infos">
              <h3>{index + 1}. {ch.titre}</h3>
              <span>{ch.lecons?.length || 0} leçons</span>
            </div>
            <div className="gestion_card_btns">
              <button
                className="filtre_btn"
                onClick={() => navigate(`/gestion-lecons/${cours.id}/${ch.id}`)}
              >
                📖 Leçons
              </button>
              <button
                className="gestion_btn_modif"
                onClick={() => navigate(`/modifier-chapitre/${cours.id}/${ch.id}`)}
              >
                ✏️ Modifier
              </button>
              <button
                className="gestion_btn_suppr"
                onClick={() => navigate(`/supprimer-chapitre/${cours.id}/${ch.id}`)}
              >
                🗑️ Supprimer
              </button>
            </div>
          </div>
        ))}

        {chapitres.length === 0 && (
          <p className="cours_empty">Aucun chapitre. Ajoutez-en un !</p>
        )}
      </div>

    </div>
  )
}

export default GestionChapitres