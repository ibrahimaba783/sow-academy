import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AjouterEvaluation = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    titre: '', matiere: 'Maths', niveau: '4ème', date: '', duree: '', total_points: 20
  })
  const [questions, setQuestions] = useState([
    { question: '', choix: ['', '', '', ''], reponse: 0, points: 4 }
  ])
  const [erreur, setErreur] = useState('')
  const [succes, setSucces] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleQuestionChange = (index, field, value) => {
    const nouvelles = [...questions]
    nouvelles[index][field] = value
    setQuestions(nouvelles)
  }

  const handleChoixChange = (qIndex, cIndex, value) => {
    const nouvelles = [...questions]
    nouvelles[qIndex].choix[cIndex] = value
    setQuestions(nouvelles)
  }

  const ajouterQuestion = () => {
    setQuestions([...questions, { question: '', choix: ['', '', '', ''], reponse: 0, points: 4 }])
  }

  const supprimerQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const handleSauvegarder = () => {
    if (!form.titre || !form.date || !form.duree) { setErreur("Remplissez tous les champs"); return }
    if (questions.some(q => !q.question || q.choix.some(c => !c))) { setErreur("Complétez toutes les questions"); return }
    setErreur('')
    const evaluations = JSON.parse(localStorage.getItem("evaluations") || "[]")
    evaluations.push({ ...form, id: Date.now(), questions })
    localStorage.setItem("evaluations", JSON.stringify(evaluations))
    setSucces(true)
  }

  if (succes) return (
    <div className='gestion_page'>
      <div className="paiement_succes">
        <span>✅</span>
        <h2>Évaluation créée !</h2>
        <p><strong>{form.titre}</strong> a été ajoutée.</p>
        <div className="gestion_form_btns">
          <button className="auth_btn" onClick={() => navigate('/gestion-evaluations')}>Voir les évaluations</button>
          <button className="filtre_btn" onClick={() => { setSucces(false); setForm({ titre: '', matiere: 'Maths', niveau: '4ème', date: '', duree: '', total_points: 20 }); setQuestions([{ question: '', choix: ['', '', '', ''], reponse: 0, points: 4 }]) }}>Ajouter une autre</button>
        </div>
      </div>
    </div>
  )

  return (
    <div className='gestion_page'>

      <div className="gestion_header">
        <div>
          <h1>➕ Ajouter une évaluation</h1>
          <p>Créer un nouveau devoir</p>
        </div>
        <button className="filtre_btn" onClick={() => navigate('/gestion-evaluations')}>← Retour</button>
      </div>

      <div className="gestion_form">
        {erreur && <div className="auth_erreur">❌ {erreur}</div>}

        <div className="gestion_form_grid">
          <div className="auth_group">
            <label>Titre</label>
            <input name="titre" value={form.titre} onChange={handleChange} placeholder="Ex: Devoir 1 — Les fonctions" />
          </div>
          <div className="auth_group">
            <label>Durée</label>
            <input name="duree" value={form.duree} onChange={handleChange} placeholder="Ex: 2h" />
          </div>
          <div className="auth_group">
            <label>Matière</label>
            <select name="matiere" value={form.matiere} onChange={handleChange}>
              <option value="Maths">Maths</option>
              <option value="Physique-Chimie">Physique-Chimie</option>
            </select>
          </div>
          <div className="auth_group">
            <label>Niveau</label>
            <select name="niveau" value={form.niveau} onChange={handleChange}>
              <option value="4ème">4ème</option>
              <option value="3ème">3ème</option>
              <option value="2nde S">2nde S</option>
              <option value="1ère S">1ère S</option>
              <option value="TS">TS</option>
            </select>
          </div>
          <div className="auth_group">
            <label>Date</label>
            <input name="date" type="date" value={form.date} onChange={handleChange} />
          </div>
          <div className="auth_group">
            <label>Total points</label>
            <input name="total_points" type="number" value={form.total_points} onChange={handleChange} />
          </div>
        </div>

        {/* questions */}
        <div className="eval_questions">
          <div className="eval_questions_header">
            <h3>❓ Questions</h3>
            <button className="filtre_actif" onClick={ajouterQuestion}>+ Ajouter une question</button>
          </div>

          {questions.map((q, qIndex) => (
            <div key={qIndex} className="eval_question_card">
              <div className="eval_question_header">
                <h4>Question {qIndex + 1}</h4>
                {questions.length > 1 && (
                  <button className="gestion_btn_suppr" onClick={() => supprimerQuestion(qIndex)}>🗑️</button>
                )}
              </div>

              <div className="auth_group">
                <label>Question</label>
                <textarea
                  value={q.question}
                  onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                  placeholder="Énoncé de la question..."
                  rows="2"
                />
              </div>

              <div className="auth_group">
                <label>Points</label>
                <input
                  type="number"
                  value={q.points}
                  onChange={(e) => handleQuestionChange(qIndex, 'points', Number(e.target.value))}
                />
              </div>

              <label style={{ color: '#065f46', fontWeight: 'bold', fontSize: '14px' }}>Choix de réponses</label>
              <div className="exercice_choix_form">
                {q.choix.map((choix, cIndex) => (
                  <div key={cIndex} className="exercice_choix_ligne">
                    <div
                      className={`exercice_choix_radio ${q.reponse === cIndex ? 'radio_actif' : ''}`}
                      onClick={() => handleQuestionChange(qIndex, 'reponse', cIndex)}
                    >
                      {String.fromCharCode(65 + cIndex)}
                    </div>
                    <input
                      value={choix}
                      onChange={(e) => handleChoixChange(qIndex, cIndex, e.target.value)}
                      placeholder={`Choix ${String.fromCharCode(65 + cIndex)}`}
                      className="exercice_choix_input"
                    />
                    {q.reponse === cIndex && <span className="exercice_bonne_reponse">✅ Bonne réponse</span>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="gestion_form_btns">
          <button className="auth_btn" onClick={handleSauvegarder}>✅ Créer l'évaluation</button>
          <button className="filtre_btn" onClick={() => navigate('/gestion-evaluations')}>Annuler</button>
        </div>
      </div>

    </div>
  )
}

export default AjouterEvaluation