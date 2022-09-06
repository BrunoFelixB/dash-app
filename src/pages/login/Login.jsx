import './Login.css';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/auth';
import {message} from 'antd';

export function Login() {

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const manipulateLogin = async (e) => {
        try {
            e.preventDefault();
            await login(email, password);
        }
        catch (error) {
            message.error("Usuario ou senha incorretos");
        }
    } 

    const recuperar = async (e) => {

        e.preventDefault();
        navigate("/recuperar");

    }

    return (

        <div className="container_login">

            <div className="left_login">
                <div className="headline_login">
                    <h1>Login Administrador</h1>
                </div>

                <form onSubmit={manipulateLogin}>

                    <input
                        type="text"
                        name='email'
                        placeholder="E-mail"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)} />

                    <input
                        type="password"
                        value={password}
                        name='senha'
                        placeholder="Senha"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <a href="/recuperar" onSubmit={recuperar}> Não consegue acessar sua conta? </a>

                    <input type="submit" value="Entrar" required />

                </form>

            </div>

        </div>


    );
}