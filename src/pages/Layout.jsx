import React from 'react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { CiMenuBurger } from "react-icons/ci";
import Sidebar from '../components/Sidebar.jsx'
import { Grid, GridItem, Box, Flex, Spacer, Heading, Button, Drawer,
  Center, Text, space} from '@chakra-ui/react'
import '../styles/styles.css'
const LayoutMain = () => {
  
  return (
    <Flex direction={'row'} minH={'99vh'} w={'99vw'} >
      <Box p={10} className='bgBlock'><Sidebar /></Box>

        <Flex w={'100%'} justify={'space-between'} direction={'column'} 
        className='bgBlock audiowide-regular'>
          
          <Box h={70}>
            <Box m={10} className='bg' borderRadius={10} boxShadow="1px 4px 12px 1px rgba(34, 60, 80, 0.13)">
              <Flex maxW={'99vw'} justify={'space-between'} mt={10}>
                <Box ml={10} w={200}><Text># Cryptocurrency App</Text></Box>
                
                <Box>
                  <Flex mr={10} w={200}><Spacer /></Flex>
                </Box>
              </Flex>
            </Box>
          </Box>

          <Box minH={'50vh'} mt={70} mb={20} mx={10} p={10}
          boxShadow="1px 4px 12px 1px rgba(34, 60, 80, 0.13)" borderRadius={10} className='bg ani'>
            <Outlet />
          </Box>

          <Box h={50} >
            <Flex align={'center'} justify={'center'} h={40} mx={10} boxShadow="1px 4px 12px 1px rgba(34, 60, 80, 0.23)" className='bg'  borderRadius={10}>
              <Box>Vite + React + Chakura ui</Box>
              
            </Flex>
          </Box>

        </Flex>

      </Flex>
  );
};

export default LayoutMain
