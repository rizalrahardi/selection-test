import React, { useState, useEffect } from 'react';
import {
    Box,
    HStack,
    Button,
    VStack,
    Text,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    useToast,
    Card,
    useColorModeValue
} from '@chakra-ui/react';
import axios from 'axios';

const Attendance = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const [clockInTime, setClockInTime] = useState('');
    const [clockOutTime, setClockOutTime] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [clockMode, setClockMode] = useState('clockIn'); // 'clockIn' or 'clockOut'
    const toast = useToast();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const handleClockIn = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const currentTime = new Date();
            console.log("ini current time", currentTime);
            const apiUrl = 'http://localhost:8000/api/attendance/in';

            const response = await axios.post(apiUrl, { currentTime: currentTime }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const { attendance } = response.data;
            setClockInTime(currentTime.toLocaleTimeString());
            setClockMode('clockOut');
            onOpen();
        } catch (error) {
            toast({
                title: error.response.data.message,
                status: 'error',
                duration: 3000,
                isClosable: true
            });
            console.error('Clock in error:', error);
        }
        setIsLoading(false);
    };

    const handleClockOut = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const currentTime = new Date();
            console.log("ini current time", currentTime);
            const apiUrl = 'http://localhost:8000/api/attendance/out';

            const response = await axios.post(apiUrl, { currentTime: currentTime }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const { attendance } = response.data;
            setClockOutTime(currentTime.toLocaleTimeString());
            setClockMode('clockIn');
            onOpen();
        } catch (error) {
            toast({
                title: error.response.data.message,
                status: 'error',
                duration: 3000,
                isClosable: true
            });
            console.error('Clock out error:', error);
        }
        setIsLoading(false);
    };

    return (
        <Box p={4} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Card py={10} w={'50%'} border={'1px'} borderColor={useColorModeValue('purple.200', 'purple.700')}>
                <VStack spacing={4}>
                    <Text fontSize="2xl" fontWeight="bold">
                        Current Time:
                    </Text>
                    <Text fontSize="xl">
                        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </Text>
                    <HStack spacing={4}>
                        <Button
                            colorScheme="green"
                            isLoading={isLoading && clockMode === 'clockIn'}
                            onClick={handleClockIn}
                        >
                            Clock In
                        </Button>
                        <Button
                            colorScheme="red"
                            isLoading={isLoading && clockMode === 'clockOut'}
                            onClick={handleClockOut}
                        >
                            Clock Out
                        </Button>
                    </HStack>
                    <Text>Clock In Time: {clockInTime}</Text>
                    <Text>Clock Out Time: {clockOutTime}</Text>
                </VStack>
                <AlertDialog isOpen={isOpen} onClose={onClose}>
                    <AlertDialogOverlay />
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Clock In/Out Recorded
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Your {clockMode === 'clockIn' ? 'Clock In' : 'Clock Out'} time has been recorded.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={onClose}>
                                Close
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </Card>
        </Box>
    );
};

export default Attendance;
