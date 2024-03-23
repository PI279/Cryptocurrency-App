import React, { useState } from 'react';
import {
    Box,
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading,
    Icon,
    Link,
    Container,
    Menu,
    MenuButton,
    Button,
    Center,
    Spacer
} from '@chakra-ui/react';
import {FiMenu,} from 'react-icons/fi';
import { IoHome } from "react-icons/io5";
import { VscGraph } from "react-icons/vsc";
import DarkMode from './DarkMode.jsx';
import '../styles/styles.css';

function Sidebar() {
    const [navSize, changeNavSize] = useState("small")
    return (
        <div className='sticky'>
            <Box
            display={'Flex'}
            className='ani bgMenu'
            borderRadius={10}
            left="5"
            
            boxShadow="1px 4px 12px 1px rgba(34, 60, 80, 0.23)"
            h="97vh"
            flexDir="column"
            align={"start"}
            fontSize={16}
            fontFamily={'Audiowide'}
            justifyContent="space-between"
            w={navSize == "small" ? "70px" : "200px"}

            >
                <Box ml={15}>
                    <Icon
                        h={40}
                        w={40}
                        fontSize='40px'
                        background="none"
                        mt={15}
                        _hover={{ background: 'none' }}
                        as={FiMenu}
                        onClick={() => {
                            if (navSize == "small")
                                changeNavSize("large")
                            else
                                changeNavSize("small")
                        }}
                    />
                </Box>
                <Flex flexDir="column" justifyContent="space-between" fontWeight={'bold'} h={'30vh'} >
                        <Box >
                            <Button as={Link} my={10} h={50} ml={10} w={navSize == "small" ? "50px" : "180px"} 
                            className='button' borderRadius={10} boxShadow="1px 4px 12px 1px rgba(34, 60, 80, 0.13)" href='/'>
                                
                                    <IoHome  size={22}/>
                                    <Text ml={12} className='font'
                                    display={navSize == "small" ? "none" : "flex"}> Home</Text>
                                
                            </Button>

                            <Button as={Link} my={10} h={50} ml={10} w={navSize == "small" ? "50px" : "180px"} 
                            className='button' borderRadius={10} boxShadow="1px 4px 12px 1px rgba(34, 60, 80, 0.13)" href='/list'>
                                <VscGraph size={22} />
                               
                                <Text ml={12} display={navSize == "small" ? "none" : "flex"}>Crypto List</Text>
                            </Button>
                        </Box>

                        
                        
                </Flex>
                <Flex align={"center"} ml={12} mb={20}>
                    <DarkMode />
                    <Text ml={5} fontWeight={'Medium'} fontFamily={'Audiowide'}
                     display={navSize == "small" ? "none" : "flex"}>
                            Theme Change
                        </Text>
                    </Flex>        
            </Box>
        </div>
    )
}

export default Sidebar