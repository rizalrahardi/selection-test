"use client"
import {
    Box,
    Flex,
    Avatar,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
    Image,
    Text
} from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { useLocation, useNavigate } from "react-router-dom"
import Logo from "../assets/images/calendar.png"
export default function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode()
    const location = useLocation()
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/")
    }
    const isLoginPage = location.pathname === "/"
    const isAdminPage = location.pathname === "/admin"
    return (
        <>
            <Box position={"fixed"} top={0} width={"100%"} bg={useColorModeValue("gray.100", "gray.900")} px={20} py={2} borderBottom={"1px"} borderColor={useColorModeValue("purple.200", "purple.700")}>
                <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
                    <Flex alignItems={'center'}>
                        <Box>
                            <Image src={Logo} width="50px" />
                        </Box>
                        <Box ml={2}>
                            <Text fontSize={"2xl"} fontWeight={"bold"} color={'purple.400'} letterSpacing={5}>NESBA</Text>
                        </Box>
                    </Flex>

                    <Flex alignItems={"center"}>
                        <Button onClick={toggleColorMode}>
                            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                        </Button>
                        {!isLoginPage && (
                            <Stack direction={"row"} spacing={7}>
                                {isAdminPage ? (
                                    <Button ml={7} onClick={() => navigate("/admin")}>Home</Button>
                                ) : (
                                    <Button ml={7} onClick={() => navigate("/employee")}>Home</Button>
                                )}
                                {!isAdminPage && (
                                    <Button onClick={() => navigate("/attendance-log")}>Attendance Log</Button>
                                )}
                                {/* {isAdminPage && (
                                    <Button onClick={() => navigate("/admin/create-employee")}>Create Employee</Button>
                                )} */}
                                {!isAdminPage && (
                                    <Button onClick={() => navigate("/salary-report")}>Salary Report</Button>
                                )}
                                <Menu>
                                    <Button onClick={handleLogout} bgColor="tomato" color={"white"}>Logout</Button>
                                </Menu>
                            </Stack>
                        )}
                    </Flex>
                </Flex>
            </Box >
        </>
    )
}
