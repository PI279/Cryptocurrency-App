import React from 'react'
import { Outlet } from 'react-router-dom'
import { Grid, GridItem, Box, Flex, Spacer, Heading, Button, Drawer,
  Center, Text, space, Icon  } from '@chakra-ui/react'
  
function CryptoLists() {
  return (
    <div>
      <Box>
        <Outlet />
      </Box>
    </div>
  )
}

export default CryptoLists
