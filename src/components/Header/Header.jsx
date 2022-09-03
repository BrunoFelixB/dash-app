import './Header.css'
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../pages/contexts/auth';

export function Header(props) {

    const { logout } = useContext(AuthContext);

    const logoutUser = () => {
        logout();
    }

    return (
        <>
            <header className="header">
                <nav className="nav">

                    <div className="logo_container">

                        <Link className='link' to="/dashboard">
                            <div className='position_logo'>
                                <a href="/dashboard" className="logo">MyEdu</a>
                            </div>
                        </Link>

                        <div className='Position_user'>
                            <h1 onClick={logoutUser}>Sair</h1>
                        </div>

                    </div>

                    <div className="nav_menu">

                        <Link className='link' to="/dashboard">
                            <div className={props.number == 1 ? 'nav_item_active' : 'nav_item_1'}>
                                <h1 className='text_nav'>Dashboard</h1>
                            </div>
                        </Link>

                        <Link className='link' to="/dashboard/alunos">
                            <div className={props.number == 2 ? 'nav_item_active' : 'nav_item_2'}>
                                <h1>Alunos</h1>
                            </div>
                        </Link>

                        <Link className='link' to="/dashboard/professores">
                            <div className={props.number == 3 ? 'nav_item_active' : 'nav_item_3'}>
                                <h1>Professores</h1>
                            </div>
                        </Link>

                        <Link className='link' to="/dashboard/admin">
                            <div className={props.number == 4 ? 'nav_item_active' : 'nav_item_4'}>
                                <h1>Admin</h1>
                            </div>
                        </Link>

                        <Link className='link' to="/dashboard/cursos">
                            <div className={props.number == 5 ? 'nav_item_active' : 'nav_item_5'}>
                                <h1>Cursos</h1>
                            </div>
                        </Link>

                    </div>
                </nav>
            </header>
        </>
    );
}