import './Login.css';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/auth';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Flex, Spinner, useToast } from "@chakra-ui/react";

export function Login() {

    const { login } = useContext(AuthContext);
    const toast = useToast()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)

    const manipulateLogin = async (e) => {

        setLoading(true)

        try {
            e.preventDefault();
            await login(email, password);
        }
        catch (error) {

            toast({
                title: "Usuario ou senha incorretos",
                status: "error",
                isClosable: true
            })

            setLoading(false)
        }
    }

    return (

        <Flex
            h="100vh"
            align="center"
            justify="center"
            fontSize="20px"
            alignItems="center"
            flexWrap="wrap"
        >

            <div className="left_login">

                <div className='container_top'>
                    <div className='back_btn_login'>
                        <a href="https://myedu-ead.vercel.app/"><ArrowLeftOutlined /></a>
                    </div>
                    <div className="headline_login_h1">
                        <h1>Login Administrador</h1>
                    </div>
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

                    <Link className='link' to="/recuperar"> Não consegue acessar sua conta? </Link>

                    {loading ? <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='lg'
                    /> : <input type="submit" value="Entrar" required />}

                </form>

            </div>

        </Flex>

    );
}