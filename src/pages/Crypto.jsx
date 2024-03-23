import React from 'react'
import axios from 'axios'
import { useEffect, useState } from "react";
import '../styles/styles.css'
import { Grid, GridItem, Box, Flex, Spacer, Heading, Button, Drawer,
  Center, Text, space, Icon, Link  } from '@chakra-ui/react'
import millify from "millify";
import { useParams } from 'react-router-dom'

function Crypto() {
  
  const options = {
    method: 'GET',
    url: 'https://coinranking1.p.rapidapi.com/coins',
    params: {
      referenceCurrencyUuid: 'yhjMzLPhuIDl',
      timePeriod: '24h',
      'tiers[0]': '1',
      orderBy: 'marketCap',
      orderDirection: 'desc',
      limit: '100',
      offset: '0'
    },
    headers: {
      'X-RapidAPI-Key': '622169c938msh8e0a96b3410e0f1p136bb5jsne57c542b1599',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };

  const [coin, setCoin] = useState();
  

  axios.request(options).then(data => {
    let cryptoArr = data.data.data.coins.map((el) =>
    <Button as={Link} className='button' href={`/list/${el.uuid}`} h={50} my={10}>
      <Flex justify={'space-between'} minW={1035} my={30} fontSize={16}>
        <Flex align={'start'} justify={'space-between'} w={50}>
          <Box>{el.rank}</Box>
          <Box ml={10} h={20} w={20} mt={3} display={'Flex'}><img src={`${el.iconUrl}`} /></Box>
        </Flex>
        <Box align={'start'} ml={15} w={'25%'}>{el.name} <Text fontSize={11}>{el.symbol}</Text></Box>
        <Box align={'start'} w={'25%'}>{`${el.price}`.slice(0, 8)}</Box>
        <Box align={'start'} w={'25%'}>{millify(`${el.marketCap}`)}</Box>
        <Box align={'end'} w={50}>{el.change}%</Box>
      </Flex>
    </Button>
    );

    setCoin(cryptoArr);
    console.log(data.data);
  })
  .catch(error => {
    // handle error
    console.error(error);
  });

  return (
      <Box mx={'auto'} w={1100} h={'100%'} className=''>
        <Text textAlign={'Center'} m={10}>Top 10 Crypto Coins</Text>

        <Flex my={45} px={25} className='CryptoBlock' direction={'column'}
        borderRadius={10} boxShadow="1px 4px 12px 1px rgba(34, 60, 80, 0.13)">
          <Box h={50}>
            <Flex justify={'space-between'} mt={25} fontSize={16}>
              <Box align={'start'} w={50}>#</Box>
              <Box align={'start'} ml={15} w={'25%'}>Name</Box>
              <Box align={'start'} w={'25%'}>Price USD</Box>
              <Box align={'start'} w={'25%'}>Capitalisation</Box>
              <Box align={'start'} w={50}>24h</Box>
            </Flex>
          </Box>
          <hr h={3} mt={15} width={'100%'}></hr>
          <Box>
              {coin}
          </Box>
        </Flex>
      </Box>
  )
}

export default Crypto
