import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Box } from "@chakra-ui/react";
import React, { useState } from "react";

const AdminModal = ({ data, setData, dataEdit, isOpen, onClose }) => {
    const [name, setName] = useState(dataEdit.name || "");
    const [email, setEmail] = useState(dataEdit.email || "");
    const [senha, setSenha] = useState(dataEdit.senha || "");
    const [confirmaSenha, setconfirmaSenha] = useState(dataEdit.confirmaSenha || "");


    function save(e) {

        e.preventDefault();

        if (nome.length <= 2) {
            alert("O nome precisa ter mais de 2 caracteres");
        } else {
            if (email.length <= 2) {
                alert("O email precisa ter mais de 2 caracteres");
            } else {
                if (senha.length <= 2) {
                    alert("A senha precisa ter mais de 2 caracteres");
                } else {
                    if (senha !== confirmaSenha) {

                        alert("As senhas não são iguais");

                    } else {
                        fetch('http://localhost:8080/admin/register', {
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

    const emailAlreadyExists = () => {
        if (dataEdit.email !== email && data?.length) {
            return data.find((item) => item.email === email);
        }

        return false;
    };

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
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel>E-mail</FormLabel>
                                <Input
                                    type="email"
                                    value={email}
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