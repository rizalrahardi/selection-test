import React from 'react';
import UserData from '../components/UserData';
import Attendance from '../components/Attendance';
import { Box, Card, CardHeader, CardBody, useColorModeValue } from '@chakra-ui/react';

const Employee = () => {
    return (
        <Box bgColor={useColorModeValue('gray.100', 'gray.700')} h="100vh">
            <UserData />
            <Attendance />
        </Box>
    );
}

export default Employee;
