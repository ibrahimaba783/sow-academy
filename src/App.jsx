import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ProfDashboard from './pages/ProfDashboard'
import Cours from './pages/Cours'
import CoursDetail from './pages/CoursDetail'
import Exercices from './pages/Exercices'
import Forum from './pages/Forum'
import Profil from './pages/Profil'
import Paiement from './pages/Paiement'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import GestionCours from './pages/GestionCours'
import AjouterCours from './pages/AjouterCours'
import ModifierCours from './pages/ModifierCours'
import SupprimerCours from './pages/SupprimerCours'
import GestionExercices from './pages/GestionExercices'
import AjouterExercice from './pages/AjouterExercice'
import ModifierExercice from './pages/ModifierExercice'
import SupprimerExercice from './pages/SupprimerExercice'
import GestionChapitres from './pages/GestionChapitres'
import AjouterChapitre from './pages/AjouterChapitre'
import ModifierChapitre from './pages/ModifierChapitre'
import SupprimerChapitre from './pages/SupprimerChapitre'
import GestionLecons from './pages/GestionLecons'
import AjouterLecon from './pages/AjouterLecon'
import ModifierLecon from './pages/ModifierLecon'
import SupprimerLecon from './pages/SupprimerLecon'
import GestionEvaluations from './pages/GestionEvaluations'
import AjouterEvaluation from './pages/AjouterEvaluation'
import ModifierEvaluation from './pages/ModifierEvaluation'
import SupprimerEvaluation from './pages/SupprimerEvaluation'
import AjouterPDF from './pages/AjouterPDF'
import AjouterVideo from './pages/AjouterVideo'
import Ressources from './pages/Ressources'
import ProfParametres from './pages/ProfParametres'



function App() {

  const Router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/dashboard", element: <ProtectedRoute role="etudiant"><Dashboard /></ProtectedRoute> },
        { path: "/prof", element: <ProtectedRoute role="prof"><ProfDashboard /></ProtectedRoute> },
        { path: "/cours", element: <ProtectedRoute><Cours /></ProtectedRoute> },
        { path: "/cours/:id", element: <ProtectedRoute><CoursDetail /></ProtectedRoute> },
        { path: "/exercices", element: <ProtectedRoute><Exercices /></ProtectedRoute> },
        { path: "/forum", element: <ProtectedRoute><Forum /></ProtectedRoute> },
        { path: "/profil", element: <ProtectedRoute><Profil /></ProtectedRoute> },
        { path: "/paiement", element: <ProtectedRoute><Paiement /></ProtectedRoute> },
        { path: "/prof-parametres", element: <ProtectedRoute role="prof"><ProfParametres /></ProtectedRoute> },

        // Routes prof gestion cours
        { path: "/gestion-cours", element: <ProtectedRoute role="prof"><GestionCours /></ProtectedRoute> },
        { path: "/ajouter-cours", element: <ProtectedRoute role="prof"><AjouterCours /></ProtectedRoute> },
        { path: "/modifier-cours/:id", element: <ProtectedRoute role="prof"><ModifierCours /></ProtectedRoute> },
        { path: "/supprimer-cours/:id", element: <ProtectedRoute role="prof"><SupprimerCours /></ProtectedRoute> },

        // Routes prof gestion exercices
        { path: "/gestion-exercices", element: <ProtectedRoute role="prof"><GestionExercices /></ProtectedRoute> },
        { path: "/ajouter-exercice", element: <ProtectedRoute role="prof"><AjouterExercice /></ProtectedRoute> },
        { path: "/modifier-exercice/:id", element: <ProtectedRoute role="prof"><ModifierExercice /></ProtectedRoute> },
        { path: "/supprimer-exercice/:id", element: <ProtectedRoute role="prof"><SupprimerExercice /></ProtectedRoute> },

        // Routes prof gestion chapitres
        { path: "/gestion-chapitres/:id", element: <ProtectedRoute role="prof"><GestionChapitres /></ProtectedRoute> },
        { path: "/ajouter-chapitre/:id", element: <ProtectedRoute role="prof"><AjouterChapitre /></ProtectedRoute> },
        { path: "/modifier-chapitre/:coursId/:chapitreId", element: <ProtectedRoute role="prof"><ModifierChapitre /></ProtectedRoute> },
        { path: "/supprimer-chapitre/:coursId/:chapitreId", element: <ProtectedRoute role="prof"><SupprimerChapitre /></ProtectedRoute> },

        // Routes prof gestion lecons
        { path: "/gestion-lecons/:coursId/:chapitreId", element: <ProtectedRoute role="prof"><GestionLecons /></ProtectedRoute> },
        { path: "/ajouter-lecon/:coursId/:chapitreId", element: <ProtectedRoute role="prof"><AjouterLecon /></ProtectedRoute> },
        { path: "/modifier-lecon/:coursId/:chapitreId/:leconId", element: <ProtectedRoute role="prof"><ModifierLecon /></ProtectedRoute> },
        { path: "/supprimer-lecon/:coursId/:chapitreId/:leconId", element: <ProtectedRoute role="prof"><SupprimerLecon /></ProtectedRoute> },

        // Routes prof gestion evaluations
        { path: "/ressources", element: <ProtectedRoute><Ressources /></ProtectedRoute> },
        { path: "/gestion-evaluations", element: <ProtectedRoute role="prof"><GestionEvaluations /></ProtectedRoute> },
        { path: "/ajouter-evaluation", element: <ProtectedRoute role="prof"><AjouterEvaluation /></ProtectedRoute> },
        { path: "/modifier-evaluation/:id", element: <ProtectedRoute role="prof"><ModifierEvaluation /></ProtectedRoute> },
        { path: "/supprimer-evaluation/:id", element: <ProtectedRoute role="prof"><SupprimerEvaluation /></ProtectedRoute> },
        { path: "/ajouter-pdf", element: <ProtectedRoute role="prof"><AjouterPDF /></ProtectedRoute> },
        { path: "/ajouter-video", element: <ProtectedRoute role="prof"><AjouterVideo /></ProtectedRoute> },
      ]
    },
    { path: "*", element: <NotFound /> },
  ])

  return (
    <AuthProvider>
      <RouterProvider router={Router} />
    </AuthProvider>
  )
}

export default App