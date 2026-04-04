import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { cours_bd } from '../data/cours_bd'

const ProfParametres = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [onglet, setOnglet] = useState("profil")

  const etudiants = JSON.parse(localStorage.getItem("etudiants") || "[]")

  // ---- profil ----
  const [nom, setNom] = useState(user.nom)
  const [email, setEmail] = useState(user.email)
  const [photo, setPhoto] = useState(null)
  const [photoPreview, setPhotoPreview] = useState('')
  const [succesProfil, setSuccesProfil] = useState(false)

  // ---- mot de passe ----
  const [ancienMdp, setAncienMdp] = useState('')
  const [nouveauMdp, setNouveauMdp] = useState('')
  const [confirmMdp, setConfirmMdp] = useState('')
  const [erreurMdp, setErreurMdp] = useState('')
  const [succesMdp, setSuccesMdp] = useState(false)

  // ---- tarifs ----
  const [prix, setPrix] = useState(
    JSON.parse(localStorage.getItem("tarif_prix") || "6000")
  )
  const [niveaux, setNiveaux] = useState(
    JSON.parse(localStorage.getItem("tarif_niveaux") || '["4ème","3ème","2nde S","1ère S","TS"]')
  )
  const [succesTarif, setSuccesTarif] = useState(false)

  const handlePhoto = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      setPhoto(file)
      setPhotoPreview(URL.createObjectURL(file))
    }
  }

  const handleSauvegarderProfil = () => {
    const profData = { nom, email, photo_url: photoPreview || '' }
    localStorage.setItem("prof_profil", JSON.stringify(profData))
    setSuccesProfil(true)
    setTimeout(() => setSuccesProfil(false), 3000)
  }

  const handleChangerMdp = () => {
    if (ancienMdp !== 'prof1234') { setErreurMdp("Ancien mot de passe incorrect"); return }
    if (nouveauMdp.length < 6) { setErreurMdp("Le mot de passe doit faire au moins 6 caractères"); return }
    if (nouveauMdp !== confirmMdp) { setErreurMdp("Les mots de passe ne correspondent pas"); return }
    setErreurMdp('')
    localStorage.setItem("prof_mdp", nouveauMdp)
    setAncienMdp(''); setNouveauMdp(''); setConfirmMdp('')
    setSuccesMdp(true)
    setTimeout(() => setSuccesMdp(false), 3000)
  }

  const handleSauvegarderTarif = () => {
    localStorage.setItem("tarif_prix", JSON.stringify(prix))
    localStorage.setItem("tarif_niveaux", JSON.stringify(niveaux))
    setSuccesTarif(true)
    setTimeout(() => setSuccesTarif(false), 3000)
  }

  const toggleNiveau = (niveau) => {
    if (niveaux.includes(niveau)) {
      setNiveaux(niveaux.filter(n => n !== niveau))
    } else {
      setNiveaux([...niveaux, niveau])
    }
  }

  // stats
  const totalEtudiants = etudiants.length
  const totalCours = cours_bd.length
  const mathsCount = cours_bd.filter(c => c.matiere === 'Maths').length
  const physCount = cours_bd.filter(c => c.matiere === 'Physique-Chimie').length
  const revenus = etudiants.reduce((acc, e) => {
    return acc + (e.abonnements?.length || 0) * 6000
  }, 0)

  const profProfil = JSON.parse(localStorage.getItem("prof_profil") || "{}")

  return (
    <div className='parametres_page'>

      {/* ----------------- HEADER DASHBOARD ----------------- */}
      <div className="dashboard_header prof_header">
        <div>
          <h1>👨‍🏫 Prof. {user.nom}</h1>
          <p>Maths & Physique-Chimie</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="filtre_actif"
            onClick={() => navigate('/prof-parametres')}
          >
            ⚙️ Paramètres
          </button>
          <button
            className="dash_btn_logout"
            onClick={() => { logout(); navigate('/') }}
          >
            Déconnexion
          </button>
        </div>
      </div>

      {/* ----------------- HEADER EXISTANT ----------------- */}
      <div className="parametres_header">
        <div className="parametres_header_gauche">
          <div className="parametres_avatar">
            {profProfil.photo_url || photoPreview ? (
              <img src={profProfil.photo_url || photoPreview} alt="prof" />
            ) : (
              <span>{user.nom.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div>
            <h1>⚙️ Paramètres — {profProfil.nom || user.nom}</h1>
            <p>{profProfil.email || user.email}</p>
            <span className="parametres_role">👨‍🏫 Professeur</span>
          </div>
        </div>
        <button
          className="filtre_btn"
          onClick={() => navigate('/prof')}
        >
          ← Retour au dashboard
        </button>
      </div>

      {/* ----------------- ONGLETS ----------------- */}
      <div className="parametres_onglets">
        {[
          { id: "profil", label: "👤 Profil" },
          { id: "securite", label: "🔒 Sécurité" },
          { id: "tarifs", label: "💰 Tarifs" },
          { id: "stats", label: "📊 Statistiques" },
        ].map(o => (
          <button
            key={o.id}
            className={onglet === o.id ? "onglet_actif" : "onglet"}
            onClick={() => setOnglet(o.id)}
          >
            {o.label}
          </button>
        ))}
      </div>

      {/* ----------------- ONGLET PROFIL ----------------- */}
      {onglet === "profil" && (
        <div className="parametres_section">
          <h2>👤 Informations personnelles</h2>
          {succesProfil && <div className="param_succes">✅ Profil mis à jour !</div>}

          {/* photo */}
          <div className="param_photo_section">
            <div className="param_avatar_grand">
              {profProfil.photo_url || photoPreview ? (
                <img src={photoPreview || profProfil.photo_url} alt="prof" />
              ) : (
                <span>{user.nom.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <div>
              <p>Photo de profil</p>
              <button className="filtre_actif"
                onClick={() => document.getElementById('prof_photo').click()}>
                📷 Changer la photo
              </button>
              <input id="prof_photo" type="file" accept="image/*"
                onChange={handlePhoto} style={{ display: 'none' }} />
              {photo && <p className="param_hint">📸 {photo.name}</p>}
            </div>
          </div>

          <div className="gestion_form_grid">
            <div className="auth_group">
              <label>Nom complet</label>
              <input value={nom} onChange={(e) => setNom(e.target.value)}
                placeholder="Votre nom" />
            </div>
            <div className="auth_group">
              <label>Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email" type="email" />
            </div>
            <div className="auth_group">
              <label>Matières enseignées</label>
              <input value="Maths & Physique-Chimie" disabled style={{ opacity: 0.6 }} />
            </div>
            <div className="auth_group">
              <label>Rôle</label>
              <input value="Professeur" disabled style={{ opacity: 0.6 }} />
            </div>
          </div>

          <button className="auth_btn" onClick={handleSauvegarderProfil}>
            💾 Sauvegarder le profil
          </button>
        </div>
      )}

      {/* ----------------- ONGLET SÉCURITÉ ----------------- */}
      {onglet === "securite" && (
        <div className="parametres_section">
          <h2>🔒 Sécurité</h2>
          {erreurMdp && <div className="auth_erreur">❌ {erreurMdp}</div>}
          {succesMdp && <div className="param_succes">✅ Mot de passe modifié !</div>}

          <div className="auth_group">
            <label>Ancien mot de passe</label>
            <input type="password" value={ancienMdp}
              onChange={(e) => setAncienMdp(e.target.value)}
              placeholder="Ancien mot de passe" />
          </div>
          <div className="auth_group">
            <label>Nouveau mot de passe</label>
            <input type="password" value={nouveauMdp}
              onChange={(e) => setNouveauMdp(e.target.value)}
              placeholder="Nouveau mot de passe" />
          </div>
          <div className="auth_group">
            <label>Confirmer le mot de passe</label>
            <input type="password" value={confirmMdp}
              onChange={(e) => setConfirmMdp(e.target.value)}
              placeholder="Confirmer le mot de passe" />
          </div>

          <div className="param_securite_info">
            <h4>🛡️ Conseils de sécurité</h4>
            <ul>
              <li>✅ Utilisez au moins 8 caractères</li>
              <li>✅ Mélangez lettres, chiffres et symboles</li>
              <li>✅ Ne partagez jamais votre mot de passe</li>
              <li>✅ Changez votre mot de passe régulièrement</li>
            </ul>
          </div>

          <button className="auth_btn" onClick={handleChangerMdp}>
            🔒 Changer le mot de passe
          </button>
        </div>
      )}

      {/* ----------------- ONGLET TARIFS ----------------- */}
      {onglet === "tarifs" && (
        <div className="parametres_section">
          <h2>💰 Gestion des tarifs</h2>
          {succesTarif && <div className="param_succes">✅ Tarifs mis à jour !</div>}

          <div className="auth_group">
            <label>Prix par matière (FCFA / an)</label>
            <input
              type="number"
              value={prix}
              onChange={(e) => setPrix(Number(e.target.value))}
              placeholder="6000"
            />
          </div>

          <div className="param_niveaux_section">
            <label>Niveaux disponibles</label>
            <div className="param_niveaux_grid">
              {["4ème", "3ème", "2nde S", "1ère S", "TS"].map(n => (
                <div
                  key={n}
                  className={`param_niveau_card ${niveaux.includes(n) ? 'niveau_actif' : ''}`}
                  onClick={() => toggleNiveau(n)}
                >
                  <span>{n}</span>
                  <p>{niveaux.includes(n) ? '✅ Actif' : '❌ Inactif'}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="param_tarif_recap">
            <h4>📋 Récapitulatif</h4>
            <div className="profil_info_ligne">
              <span>Prix par matière</span>
              <strong>{prix} FCFA / an</strong>
            </div>
            <div className="profil_info_ligne">
              <span>Niveaux actifs</span>
              <strong>{niveaux.join(', ')}</strong>
            </div>
            <div className="profil_info_ligne">
              <span>Matières</span>
              <strong>Maths & Physique-Chimie</strong>
            </div>
          </div>

          <button className="auth_btn" onClick={handleSauvegarderTarif}>
            💾 Sauvegarder les tarifs
          </button>
        </div>
      )}

      {/* ----------------- ONGLET STATS ----------------- */}
      {onglet === "stats" && (
        <div className="parametres_section">
          <h2>📊 Statistiques détaillées</h2>

          <div className="param_stats_grid">
            <div className="param_stat_card">
              <span>👨‍🎓</span>
              <h3>{totalEtudiants}</h3>
              <p>Étudiants inscrits</p>
            </div>
            <div className="param_stat_card">
              <span>📚</span>
              <h3>{totalCours}</h3>
              <p>Cours disponibles</p>
            </div>
            <div className="param_stat_card">
              <span>🧮</span>
              <h3>{mathsCount}</h3>
              <p>Cours de Maths</p>
            </div>
            <div className="param_stat_card">
              <span>⚗️</span>
              <h3>{physCount}</h3>
              <p>Cours de Physique-Chimie</p>
            </div>
            <div className="param_stat_card">
              <span>💰</span>
              <h3>{revenus.toLocaleString()}</h3>
              <p>FCFA de revenus</p>
            </div>
            <div className="param_stat_card">
              <span>🎯</span>
              <h3>5</h3>
              <p>Niveaux couverts</p>
            </div>
          </div>

          {/* liste etudiants */}
          <div className="param_etudiants_section">
            <h3>👨‍🎓 Détail des étudiants</h3>
            {etudiants.length === 0 ? (
              <p className="dashboard_empty">Aucun étudiant inscrit.</p>
            ) : (
              <div className="param_etudiants_liste">
                {etudiants.map((e, i) => (
                  <div key={i} className="param_etudiant_ligne">
                    <div className="prof_etudiant_avatar" style={{ width: '40px', height: '40px', fontSize: '16px' }}>
                      {e.nom.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ flex: 1 }}>
                      <strong>{e.nom}</strong>
                      <p>{e.email}</p>
                    </div>
                    <span className="cours_badge">{e.matiere}</span>
                    <span className="cours_niveau">{e.niveau}</span>
                    <span className={e.abonnements?.length > 0 ? 'param_actif' : 'param_inactif'}>
                      {e.abonnements?.length > 0 ? '✅ Abonné' : '❌ Non abonné'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  )
}

export default ProfParametres