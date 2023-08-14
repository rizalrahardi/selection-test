import React, { useState } from 'react';
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Spinner,
    useToast,
    Center,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Input,
    Button,
    Flex,
    useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';

const MonthlySalaryReport = () => {
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [monthSalary, setMonthSalary] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const fetchMonthSalary = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const apiUrl = `http://localhost:8000/api/salary/report?month=${month}&year=${year}`;
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMonthSalary(response.data.monthSalary);
            console.log(response.data.monthSalary);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            toast({
                title: 'Error fetching monthly salary report.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            console.error('Error fetching monthly salary report:', error);
        }
    };

    return (
        <Center h={'100vh'} bgColor={useColorModeValue('gray.100', 'gray.700')}>
            <Box p={4} w={['100%', '70%', '50%']}>
                <Card border={'1px'} borderColor={useColorModeValue('purple.200', 'purple.700')}>
                    <CardHeader>Monthly Salary Report</CardHeader>
                    <CardBody>
                        <Flex mb={4}>
                            <Input
                                placeholder="Month"
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                mr={2}
                            />
                            <Input
                                placeholder="Year"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                mr={2}
                            />
                            <Button colorScheme="blue" onClick={fetchMonthSalary}>
                                Cari
                            </Button>
                        </Flex>
                        {isLoading ? (
                            <Spinner />
                        ) : monthSalary ? (
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>Name</Th>
                                        <Th>Role</Th>
                                        <Th>Join Date</Th>
                                        <Th>Base Salary</Th>
                                        <Th>Current Salary</Th>
                                        <Th>Deduction</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>{monthSalary?.User.name}</Td>
                                        <Td>{monthSalary?.User.Role.name}</Td>
                                        <Td>{new Date(monthSalary?.User.join).toLocaleDateString()}</Td>
                                        <Td>{monthSalary?.User.baseSalary}</Td>
                                        <Td>{monthSalary?.monthSalary}</Td>
                                        <Td>{monthSalary?.deduction}</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        ) : (
                            <Box>No data available.</Box>
                        )}
                    </CardBody>
                    <CardFooter>Monthly salary report for the specified month and year</CardFooter>
                </Card>
            </Box>
        </Center>
    );
};

export default MonthlySalaryReport;
