import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Paiement = () => {
  const { user, payer } = useAuth()
  const navigate = useNavigate()
  const [methode, setMethode] = useState('')
  const [numero, setNumero] = useState('')
  const [erreur, setErreur] = useState('')
  const [succes, setSucces] = useState(false)

  const handlePaiement = () => {
    if (!methode) { setErreur("Choisissez une méthode de paiement"); return }
    if (!numero || numero.length < 9) { setErreur("Numéro invalide"); return }
    setErreur('')
    const ok = payer(user.matiere, user.niveau, methode)
    if (ok) setSucces(true)
  }

  if (succes) return (
    <div className='paiement_page'>
      <div className="paiement_succes">
        <span>✅</span>
        <h2>Paiement réussi !</h2>
        <p>Votre abonnement annuel est actif.</p>
        <p>Matière : <strong>{user.matiere}</strong></p>
        <p>Niveau : <strong>{user.niveau}</strong></p>
        <p>Accès : <strong>Tous les chapitres pendant 1 an</strong></p>
        <p>Montant payé : <strong>6000 FCFA</strong></p>
        <button className="auth_btn" onClick={() => navigate('/dashboard')}>
          Accéder à mes cours
        </button>
      </div>
    </div>
  )

  return (
    <div className='paiement_page'>
      <div className="paiement_box">

        <h1>💳 Paiement</h1>
        <p className="paiement_sous_titre">Abonnement annuel — 6000 FCFA</p>

        <div className="paiement_avantages">
          <h3>✅ Ce que vous obtenez :</h3>
          <ul>
            <li>📚 Accès à tous les chapitres de <strong>{user?.matiere}</strong></li>
            <li>🎯 Niveau : <strong>{user?.niveau}</strong></li>
            <li>📅 Durée : <strong>1 an complet</strong></li>
            <li>💬 Accès au forum de discussion</li>
            <li>📝 Exercices et évaluations</li>
          </ul>
        </div>

        <div className="paiement_recap">
          <div className="paiement_recap_ligne">
            <span>Matière</span>
            <strong>{user?.matiere}</strong>
          </div>
          <div className="paiement_recap_ligne">
            <span>Niveau</span>
            <strong>{user?.niveau}</strong>
          </div>
          <div className="paiement_recap_ligne">
            <span>Durée</span>
            <strong>1 an</strong>
          </div>
          <div className="paiement_recap_ligne total">
            <span>Total</span>
            <strong>6000 FCFA</strong>
          </div>
        </div>

        <h3>Choisir une méthode</h3>
        <div className="paiement_methodes">
          {["Wave", "Orange Money", "Free Money"].map((m) => (
            <div
              key={m}
              className={`paiement_methode ${methode === m ? 'selected' : ''}`}
              onClick={() => setMethode(m)}
            >
              <span>{m === "Wave" ? "🌊" : m === "Orange Money" ? "🟠" : "🟢"}</span>
              <p>{m}</p>
            </div>
          ))}
        </div>

        {methode && (
          <div className="auth_group">
            <label>Numéro {methode}</label>
            <input
              type="tel"
              placeholder="Ex: 77 000 00 00"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
          </div>
        )}

        {erreur && <div className="auth_erreur">❌ {erreur}</div>}

        <button className="auth_btn" onClick={handlePaiement}>
          Payer 6000 FCFA
        </button>

        <button className="paiement_annuler" onClick={() => navigate('/dashboard')}>
          Annuler
        </button>

      </div>
    </div>
  )
}

export default Paiement