import './Header.css'
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../pages/contexts/auth';
import { Menu, MenuButton, MenuList, MenuGroup, MenuItem, Button, Flex } from "@chakra-ui/react";

export function Header(props) {

    const name = localStorage.getItem('name');

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
                                <p className="logo" >MyEdu</p>
                            </div>

                        </Link>

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

                    <div className='Position_user'>
                            <Menu>
                                    <MenuButton as={Button} colorScheme='blue'>
                                        {name}
                                    </MenuButton>
                                    <MenuList>
                                        <MenuGroup>
                                            <MenuItem>Configurações</MenuItem>
                                            <MenuItem onClick={logoutUser}> Sair </MenuItem>
                                        </MenuGroup>
                                    </MenuList>
                            </Menu>
                        </div>

                </nav>
            </header>
        </>
    );
}