import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { cours_bd } from '../data/cours_bd'
import { useAuth } from '../context/AuthContext'

const CoursDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const cours = cours_bd.find(c => c.id === Number(id))
  const [chapitreActif, setChapitreActif] = useState(0)
  const [leconActive, setLeconActive] = useState(0)

  if (!cours) {
    return (
      <div className='cours_detail'>
        <h1>Cours introuvable</h1>
        <button onClick={() => navigate('/cours')} className="filtre_actif">
          Retour
        </button>
      </div>
    )
  }

  const aAcces = () => {
    if (!user) return false
    if (user.role === 'prof') return true
    if (!user.abonnements?.length) return false

    const abonnement = user.abonnements.find(
      a => a.matiere === cours.matiere && a.niveau === cours.niveau
    )

    if (!abonnement) return false

    const dateExpiration = new Date(abonnement.date)
    dateExpiration.setFullYear(dateExpiration.getFullYear() + 1)

    return new Date() < dateExpiration
  }

  const accesAutorise = aAcces()

  if (!accesAutorise) {
    return (
      <div className='cours_detail'>
        <button className="cours_retour" onClick={() => navigate('/cours')}>
          ← Retour aux cours
        </button>

        <div className="cours_bloque">
          <div className="cours_bloque_content">
            <span>🔒</span>
            <h2>Accès restreint</h2>
            <p>Ce cours est réservé aux étudiants abonnés.</p>

            <div className="cours_bloque_infos">
              <div><p>Matière : <strong>{cours.matiere}</strong></p></div>
              <div><p>Niveau : <strong>{cours.niveau}</strong></p></div>
              <div><p>Prix : <strong>6000 FCFA / an</strong></p></div>
            </div>

            <button className="auth_btn" onClick={() => navigate('/paiement')}>
              💳 S'abonner — 6000 FCFA
            </button>
          </div>
        </div>
      </div>
    )
  }

  const chapitreCourant = cours.chapitres?.[chapitreActif]
  const leconCourante = chapitreCourant?.lecons?.[leconActive]

  return (
    <div className='cours_detail'>

      <button className="cours_retour" onClick={() => navigate('/cours')}>
        ← Retour aux cours
      </button>

      <div className="cours_detail_header">
        <h1>{cours.titre}</h1>
        <p>{cours.description}</p>
      </div>

      <div className="cours_detail_body">

        {/* Chapitres */}
        <div className="cours_chapitres">
          <h3>📋 Chapitres</h3>

          {cours.chapitres?.map((chap, i) => (
            <div
              key={chap.id || i}
              className={`cours_chapitre ${chapitreActif === i ? 'chapitre_actif' : ''}`}
              onClick={() => {
                setChapitreActif(i)
                setLeconActive(0)
              }}
            >
              <span>{i + 1}</span>
              <p>{chap.titre}</p>
            </div>
          ))}
        </div>

        {/* Contenu */}
        <div className="cours_contenu">

          <h2>{chapitreCourant?.titre}</h2>

          {/* Leçons */}
          {chapitreCourant?.lecons?.length > 0 && (
            <div className="cours_lecons_tabs">
              {chapitreCourant.lecons.map((lecon, i) => (
                <button
                  key={lecon.id || i}
                  className={leconActive === i ? 'filtre_actif' : 'filtre_btn'}
                  onClick={() => setLeconActive(i)}
                >
                  {typeof lecon === 'string' ? lecon : lecon.titre}
                </button>
              ))}
            </div>
          )}

          {/* Vidéo */}
          {leconCourante?.video_url ? (
            <div className="cours_video">
              <iframe
                src={leconCourante.video_url}
                title={leconCourante.titre}
                allowFullScreen
                style={{ width: '100%', height: '400px', border: 'none' }}
              />
            </div>
          ) : (
            <p>Pas de vidéo disponible</p>
          )}

          {/* Image */}
          {leconCourante?.image_url && (
            <div className="cours_image">
              <img src={leconCourante.image_url} alt={leconCourante.titre} />
            </div>
          )}

          {/* Notes */}
          <div className="cours_note">
            <h4>📝 Notes</h4>
            <p>
              {leconCourante?.contenu || "Contenu du cours indisponible"}
            </p>
          </div>

          {/* PDF ✅ corrigé */}
          {leconCourante?.pdf_url && (
            <a
              href={leconCourante.pdf_url}
              target="_blank"
              rel="noreferrer"
              className="ressource_btn_pdf"
            >
              📥 Télécharger le PDF
            </a>
          )}

        </div>
      </div>
    </div>
  )
}

export default CoursDetail