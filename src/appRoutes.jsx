import { useContext } from 'react'

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from 'react-router-dom'

import { Login } from "./pages/login/Login"
import { Loginreset } from './pages/loginreset/Loginreset'

import { Dashboard } from "./pages/dashboard/dashboard"

import { AlunoDash } from './pages/alunos/AlunoDash'

import { ProfessorDash } from './pages/professores/ProfessorDash'

import { AdminDash } from './pages/admin/AdminDash'

import { CursoDash } from './pages/cursos/CursoDash'

import { AuthProvider, AuthContext } from './pages/contexts/auth'

const AppRoutes = () => {

    const Private = ({ children }) => {

        const { authenticated, loading } = useContext(AuthContext)
   
        if (loading) {
            return <div>Carregando...</div>;
        }

        if (!authenticated) {
            
            return <Navigate to="/"/>;
        }

        return children;

    }

    return (

        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/recuperar" element={<Loginreset />} />
                    <Route
                        path="/dashboard"
                        element={
                            <Private>
                                <Dashboard />
                            </Private>
                        }
                        />
                    <Route
                        path="/dashboard/alunos"
                        element={
                            <Private>
                                <AlunoDash />
                            </Private>
                        }
                        />
                        <Route
                        path="/dashboard/professores"
                        element={
                            <Private>
                                <ProfessorDash />
                            </Private>
                        }
                        />
                         <Route
                        path="/dashboard/admin"
                        element={
                            <Private>
                                <AdminDash />
                            </Private>
                        }
                        />
                         <Route
                        path="/dashboard/cursos"
                        element={
                            <Private>
                                <CursoDash />
                            </Private>
                        }
                        />
                </Routes>
            </AuthProvider>
        </Router>
    )
} 

export default AppRoutes;