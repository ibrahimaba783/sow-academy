import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCours } from '../data/cours_bd'

const GestionCours = () => {
  const navigate = useNavigate()
  const [cours, setCours] = useState([])
  const [confirmation, setConfirmation] = useState(null)

  // ✅ charge les cours correctement
  useEffect(() => {
    setCours(getCours())
  }, [])

  const handleSupprimer = (id) => {
    const idStr = String(id)

    // 🔴 supprimer globalement
    const coursSupprimes = JSON.parse(localStorage.getItem("cours_supprimes") || "[]")
    const newSupprimes = [...new Set([...coursSupprimes, idStr])]
    localStorage.setItem("cours_supprimes", JSON.stringify(newSupprimes))

    // 🔴 supprimer des cours locaux
    const coursLocal = JSON.parse(localStorage.getItem("cours") || "[]")
    const nouveauxCoursLocal = coursLocal.filter(c => String(c.id) !== idStr)
    localStorage.setItem("cours", JSON.stringify(nouveauxCoursLocal))

    // 🔄 recharge propre
    setCours(getCours())

    setConfirmation(null)
  }

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

      <div className="gestion_liste">
        {cours.length === 0 && (
          <p className="cours_empty">Aucun cours disponible.</p>
        )}

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
                onClick={() => navigate(`/gestion-chapitres/${String(c.id)}`)} // ✅ FIX
              >
                📋 Chapitres
              </button>

              <button
                className="gestion_btn_modif"
                onClick={() => navigate(`/modifier-cours/${String(c.id)}`)} // ✅ FIX
              >
                ✏️ Modifier
              </button>

              <button
                className="gestion_btn_suppr"
                onClick={() => setConfirmation(c.id)}
              >
                🗑️ Supprimer
              </button>
            </div>

            {confirmation === c.id && (
              <div className="gestion_confirmation">
                <p>Confirmer la suppression ?</p>

                <button
                  className="gestion_btn_suppr"
                  onClick={() => handleSupprimer(c.id)}
                >
                  Oui, supprimer
                </button>

                <button
                  className="filtre_btn"
                  onClick={() => setConfirmation(null)}
                >
                  Annuler
                </button>
              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  )
}

export default GestionCours