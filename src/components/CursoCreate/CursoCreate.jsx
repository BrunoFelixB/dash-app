import React, { useState, useEffect } from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex, Button, useDisclosure, Table, Thead, Tr, Th, Tbody, Td, useBreakpointValue, Spinner } from "@chakra-ui/react";
import CursoModal from "../CursoModal/CursoModal";
import axios from "axios";

const CursoCreate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState("");
  const [course, setCourse] = useState([]);

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

  //Fazendo um GET na API 

  useEffect(() => {
    axios.get('https://api-myedu.herokuapp.com/admin/course', {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
      .then((res) => {
        setCourse(res.data.courses)
      })
      .catch((error) => {
        console.error(error)
      })
  }, []);

  const handleRemove = (_id) => {
    const newArray = data.filter((item) => item._id !== _id);

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
          NOVO CURSO
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
                  Descrição
                </Th>
                <Th maxW={isMobile ? 5 : 200} fontSize="20px">
                  Duração
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead> {course.length < 1 ? <Tbody>
                <Tr cursor="pointer " _hover={{ bg: "gray.100" }}>
                  <Td maxW={isMobile ? 5 : 50}><Spinner/></Td>
                  <Td maxW={isMobile ? 5 : 100}><Spinner/></Td>
                  <Td maxW={isMobile ? 5 : 100}><Spinner/></Td>
                  <Td maxW={isMobile ? 5 : 100}><Spinner/></Td>
                </Tr>
            </Tbody> : <Tbody>
              {course.map(({ _id, name, description, duration }, index) => (
                <Tr key={index} cursor="pointer " _hover={{ bg: "gray.100" }}>
                  <Td maxW={isMobile ? 5 : 50}>{_id}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{name}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{description}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{duration}</Td>
                  <Td p={0}>
                    <EditIcon
                      fontSize={20}
                      onClick={() => [
                        setDataEdit({ _id, name, description, duration, index }),
                        onOpen(),
                      ]}
                    />
                  </Td>
                  <Td p={0}>
                    <DeleteIcon
                      fontSize={20}
                      onClick={() => handleRemove(_id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>}
          </Table>
        </Box>
      </Box>
      {isOpen && (
        <CursoModal
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

export default CursoCreate;