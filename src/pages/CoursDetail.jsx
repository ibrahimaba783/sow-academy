import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { cours_bd } from '../data/cours_bd'
import { useAuth } from '../context/AuthContext'

const CoursDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  // ✅ correction === + Number
  const cours = cours_bd.find(c => c.id === Number(id))

  const [chapitreActif, setChapitreActif] = useState(0)
  const [leconActive, setLeconActive] = useState(0)

  if (!cours) {
    return (
      <div className='cours_detail'>
        <h1>Cours introuvable</h1>
        <button className="filtre_actif" onClick={() => navigate('/cours')}>
          Retour
        </button>
      </div>
    )
  }

  // ✅ sécurisation user
  const aAcces = () => {
    if (!user) return false
    if (user.role === 'prof') return true

    if (!user.abonnements || user.abonnements.length === 0) return false

    const abonnement = user.abonnements.find(
      a => a.matiere === cours.matiere && a.niveau === cours.niveau
    )

    if (!abonnement) return false

    const dateExpiration = new Date(abonnement.date)
    dateExpiration.setFullYear(dateExpiration.getFullYear() + 1)

    return new Date() < dateExpiration
  }

  if (!aAcces()) {
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
              <p>Matière : <strong>{cours.matiere}</strong></p>
              <p>Niveau : <strong>{cours.niveau}</strong></p>
              <p>Prix : <strong>6000 FCFA / an</strong></p>
              <p>Durée : <strong>1 an complet</strong></p>
            </div>

            {user && user.matiere === cours.matiere && user.niveau === cours.niveau ? (
              <button className="auth_btn" onClick={() => navigate('/paiement')}>
                💳 S'abonner — 6000 FCFA
              </button>
            ) : (
              <p>
                ⚠️ Ce cours est pour {cours.niveau} en {cours.matiere}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ✅ sécurisation
  const chapitreCourant = cours.chapitres?.[chapitreActif]
  const leconCourante = chapitreCourant?.lecons?.[leconActive]

  return (
    <div className='cours_detail'>

      <button className="cours_retour" onClick={() => navigate('/cours')}>
        ← Retour aux cours
      </button>

      <div className="cours_detail_header">
        <span>{cours.matiere}</span>
        <span>{cours.niveau}</span>
        <h1>{cours.titre}</h1>
        <p>{cours.description}</p>
        <p>⏱ {cours.duree}</p>
      </div>

      <div className="cours_detail_body">

        {/* CHAPITRES */}
        <div className="cours_chapitres">
          <h3>📋 Chapitres</h3>

          {cours.chapitres.map((chap, i) => (
            <div
              key={chap.id}
              className={chapitreActif === i ? 'chapitre_actif' : ''}
              onClick={() => {
                setChapitreActif(i)
                setLeconActive(0)
              }}
            >
              {i + 1} - {chap.titre}
            </div>
          ))}
        </div>

        {/* CONTENU */}
        <div className="cours_contenu">

          {!chapitreCourant && <p>Aucun contenu</p>}

          <h2>{chapitreCourant?.titre}</h2>

          {/* LEÇONS */}
          {chapitreCourant?.lecons?.length > 0 && (
            <div>
              {chapitreCourant.lecons.map((lecon, i) => (
                <button
                  key={i}
                  className={leconActive === i ? 'filtre_actif' : ''}
                  onClick={() => setLeconActive(i)}
                >
                  {typeof lecon === 'string' ? lecon : lecon.titre}
                </button>
              ))}
            </div>
          )}

          {/* VIDEO */}
          {leconCourante?.video_url ? (
            <iframe
              src={leconCourante.video_url}
              title={leconCourante.titre}
              style={{ width: '100%', height: '250px' }}
              allowFullScreen
            />
          ) : (
            <p>🎥 Pas de vidéo</p>
          )}

          {/* IMAGE */}
          {leconCourante?.image_url && (
            <img src={leconCourante.image_url} alt={leconCourante.titre} />
          )}

          {/* NOTE */}
          <div>
            <h4>Notes</h4>
            <p>
              {leconCourante?.contenu || "Contenu du cours"}
            </p>
          </div>

          {/* ✅ PDF CORRIGÉ */}
          {leconCourante?.pdf_url && (
            <a
              href={leconCourante.pdf_url}
              target="_blank"
              rel="noreferrer"
            >
              📥 Télécharger le PDF — {leconCourante.pdf_nom}
            </a>
          )}

          {/* NAV */}
          <div>
            <button
              onClick={() => {
                setChapitreActif(prev => Math.max(0, prev - 1))
                setLeconActive(0)
              }}
              disabled={chapitreActif === 0}
            >
              ← Précédent
            </button>

            <button
              onClick={() => {
                setChapitreActif(prev =>
                  Math.min(cours.chapitres.length - 1, prev + 1)
                )
                setLeconActive(0)
              }}
              disabled={chapitreActif === cours.chapitres.length - 1}
            >
              Suivant →
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CoursDetail