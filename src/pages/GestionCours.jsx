import React from 'react'
import { useNavigate } from 'react-router-dom'
import { cours_bd } from '../data/cours_bd'
import { useState } from 'react'

const GestionCours = () => {
  const navigate = useNavigate()
  const [cours] = useState(cours_bd)

  return (
    <div className='gestion_page'>

      <div className="gestion_header">
        <div>
          <h1>📚 Gestion des cours</h1>
          <p>Ajouter, modifier ou supprimer des cours</p>
        </div>
        <div className="gestion_header_btns">
          <button className="filtre_btn" onClick={() => navigate('/prof')}>
            ← Retour
          </button>
          <button className="filtre_actif" onClick={() => navigate('/ajouter-cours')}>
            + Ajouter un cours
          </button>
        </div>
      </div>

      {/* liste cours */}
      <div className="gestion_liste">
        {cours.map((c) => (
          <div key={c.id} className="gestion_card">
            <div className="gestion_card_infos">
              <div className="cours_card_top">
                <span className="cours_badge">{c.matiere}</span>
                <span className="cours_niveau">{c.niveau}</span>
              </div>
              <h3>{c.titre}</h3>
              <p>{c.description}</p>
              <span>⏱ {c.duree} — {c.chapitres?.length || 0} chapitres</span>
            </div>
            <div className="gestion_card_btns">
              <button
                className="filtre_btn"
                onClick={() => navigate(`/gestion-chapitres/${c.id}`)}
              >
                📋 Chapitres
              </button>
              <button
                className="gestion_btn_modif"
                onClick={() => navigate(`/modifier-cours/${c.id}`)}
              >
                ✏️ Modifier
              </button>
              <button
                className="gestion_btn_suppr"
                onClick={() => navigate(`/supprimer-cours/${c.id}`)}
              >
                🗑️ Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default GestionCours