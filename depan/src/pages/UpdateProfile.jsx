import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    VStack,
    Card,
    CardBody,
    IconButton,
    InputGroup,
    InputRightElement,
    useToast,
    useColorModeValue,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
    const toast = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const initialValues = {
        name: '',
        birthday: '',
        password: '',
        confirmPassword: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        birthday: Yup.date().required('Birthday is required'),
        password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters')
            .matches(
                /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).*$/,
                'Password must contain at least one uppercase letter, one symbol, and one number'
            ),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(
                /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).*$/,
                'Password must contain at least one uppercase letter, one symbol, and one number'
            ),
    });

    const onSubmit = async (values) => {
        try {
            const url = window.location.href.split('/');
            const token = url[url.length - 1];
            console.log(token)
            const response = await axios.post('http://localhost:8000/api/user/profile', values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const updatedUser = response.data.user;
            console.log(updatedUser);
            toast({
                title: 'Profile Updated',
                description: 'Your profile has been successfully updated. please login!',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            navigate('/');
        } catch (error) {
            console.error('Update profile error:', error);
            toast({
                title: 'Error',
                description: error.response.data.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box p={4} display="flex" justifyContent="center" alignItems="center" h="100vh" bgColor={'gray.100'}>
            <Card w={['md', 'lg', 'xl']} borderWidth="1px" borderRadius="lg" overflow="hidden" border={'1px'} borderColor={useColorModeValue('purple.200', 'purple.700')}>
                <CardBody>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        {(props) => (
                            <Form>
                                <VStack spacing={4}>
                                    <Field name="name">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.name && form.touched.name}>
                                                <FormLabel htmlFor="name">Name</FormLabel>
                                                <Input {...field} id="name" placeholder="Enter name" />
                                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="birthday">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.birthday && form.touched.birthday}>
                                                <FormLabel htmlFor="birthday">Birthday</FormLabel>
                                                <Input {...field} id="birthday" type="date" />
                                                <FormErrorMessage>{form.errors.birthday}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="password">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.password && form.touched.password}>
                                                <FormLabel htmlFor="password">Password</FormLabel>
                                                <InputGroup>
                                                    <Input
                                                        {...field}
                                                        id="password"
                                                        type={showPassword ? 'text' : 'password'}
                                                        placeholder="Enter password"
                                                    />
                                                    <InputRightElement width="3.5rem">
                                                        <IconButton
                                                            h="1.75rem"
                                                            size="md"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            bg="transparent"
                                                            _focus={{ outline: 'none' }}
                                                            _active={{ outline: 'none' }}
                                                            _hover={{ color: 'teal.500' }}
                                                            icon={showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                                        />
                                                    </InputRightElement>
                                                </InputGroup>
                                                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="confirmPassword">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}>
                                                <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                                                <InputGroup>
                                                    <Input
                                                        {...field}
                                                        id="confirmPassword"
                                                        type={showConfirmPassword ? 'text' : 'password'}
                                                        placeholder="Confirm password"
                                                    />
                                                    <InputRightElement width="3.5rem">
                                                        <IconButton
                                                            h="1.75rem"
                                                            size="md"
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                            bg="transparent"
                                                            _focus={{ outline: 'none' }}
                                                            _active={{ outline: 'none' }}
                                                            _hover={{ color: 'teal.500' }}
                                                            icon={showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                                        />
                                                    </InputRightElement>
                                                </InputGroup>
                                                <FormErrorMessage>{form.errors.confirmPassword}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Button type="submit" isLoading={props.isSubmitting} colorScheme="teal">
                                        Update Profile
                                    </Button>
                                </VStack>
                            </Form>
                        )}
                    </Formik>
                </CardBody>
            </Card>
        </Box>
    );
};

export default UpdateProfile;
