import React from 'react';
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
    useColorModeValue,
    Select,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const CreateEmployee = () => {
    const initialValues = {
        email: '',
        join: '',
        baseSalary: '',
        role: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        join: Yup.date().required('Join date is required'),
        baseSalary: Yup.number().required('Base salary is required'),
        role: Yup.number().required('Role is required'),
    });

    const onSubmit = async (values, actions) => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
            const response = await axios.post(
                'http://localhost:8000/api/user/register',
                values,
                { headers }
            );
            const { user } = response.data;
            console.log('User created:', user);
            actions.resetForm();
        } catch (error) {
            console.error('Create employee error:', error);
        }
    };

    return (
        <Box p={4} display="flex" justifyContent="center" alignItems="center" h="100vh" bgColor={useColorModeValue('gray.100', 'gray.700')}>
            <Card w={['md', 'lg', 'xl']} borderWidth="1px" borderColor={useColorModeValue('purple.200', 'purple.700')} bg={useColorModeValue('white', 'gray.700')} borderRadius="lg" overflow="hidden">
                <CardBody>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        {(props) => (
                            <Form>
                                <VStack spacing={4}>
                                    <Field name="email">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.email && form.touched.email}>
                                                <FormLabel htmlFor="email">Email</FormLabel>
                                                <Input {...field} id="email" placeholder="Enter email" />
                                                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="join">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.join && form.touched.join}>
                                                <FormLabel htmlFor="join">Join Date</FormLabel>
                                                <Input {...field} id="join" type="date" />
                                                <FormErrorMessage>{form.errors.join}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="baseSalary">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.baseSalary && form.touched.baseSalary}>
                                                <FormLabel htmlFor="baseSalary">Base Salary</FormLabel>
                                                <Input {...field} id="baseSalary" placeholder="Enter base salary" />
                                                <FormErrorMessage>{form.errors.baseSalary}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="role">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.role && form.touched.role}>
                                                <FormLabel htmlFor="role">Role</FormLabel>
                                                <Select {...field} id="role" placeholder="Select role">
                                                    <option value="1">Admin</option>
                                                    <option value="2">Employee</option>
                                                </Select>
                                                <FormErrorMessage>{form.errors.role}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Button type="submit" isLoading={props.isSubmitting} colorScheme="teal">
                                        Create Employee
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

export default CreateEmployee;
