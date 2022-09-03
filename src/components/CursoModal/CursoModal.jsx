import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
} from "@chakra-ui/react";
import { useState } from "react";

const CursoModal = ({ data, setData, dataEdit, isOpen, onClose }) => {
    const [title, setTitle] = useState(dataEdit.name || "");
    const [description, setDescription] = useState(dataEdit.email || "");
    const [duration, setDuration] = useState(dataEdit.curso || "");

    const handleSave = () => {
        if (!title || !description || !duration ) return;

        if (titleAlreadyExists()) {
            return alert("Curso já cadastrado!");
        }

        if (Object.keys(dataEdit).length) {
            data[dataEdit.index] = { title, description, duration };
        }

        const newDataArray = !Object.keys(dataEdit).length
            ? [...(data ? data : []), { title, description, duration }]
            : [...(data ? data : [])];

        localStorage.setItem("cad_cliente", JSON.stringify(newDataArray));

        setData(newDataArray);

        onClose();
    };

    const titleAlreadyExists = () => {
        if (dataEdit.title !== title && data?.length) {
            return data.find((item) => item.title === title);
        }

        return false;
    };

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
                        <Button colorScheme="green" mr={3} onClick={handleSave}>
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