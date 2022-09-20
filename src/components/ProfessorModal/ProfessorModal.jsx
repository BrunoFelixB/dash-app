import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Box, useToast } from "@chakra-ui/react";
import React, { useState } from "react";

const ProfessorModal = ({ dataEdit, isOpen, onClose }) => {

    const toast = useToast()
    const [nome, setName] = useState(dataEdit.name || "");
    const [emailProf, setEmail] = useState(dataEdit.email || "");
    const [curso, setCurso] = useState(dataEdit.curso || "");
    const [senha, setSenha] = useState("");
    const [confirmaSenha, setconfirmaSenha] = useState("");
    const access_token = localStorage.getItem("token")

    function save(e) {

        if (nome.length <= 2) {

            toast({
                title: "O nome precisa ter mais de 2 caracteres",
                status: "warning",
                isClosable: true
            })

        } else {
            if (emailAluno.length <= 2) {

                toast({
                    title: "O email precisa ter mais de 2 caracteres",
                    status: "warning",
                    isClosable: true
                })

            } else {
                if (senha.length <= 2) {

                    toast({
                        title: "O senha precisa ter mais de 2 caracteres",
                        status: "warning",
                        isClosable: true
                    })

                } else {
                    if (senha.length <= 2) {

                        toast({
                            title: "O id do curso precisa ter mais de 2 caracteres",
                            status: "warning",
                            isClosable: true
                        })

                    } else {

                        if (senha !== confirmaSenha) {

                            toast({
                                title: "As senhas não são iguais",
                                status: "error",
                                isClosable: true
                            })

                        } else {

                            if (dataEdit !== 0) {

                                fetch(`https://api-myedu.herokuapp.com/admin/educator/${dataEdit._id}`, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${access_token}`
                                    },
                                    body: JSON.stringify({

                                        name: nome,
                                        email: emailProf,
                                        password: senha,
                                        course: curso

                                    })
                                })

                                    .then((response) => {

                                        if (response.status == 200) {

                                            toast({
                                                title: "Professor atualizado com Sucesso!",
                                                status: "success",
                                                isClosable: true
                                            })

                                            onClose();

                                        } else {

                                            toast({
                                                title: "Confira os dados e tente novamente!",
                                                status: "error",
                                                isClosable: true
                                            })

                                        }
                                    })


                            } else {

                                fetch('https://api-myedu.herokuapp.com/admin/educator', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${access_token}`
                                    },
                                    body: JSON.stringify({

                                        name: nome,
                                        email: emailProf,
                                        password: senha,
                                        course: curso

                                    })
                                })

                                    .then((response) => {

                                        if (response.status == 200) {

                                            toast({
                                                title: "Professor criado com Sucesso!",
                                                status: "success",
                                                isClosable: true
                                            })


                                            onClose();

                                        } else {

                                            toast({
                                                title: "Confira os dados e tente novamente!",
                                                status: "error",
                                                isClosable: true
                                            })

                                        }
                                    })

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
                    <ModalHeader>Cadastrar Professor</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl display="flex" flexDir="column" gap={4}>
                            <Box>
                                <FormLabel>Nome</FormLabel>
                                <Input
                                    type="text"
                                    value={nome}
                                    placeholder="Ex: João Marcos"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel>E-mail</FormLabel>
                                <Input
                                    type="email"
                                    placeholder="Ex: João@gmail.com"
                                    value={emailProf}
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
                                    placeholder="Ex: 62df51e76e7eaa211c86ba87"
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

export default ProfessorModal;