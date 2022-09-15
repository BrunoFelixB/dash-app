import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Box } from "@chakra-ui/react";
import React, { useState } from "react";

const AlunoModal = ({dataEdit, isOpen, onClose }) => {
    const [nome, setName] = useState(dataEdit.name || "");
    const [emailAluno, setEmail] = useState(dataEdit.email || "");
    const [curso, setCurso] = useState(dataEdit.course || "");
    const [senha, setSenha] = useState("");
    const [confirmaSenha, setconfirmaSenha] = useState("");
    const access_token = localStorage.getItem("token")

    function save(e) {

        e.preventDefault();

        if (nome.length <= 2) {
            alert("O nome precisa ter mais de 2 caracteres");
        } else {
            if (emailAluno.length <= 2) {
                alert("O email precisa ter mais de 2 caracteres");
            } else {
                if (senha.length <= 2) {
                    alert("A senha precisa ter mais de 2 caracteres");
                } else {
                    if (senha.length <= 2) {
                        curso("O id do curso precisa ter mais de 2 caracteres");
                    } else {

                        if (senha !== confirmaSenha) {

                            alert("As senhas não são iguais");

                        } else {

                            if (dataEdit) {

                                fetch(`https://api-myedu.herokuapp.com/admin/student/${dataEdit._id}`, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${access_token}`
                                    },
                                    body: JSON.stringify({

                                        name: nome,
                                        email: emailAluno,
                                        password: senha,
                                        course: curso

                                    })
                                })

                                    .then((response) => {

                                        if (response.status == 200) {

                                            alert("Aluno Atualizado com Sucesso!")


                                        } else {

                                            alert("Confira os dados e tente novamente!")
                                        }
                                    })

                                onClose();

                            } else {
                                fetch('https://api-myedu.herokuapp.com/admin/student', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${access_token}`
                                    },
                                    body: JSON.stringify({

                                        name: nome,
                                        email: emailAluno,
                                        password: senha,
                                        course: curso

                                    })
                                })

                                .then((response) => {

                                    if (response.status == 200) {

                                        alert("Aluno criado com Sucesso!")


                                    } else {

                                        alert("Confira os dados e tente novamente!")
                                    }
                                })

                                onClose();
                            }
                        }
                    }
                }
            }
        }
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cadastrar Aluno</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl display="flex" flexDir="column" gap={4}>
                            <Box>
                                <FormLabel>Nome</FormLabel>
                                <Input
                                    type="text"
                                    value={nome}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel>E-mail</FormLabel>
                                <Input
                                    type="email"
                                    value={emailAluno}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel>Senha</FormLabel>
                                <Input
                                    type="password"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel>Confirmar Senha</FormLabel>
                                <Input
                                    type="password"
                                    value={confirmaSenha}
                                    onChange={(e) => setconfirmaSenha(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel>Curso</FormLabel>
                                <Input
                                    type="text"
                                    value={curso}
                                    onChange={(e) => setCurso(e.target.value)}
                                />
                            </Box>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter justifyContent="start">
                        <Button colorScheme="green" mr={3} onClick={save}>
                            SALVAR
                        </Button>
                        <Button colorScheme="red" onClick={onClose}>
                            CANCELAR
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AlunoModal;