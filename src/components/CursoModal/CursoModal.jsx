import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Box } from "@chakra-ui/react";
import React, { useState } from "react";

const CursoModal = ({ dataEdit, isOpen, onClose }) => {
    const [title, setTitle] = useState(dataEdit.name || "");
    const [description, setDescription] = useState(dataEdit.email || "");
    const [duration, setDuration] = useState(dataEdit.curso || "");
    const access_token = localStorage.getItem("token")

    function save(e) {

        e.preventDefault();

        if (title.length <= 2) {
            alert("O nome precisa ter mais de 2 caracteres");
        } else {
            if (description.length <= 2) {
                alert("A senha precisa ter mais de 2 caracteres");
            } else {
                if (duration.length <= 2) {
                    curso("O id do curso precisa ter mais de 2 caracteres");
                } else {

                    if (dataEdit !== 0) {

                        fetch(`https://api-myedu.herokuapp.com/admin/course/${dataEdit._id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${access_token}`
                            },
                            body: JSON.stringify({

                                name: title,
                                description: description,
                                duration: duration,

                            })
                        })

                            .then((response) => {

                                if (response.status == 200) {

                                    alert("Curso atualizado com Sucesso!")


                                } else {

                                    alert("Confira os dados e tente novamente!")
                                }
                            })

                        onClose();

                    } else {

                        fetch('https://api-myedu.herokuapp.com/admin/course', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${access_token}`
                            },
                            body: JSON.stringify({

                                name: title,
                                description: description,
                                duration: duration,

                            })
                        })

                            .then((response) => {

                                if (response.status == 200) {

                                    alert("Curso criado com Sucesso!")


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
                                <FormLabel>Título</FormLabel>
                                <Input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel>Descrição</FormLabel>
                                <Input
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel>Duração</FormLabel>
                                <Input
                                    type="text"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
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

export default CursoModal;