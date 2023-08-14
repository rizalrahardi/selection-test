import React, { useState, useEffect } from 'react';
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
    useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';

const AttendanceLog = () => {
    const [attendance, setAttendance] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8000/api/attendance/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAttendance(response.data.attendance);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                toast({
                    title: 'Error fetching attendance log.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                console.error('Error fetching attendance log:', error);
            }
        };

        fetchAttendance();
    }, [toast]);

    return (
        <Center h={'100vh'} bgColor={useColorModeValue('gray.100', 'gray.700')}>
            <Box p={4} w={['100%', '70%', '50%']}>
                <Card border={'1px'} borderColor={useColorModeValue('purple.200', 'purple.700')}>
                    <CardHeader>Attendance Log</CardHeader>
                    <CardBody>
                        {isLoading ? (
                            <Spinner />
                        ) : (
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>Date</Th>
                                        <Th>Clock In</Th>
                                        <Th>Clock Out</Th>
                                        <Th>Day Salary</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {attendance.map((entry) => (
                                        <Tr key={entry.id}>
                                            <Td>{new Date(entry.createdAt).toLocaleDateString()}</Td>
                                            <Td>{entry.clockIn ? new Date(entry.clockIn).toLocaleTimeString() : '-'}</Td>
                                            <Td>{entry.clockOut ? new Date(entry.clockOut).toLocaleTimeString() : '-'}</Td>
                                            <Td>{entry.daySalary}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        )}
                    </CardBody>
                    <CardFooter>Attendance data for the user</CardFooter>
                </Card>
            </Box>
        </Center>
    );
};

export default AttendanceLog;
