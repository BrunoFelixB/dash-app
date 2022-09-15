import './Loginreset.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export function Loginreset() {

    const navigate = useNavigate();

    const voltar = (e) => {
        e.preventDefault();
        navigate("/");
    }

    return (

        <div className="container_login_reset">

            <div className='back__btn'>
                <Link to="/"><ArrowLeftOutlined /></Link>
            </div>

            <div className="left_login_reset">
                <div className="headline_login_reset">
                    <h1>Recuperar Senha</h1>
            </div>

                <form>
                    <input
                        type="text"
                        name='cpf'
                        placeholder="Digite seu CPF"
                    />

                    <input type="submit" value="Recuperar" required />
                    
                </form>

            </div>

        </div>


    );
}