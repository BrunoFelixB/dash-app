import './Introducion.css'
import React from 'react';


export function Introducion() {

    return (
        <>
            <div>
                <section className='section'>
                    <div className='container'>
                        <div className='title'>
                        <h1>Bem vindo ao Dashboard Administrador</h1>
                        <h4>Instruções</h4>
                        </div>
                        <div className='corpo'>
                        <p> Para consultar ou criar alunos, ir até a página de alunos </p>
                        <p> Para consultar ou criar professores, ir até a página de professores </p>
                        <p> Para criar usuarios administradores, ir até a página de admin </p>
                        <p> Para consultar ou criar cursos, ir até a página de cursos </p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}