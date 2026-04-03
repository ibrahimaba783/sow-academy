import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)

  const PROF = {
    id: 0,
    nom: "ALIOU SOW",
    email: "Sowaliou2504@gmail.com",
    motdepasse: "prof1234",
    role: "prof",
    matieres: ["Maths", "Physique-Chimie"],
    niveaux: ["4ème", "3ème", "2nde S", "1ère S", "TS"]
  }

  const login = (email, motdepasse) => {
    if (email === PROF.email && motdepasse === PROF.motdepasse) {
      setUser(PROF)
      return { success: true, role: "prof" }
    }
    const etudiants = JSON.parse(localStorage.getItem("etudiants") || "[]")
    const etudiant = etudiants.find(e => e.email === email && e.motdepasse === motdepasse)
    if (etudiant) {
      setUser(etudiant)
      return { success: true, role: "etudiant" }
    }
    return { success: false, message: "Email ou mot de passe incorrect" }
  }

  const register = (data) => {
    const etudiants = JSON.parse(localStorage.getItem("etudiants") || "[]")
    const existe = etudiants.find(e => e.email === data.email)
    if (existe) return { success: false, message: "Cet email est déjà utilisé" }
    const nouvelEtudiant = {
      ...data,
      id: Date.now(),
      role: "etudiant",
      abonnements: [],
      progression: []
    }
    etudiants.push(nouvelEtudiant)
    localStorage.setItem("etudiants", JSON.stringify(etudiants))
    setUser(nouvelEtudiant)
    return { success: true }
  }

  // vérifie si abonnement annuel actif pour une matière
  const abonnementActif = (matiere) => {
    if (!user || !user.abonnements) return false
    const abonnement = user.abonnements.find(a => a.matiere === matiere)
    if (!abonnement) return false
    const dateExpiration = new Date(abonnement.date)
    dateExpiration.setFullYear(dateExpiration.getFullYear() + 1)
    return new Date() < dateExpiration
  }

  const payer = (matiere, niveau, methode) => {
    const etudiants = JSON.parse(localStorage.getItem("etudiants") || "[]")
    const index = etudiants.findIndex(e => e.id === user.id)
    if (index !== -1) {
      const paiement = {
        matiere,
        niveau,
        methode,
        montant: 6000,
        date: new Date().toISOString()
      }
      // remplace si déjà abonné à cette matière
      etudiants[index].abonnements = etudiants[index].abonnements.filter(a => a.matiere !== matiere)
      etudiants[index].abonnements.push(paiement)
      localStorage.setItem("etudiants", JSON.stringify(etudiants))
      setUser({ ...etudiants[index] })
      return true
    }
    return false
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, register, logout, abonnementActif, payer }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)