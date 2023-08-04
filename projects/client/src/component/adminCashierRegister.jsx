import {
  Box,
  Button,
  Modal,
  ModalHeader,
  ModalContent,
  useDisclosure,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Input,
  Tfoot,
  ModalFooter,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { getCashiers, registerCashier } from "../redux/reducer/authreducer";
import { useFormik } from "formik";

const AdminCashierRegister = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const handleClick = () => {
    onOpen();
  };

  const handleSubmit = async () => {
    const data = {
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      confirmpassword: document.getElementById("confirmpassword").value,
    };
    await dispatch(registerCashier(data));
    await dispatch(getCashiers());
  };
  // const regisCashierScheme = Yup.object().shape({
  //   username: Yup.string().required("Username harus diisi"),
  //   email: Yup.string()
  //     .required("Email harus diisi")
  //     .email("Email harus valid"),
  //   password: Yup.string()
  //     .required("Password harus diisi")
  //     .matches(
  //       /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{6,}$/,
  //       "Password minimal 6 karakter, 1 symbol, dan 1 huruf kapital"
  //     ),
  //   confirmpassword: Yup.string()
  //     .required("Konfirmasi Password harus diisi")
  //     .oneOf([Yup.ref("password"), null], "Password tidak sama"),
  // });
  // const formik = useFormik({
  //   initialValues: {
  //     username: "",
  //     email: "",
  //     password: "",
  //     confirmpassword: "",
  //   },
  //   validationSchema: regisCashierScheme,
  //   onSubmit: (values) => {
  //     handleSubmit();
  //   },
  // });
  return (
    <Box>
      <Button colorScheme="red" onClick={() => handleClick()}>
        Add Cashier
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
        <ModalOverlay />
        <ModalContent pb={"20px"}>
          <ModalHeader>Ini Register</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table>
              <Thead>
                <Tr>
                  <Th width={"30%"}>Field</Th>
                  <Th width={"70%"}>Input</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Username</Td>
                  <Td>
                    <Input id="username" />
                  </Td>
                </Tr>
                <Tr>
                  <Td>Email</Td>
                  <Td>
                    <Input id="email" />
                  </Td>
                </Tr>
                <Tr>
                  <Td>Password</Td>
                  <Td>
                    <Input id="password" />
                  </Td>
                </Tr>
                <Tr>
                  <Td>Confirm Password</Td>
                  <Td>
                    <Input id="confirmpassword" />
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme={"red"} onClick={() => handleSubmit()}>
              Register
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AdminCashierRegister;
