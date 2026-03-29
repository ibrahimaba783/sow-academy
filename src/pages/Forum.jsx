import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Forum = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [messages, setMessages] = useState([
    { id: 1, auteur: "M. ALIOU SOW", role: "prof", matiere: "Maths", niveau: "TS", texte: "Bienvenue sur le forum ! Posez vos questions ici.", date: "2026-03-01" },
    { id: 2, auteur: "Étudiant A", role: "etudiant", matiere: "Maths", niveau: "TS", texte: "Bonjour M. SOW, j'ai du mal avec les dérivées.", date: "2026-03-02" },
    { id: 3, auteur: "M. ALIOU SOW", role: "prof", matiere: "Maths", niveau: "TS", texte: "Pas de souci ! Revoyez le chapitre sur les limites d'abord.", date: "2026-03-02" },
    { id: 4, auteur: "Étudiant B", role: "etudiant", matiere: "Physique-Chimie", niveau: "1ère S", texte: "Bonjour, j'ai du mal avec la loi d'Ohm.", date: "2026-03-03" },
  ])
  const [nouveau, setNouveau] = useState('')

  // vérifier abonnement
  const aAcces = () => {
    if (user.role === 'prof') return true
    if (!user.abonnements || user.abonnements.length === 0) return false
    const abonnement = user.abonnements.find(
      a => a.matiere === user.matiere && a.niveau === user.niveau
    )
    if (!abonnement) return false
    const dateExpiration = new Date(abonnement.date)
    dateExpiration.setFullYear(dateExpiration.getFullYear() + 1)
    return new Date() < dateExpiration
  }

  // prof voit tous les messages
  // étudiant voit uniquement sa matière et son niveau
  const messages_filtres = messages.filter(m =>
    user.role === 'prof'
      ? true
      : m.matiere === user.matiere && m.niveau === user.niveau
  )

  const handleEnvoyer = () => {
    if (!nouveau.trim()) return
    const msg = {
      id: Date.now(),
      auteur: user.nom,
      role: user.role,
      matiere: user.role === 'prof' ? 'Général' : user.matiere,
      niveau: user.role === 'prof' ? 'Tous' : user.niveau,
      texte: nouveau,
      date: new Date().toISOString().split('T')[0]
    }
    setMessages([...messages, msg])
    setNouveau('')
  }

  // si pas abonnement
  if (!aAcces() && user.role !== 'prof') return (
    <div className='forum_page'>
      <div className="cours_header">
        <h1>💬 Forum</h1>
      </div>
      <div className="cours_bloque">
        <div className="cours_bloque_content">
          <span>🔒</span>
          <h2>Accès restreint</h2>
          <p>Le forum est réservé aux étudiants abonnés.</p>
          <div className="cours_bloque_infos">
            <div className="cours_bloque_info">
              <span>📚</span>
              <p>Matière : <strong>{user.matiere}</strong></p>
            </div>
            <div className="cours_bloque_info">
              <span>🎯</span>
              <p>Niveau : <strong>{user.niveau}</strong></p>
            </div>
            <div className="cours_bloque_info">
              <span>💰</span>
              <p>Prix : <strong>6000 FCFA / an</strong></p>
            </div>
          </div>
          <button className="auth_btn" onClick={() => navigate('/paiement')}>
            💳 S'abonner — 6000 FCFA
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className='forum_page'>

      <div className="cours_header">
        <h1>💬 Forum de discussion</h1>
        <p>
          {user.role === 'prof'
            ? 'Tous les messages — M. ALIOU SOW'
            : `${user.matiere} — ${user.niveau}`}
        </p>
      </div>

      {/* filtre matiere/niveau pour prof */}
      {user.role === 'prof' && (
        <div className="forum_filtres">
          {['Tous', 'Maths', 'Physique-Chimie'].map(m => (
            <button key={m} className="filtre_btn">
              {m}
            </button>
          ))}
        </div>
      )}

      <div className="forum_messages">
        {messages_filtres.length === 0 ? (
          <p className="cours_empty">Aucun message pour le moment.</p>
        ) : (
          messages_filtres.map((msg) => (
            <div key={msg.id} className={`forum_message ${msg.role === 'prof' ? 'message_prof' : 'message_etudiant'}`}>
              <div className="forum_message_avatar">
                {msg.auteur.charAt(0).toUpperCase()}
              </div>
              <div className="forum_message_content">
                <div className="forum_message_header">
                  <strong>{msg.auteur}</strong>
                  <span className={`forum_badge ${msg.role === 'prof' ? 'badge_prof' : 'badge_etudiant'}`}>
                    {msg.role === 'prof' ? '👨‍🏫 Professeur' : '👤 Étudiant'}
                  </span>
                  {user.role === 'prof' && (
                    <span className="cours_badge" style={{ fontSize: '11px' }}>
                      {msg.matiere} — {msg.niveau}
                    </span>
                  )}
                  <span className="forum_date">{msg.date}</span>
                </div>
                <p>{msg.texte}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="forum_input">
        <textarea
          placeholder={user.role === 'prof'
            ? "Répondre aux étudiants..."
            : `Posez votre question en ${user.matiere} (${user.niveau})...`}
          value={nouveau}
          onChange={(e) => setNouveau(e.target.value)}
          rows="3"
        />
        <button className="auth_btn" onClick={handleEnvoyer}>
          Envoyer
        </button>
      </div>

    </div>
  )
}

export default Forum