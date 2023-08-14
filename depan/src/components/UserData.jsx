import React, { useEffect, useState } from 'react';
import {
    Box,
    Card,
    CardBody,
    Heading,
    Text,
    VStack,
    Skeleton,
    useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';

const UserData = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8000/api/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data.user);
                setIsLoading(false);
            } catch (error) {
                console.error('Fetch user error:', error);
                setIsLoading(false);
            }
        }

        fetchUser();
    }, []);

    return (
        <Box p={4} display="flex" justifyContent="center" alignItems="center" mt={20}>
            <Card maxW="md" borderWidth="1px" borderRadius="lg" overflow="hidden" borderColor={useColorModeValue('purple.200', 'purple.700')}>
                <CardBody>
                    <VStack spacing={4}>
                        <Heading size="lg">Hello {user?.name}!</Heading>
                        {isLoading ? (
                            <Skeleton height="20px" />
                        ) : (
                            <>
                                <Text>{user?.email}</Text>
                                <Text>{user?.birthday}</Text>
                            </>
                        )}
                    </VStack>
                </CardBody>
            </Card>
        </Box>
    );
};

export default UserData;
