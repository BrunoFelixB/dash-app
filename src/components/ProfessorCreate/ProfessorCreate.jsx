import React, { useState, useEffect } from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex, Button, useDisclosure, Table, Thead, Tr, Th, Tbody, Td, useBreakpointValue, Spinner } from "@chakra-ui/react";
import ProfessorModal from "../ProfessorModal/ProfessorModal";
import axios from "axios";

const ProfessorCreate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState("");
  const [prof, setProf] = useState([]);


  const access_token = localStorage.getItem("token")

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  useEffect(() => {
    const db_costumer = localStorage.getItem("cad_cliente")
      ? JSON.parse(localStorage.getItem("cad_cliente"))
      : [];

    setData(db_costumer);
  }, [setData]);

  useEffect(() => {
    axios.get('https://api-myedu.herokuapp.com/admin/educator', {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
      .then((res) => {
        setProf(res.data.message)
      })
      .catch((error) => {
        console.error(error)
      })
  }, []);

  const handleRemove = (email) => {
    const newArray = data.filter((item) => item.email !== email);

    setData(newArray);

    localStorage.setItem("cad_cliente", JSON.stringify(newArray));
  };

  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      fontSize="20px"
    >
      <Box maxW={1000} w="100%" h="90vh" py={10} px={2}>
        <Button colorScheme="blue" onClick={() => [setDataEdit(0), onOpen()]}>
          NOVO PROFESSOR
        </Button>

        <Box overflowY="auto" height="100%" marginTop="20px">
          <Table mt="6">
            <Thead>
              <Tr>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  id
                </Th>
                <Th maxW={isMobile ? 5 : 200} fontSize="20px">
                  Nome
                </Th>
                <Th maxW={isMobile ? 5 : 200} fontSize="20px">
                  E-Mail
                </Th>
                <Th maxW={isMobile ? 5 : 200} fontSize="20px">
                  Senha
                </Th>
                <Th maxW={isMobile ? 5 : 200} fontSize="20px">
                  Curso
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead> {prof.length < 1 ? <Tbody>
              <Tr cursor="pointer " _hover={{ bg: "gray.100" }}>
                <Td maxW={isMobile ? 5 : 50}><Spinner /></Td>
                <Td maxW={isMobile ? 5 : 100}><Spinner /></Td>
                <Td maxW={isMobile ? 5 : 100}><Spinner /></Td>
                <Td maxW={isMobile ? 5 : 100}><Spinner /></Td>
              </Tr>
            </Tbody> : <Tbody>
              {prof.map(({ _id, name, email, senha, course }, index) => (
                <Tr key={index} cursor="pointer " _hover={{ bg: "gray.100" }}>
                  <Td maxW={isMobile ? 5 : 50}>{_id}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{name}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{email}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{senha}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{course}</Td>
                  <Td p={0}>
                    <EditIcon
                      fontSize={20}
                      onClick={() => [
                        setDataEdit({ _id, name, email, senha, course, index }),
                        onOpen(),
                      ]}
                    />
                  </Td>
                  <Td p={0}>
                    <DeleteIcon
                      fontSize={20}
                      onClick={() => handleRemove(email)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>}

          </Table>
        </Box>
      </Box>
      {isOpen && (
        <ProfessorModal
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
        />
      )}
    </Flex>
  );
};

export default ProfessorCreate;