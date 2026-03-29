import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const exercices_initial = [
  { id: 1, matiere: "Maths", niveau: "TS", question: "Calculer la dérivée de f(x) = x² + 3x + 2", choix: ["2x + 3", "x + 3", "2x + 2", "x² + 3"], reponse: 0 },
  { id: 2, matiere: "Maths", niveau: "3ème", question: "Résoudre : 2x + 4 = 10", choix: ["x = 2", "x = 3", "x = 4", "x = 5"], reponse: 1 },
  { id: 3, matiere: "Physique-Chimie", niveau: "TS", question: "La formule de la force en mécanique est :", choix: ["F = ma", "F = mv", "F = m/a", "F = m+a"], reponse: 0 },
  { id: 4, matiere: "Physique-Chimie", niveau: "1ère S", question: "La loi d'Ohm est :", choix: ["U = RI", "U = R/I", "U = R+I", "U = I/R"], reponse: 0 },
]

const ModifierExercice = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const exerciceOriginal = exercices_initial.find(e => e.id == id)

  const [form, setForm] = useState({
    matiere: exerciceOriginal?.matiere || 'Maths',
    niveau: exerciceOriginal?.niveau || '4ème',
    question: exerciceOriginal?.question || '',
    choix: exerciceOriginal?.choix || ['', '', '', ''],
    reponse: exerciceOriginal?.reponse || 0
  })
  const [erreur, setErreur] = useState('')
  const [succes, setSucces] = useState(false)

  if (!exerciceOriginal) return (
    <div className='gestion_page'>
      <h1>Exercice introuvable</h1>
      <button className="filtre_btn" onClick={() => navigate('/gestion-exercices')}>Retour</button>
    </div>
  )

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleChoixChange = (index, valeur) => {
    const nouveauxChoix = [...form.choix]
    nouveauxChoix[index] = valeur
    setForm({ ...form, choix: nouveauxChoix })
  }

  const handleSauvegarder = () => {
    if (!form.question) { setErreur("La question est obligatoire"); return }
    if (form.choix.some(c => !c)) { setErreur("Remplissez tous les choix"); return }
    setErreur('')

    const exercicesModifies = JSON.parse(localStorage.getItem("exercices_modifies") || "{}")
    exercicesModifies[id] = { ...exerciceOriginal, ...form, reponse: Number(form.reponse) }
    localStorage.setItem("exercices_modifies", JSON.stringify(exercicesModifies))
    setSucces(true)
  }

  if (succes) return (
    <div className='gestion_page'>
      <div className="paiement_succes">
        <span>✅</span>
        <h2>Exercice modifié avec succès !</h2>
        <p>La question a été mise à jour.</p>
        <button className="auth_btn" onClick={() => navigate('/gestion-exercices')}>
          Voir tous les exercices
        </button>
      </div>
    </div>
  )

  return (
    <div className='gestion_page'>

      <div className="gestion_header">
        <div>
          <h1>✏️ Modifier l'exercice</h1>
          <p>{exerciceOriginal.matiere} — {exerciceOriginal.niveau}</p>
        </div>
        <button className="filtre_btn" onClick={() => navigate('/gestion-exercices')}>
          ← Retour
        </button>
      </div>

      <div className="gestion_form">

        {erreur && <div className="auth_erreur">❌ {erreur}</div>}

        <div className="gestion_form_grid">

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

          <div className="auth_group" style={{ gridColumn: '1 / -1' }}>
            <label>Question</label>
            <textarea
              name="question"
              value={form.question}
              onChange={handleChange}
              placeholder="Écrivez la question ici..."
              rows="3"
            />
          </div>

        </div>

        {/* choix */}
        <h3 style={{ color: '#065f46', fontWeight: 'bold' }}>Choix de réponses</h3>
        <div className="exercice_choix_form">
          {form.choix.map((choix, index) => (
            <div key={index} className="exercice_choix_ligne">
              <div
                className={`exercice_choix_radio ${form.reponse == index ? 'radio_actif' : ''}`}
                onClick={() => setForm({ ...form, reponse: index })}
              >
                {String.fromCharCode(65 + index)}
              </div>
              <input
                value={choix}
                onChange={(e) => handleChoixChange(index, e.target.value)}
                placeholder={`Choix ${String.fromCharCode(65 + index)}`}
                className="exercice_choix_input"
              />
              {form.reponse == index && (
                <span className="exercice_bonne_reponse">✅ Bonne réponse</span>
              )}
            </div>
          ))}
          <p className="exercice_hint">Cliquez sur la lettre pour définir la bonne réponse</p>
        </div>

        <div className="gestion_form_btns">
          <button className="auth_btn" onClick={handleSauvegarder}>
            💾 Sauvegarder les modifications
          </button>
          <button className="filtre_btn" onClick={() => navigate('/gestion-exercices')}>
            Annuler
          </button>
        </div>

      </div>

    </div>
  )
}

export default ModifierExercice