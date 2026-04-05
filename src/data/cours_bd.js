// 📌 Fonction pour récupérer tous les cours (base + localStorage)
export const getCours = () => {
  const coursLocal = JSON.parse(localStorage.getItem("cours") || "[]")
  const coursSupprimes = JSON.parse(localStorage.getItem("cours_supprimes") || "[]")
  const coursModifies = JSON.parse(localStorage.getItem("cours_modifies") || "{}")

  // 🔄 combine
  const tousLesCours = [...cours_bd, ...coursLocal]

  // ✏️ applique modifications
  const coursAvecModifs = tousLesCours.map(c => {
    if (coursModifies[c.id]) return coursModifies[c.id]
    return c
  })

  // ❌ filtre suppression (CORRIGÉ)
  return coursAvecModifs.filter(c => !coursSupprimes.includes(String(c.id)))
}


// 📚 Base de données des cours
export const cours_bd = [
  {
    id: 1,
    titre: "Les fonctions",
    matiere: "Maths",
    niveau: "TS",
    description: "Étude complète des fonctions mathématiques : limites, dérivées, variations.",
    duree: "3h",
    chapitres: [
      { id: 1, titre: "Introduction aux fonctions", lecons: ["Définition", "Domaine de définition", "Parité"] },
      { id: 2, titre: "Limites", lecons: ["Limite finie", "Limite infinie", "Opérations sur les limites"] },
      { id: 3, titre: "Dérivées", lecons: ["Définition", "Règles de dérivation", "Applications"] },
      { id: 4, titre: "Tableau de variations", lecons: ["Signe de la dérivée", "Extremums", "Représentation graphique"] },
    ],
    prix: 6000
  },
  {
    id: 2,
    titre: "Les équations",
    matiere: "Maths",
    niveau: "3ème",
    description: "Résolution d'équations du premier et second degré.",
    duree: "2h",
    chapitres: [
      { id: 1, titre: "Équations du 1er degré", lecons: ["Définition", "Résolution", "Applications"] },
      { id: 2, titre: "Équations du 2nd degré", lecons: ["Discriminant", "Racines", "Factorisation"] },
      { id: 3, titre: "Systèmes d'équations", lecons: ["Substitution", "Combinaison", "Applications"] },
    ],
    prix: 6000
  },
  {
    id: 3,
    titre: "La mécanique",
    matiere: "Physique-Chimie",
    niveau: "TS",
    description: "Les lois de Newton et applications.",
    duree: "2h30",
    chapitres: [
      { id: 1, titre: "Les forces", lecons: ["Définition", "Types de forces", "Représentation"] },
      { id: 2, titre: "Lois de Newton", lecons: ["1ère loi", "2ème loi", "3ème loi"] },
      { id: 3, titre: "Applications", lecons: ["Plan incliné", "Chute libre", "Projectile"] },
    ],
    prix: 6000
  },
  {
    id: 4,
    titre: "L'électricité",
    matiere: "Physique-Chimie",
    niveau: "1ère S",
    description: "Circuits électriques, loi d'Ohm et puissance.",
    duree: "2h",
    chapitres: [
      { id: 1, titre: "Circuits en série", lecons: ["Définition", "Tension", "Intensité"] },
      { id: 2, titre: "Circuits en parallèle", lecons: ["Définition", "Tension", "Intensité"] },
      { id: 3, titre: "Loi d'Ohm", lecons: ["Énoncé", "Applications", "Puissance"] },
    ],
    prix: 6000
  },
  {
    id: 5,
    titre: "Les statistiques",
    matiere: "Maths",
    niveau: "2nde S",
    description: "Moyenne, médiane, écart-type et représentations.",
    duree: "1h30",
    chapitres: [
      { id: 1, titre: "Moyenne", lecons: ["Définition", "Calcul", "Applications"] },
      { id: 2, titre: "Médiane", lecons: ["Définition", "Calcul", "Comparaison avec la moyenne"] },
      { id: 3, titre: "Écart-type", lecons: ["Définition", "Calcul", "Interprétation"] },
    ],
    prix: 6000
  },
  {
    id: 6,
    titre: "La chimie organique",
    matiere: "Physique-Chimie",
    niveau: "TS",
    description: "Les molécules organiques et leurs réactions.",
    duree: "3h",
    chapitres: [
      { id: 1, titre: "Alcanes", lecons: ["Structure", "Nomenclature", "Propriétés"] },
      { id: 2, titre: "Alcools", lecons: ["Structure", "Classification", "Réactions"] },
      { id: 3, titre: "Réactions organiques", lecons: ["Substitution", "Addition", "Élimination"] },
    ],
    prix: 6000
  },
  {
    id: 7,
    titre: "La géométrie",
    matiere: "Maths",
    niveau: "4ème",
    description: "Théorèmes et propriétés géométriques.",
    duree: "2h",
    chapitres: [
      { id: 1, titre: "Triangles", lecons: ["Propriétés", "Théorème de Pythagore", "Applications"] },
      { id: 2, titre: "Cercles", lecons: ["Définition", "Propriétés", "Angles inscrits"] },
    ],
    prix: 6000
  },
  {
    id: 8,
    titre: "Les ondes",
    matiere: "Physique-Chimie",
    niveau: "1ère S",
    description: "Propagation des ondes et applications.",
    duree: "2h",
    chapitres: [
      { id: 1, titre: "Ondes mécaniques", lecons: ["Définition", "Propagation", "Caractéristiques"] },
      { id: 2, titre: "Ondes sonores", lecons: ["Production", "Propagation", "Applications"] },
    ],
    prix: 6000
  },
]