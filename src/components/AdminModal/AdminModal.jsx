import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Box, useToast } from "@chakra-ui/react";
import React, { useState } from "react";

const AdminModal = ({ dataEdit, isOpen, onClose }) => {
    const toast = useToast()
    const [name, setName] = useState(dataEdit.name || "");
    const [email, setEmail] = useState(dataEdit.email || "");
    const [senha, setSenha] = useState(dataEdit.senha || "");
    const [confirmaSenha, setconfirmaSenha] = useState(dataEdit.confirmaSenha || "");

 
    function save(e) {

        e.preventDefault();

        if (nome.length <= 2) {

            toast({
                title: "O nome precisa ter mais de 2 caracteres",
                status: "warning",
                isClosable: true
            })

        } else {
            if (email.length <= 2) {

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
                    
                    if (senha !== confirmaSenha) {

                       
                        toast({
                            title: "As senhas não são iguais",
                            status: "error",
                            isClosable: true
                        })

                    } else {
                        fetch('https://api-myedu.herokuapp.com/admin/register', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({

                                name: name,
                                email: email,
                                password: senha,

                            })
                        })

                            .then(response => response.json())
                            .then(json => alert(JSON.stringify(json.message)));

                        onClose();
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
                    <ModalHeader>Cadastrar Admin</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl display="flex" flexDir="column" gap={4}>
                            <Box>
                                <FormLabel>Nome</FormLabel>
                                <Input
                                    type="text"
                                    value={name}
                                    placeholder="Ex: João"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel>E-mail</FormLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    placeholder="Ex: João@gmail.com"
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

export default AdminModal;