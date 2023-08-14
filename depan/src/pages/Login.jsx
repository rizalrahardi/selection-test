import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Center, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, InputGroup, InputRightElement, VStack, useColorModeValue } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(
                /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).*$/,
                'Password must contain at least one uppercase letter, one symbol, and one number'
            ),
    });

    const onSubmit = async (values, actions) => {
        try {
            const response = await axios.post('http://localhost:8000/api/auth/login', values);
            const { user, token } = response.data;
            localStorage.setItem('token', token);
            if (user.roleId === 1) {
                navigate('/admin');
            } else {
                navigate('/employee');
            }
        } catch (error) {
            console.error('Login error:', error);
            actions.setFieldError('password', 'Invalid email or password');
        }
    };

    return (
        <Flex justifyContent="center" minH="100vh" d="flex" alignItems="center" p={8} bgColor={useColorModeValue('gray.100', 'gray.700')}>
            <Box maxW="md" w="full" bg="white" boxShadow="lg" bgColor={useColorModeValue('gray.100', 'gray.700')} rounded="lg" p={6} border={'1px'} borderColor={useColorModeValue('purple.200', 'purple.700')}>
                <Center>
                    <Heading mb={10}>Login !</Heading>
                </Center>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {(props) => (
                        <Form>
                            <VStack spacing={4}>
                                <Field name="email">
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.email && form.touched.email}>
                                            <FormLabel htmlFor="email">Email</FormLabel>
                                            <Input {...field} id="email" placeholder="Enter your email" bg={"gray.100"}
                                                border={0}
                                                color={"gray.500"}
                                                _placeholder={{
                                                    color: "gray.500",
                                                }} />
                                            <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="password">
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.password && form.touched.password}>
                                            <FormLabel htmlFor="password">Password</FormLabel>
                                            <InputGroup>
                                                <Field
                                                    as={Input}
                                                    type={showPassword ? "text" : "password"}
                                                    name="password"
                                                    placeholder="Password"
                                                    bg={"gray.100"}
                                                    border={0}
                                                    color={"gray.500"}
                                                    _placeholder={{
                                                        color: "gray.500",
                                                    }}
                                                />
                                                <InputRightElement width="3.5rem">
                                                    <Button
                                                        h="1.75rem"
                                                        size="md"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        bg="transparent"
                                                        _focus={{ outline: "none" }}
                                                        _active={{ outline: "none" }}
                                                        _hover={{ color: "teal.500" }}
                                                    >
                                                        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                            <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Button type="submit" isLoading={props.isSubmitting} colorScheme="teal">
                                    Login
                                </Button>
                            </VStack>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Flex>
    );
};

export default Login;
