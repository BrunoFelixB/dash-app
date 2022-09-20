import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Box, useToast } from "@chakra-ui/react";
import React, { useState } from "react";

const CursoModal = ({ dataEdit, isOpen, onClose }) => {

    const toast = useToast()
    const [title, setTitle] = useState(dataEdit.name || "");
    const [description, setDescription] = useState(dataEdit.email || "");
    const [duration, setDuration] = useState(dataEdit.curso || "");
    const access_token = localStorage.getItem("token")

    function save(e) {

        e.preventDefault();

        if (title.length <= 2) {
            
            toast({
                title: "O nome precisa ter mais de 2 caracteres",
                status: "warning",
                isClosable: true
            })

        } else {
            if (description.length <= 2) {

                toast({
                    title: "A senha precisa ter mais de 2 caracteres",
                    status: "warning",
                    isClosable: true
                })

            } else {
                if (duration.length <= 2) {

                    toast({
                        title: "O id do curso precisa ter mais de 2 caracteres",
                        status: "warning",
                        isClosable: true
                    })

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
                                            
                                    toast({
                                        title: "Curso atualizado com Sucesso!",
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
                                            
                                    toast({
                                        title: "Curso criado com Sucesso!",
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