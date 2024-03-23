import React from 'react'
import axios from 'axios'
import { useEffect, useState } from "react";
import '../styles/styles.css'
import { Grid, GridItem, Box, Flex, Spacer, Heading, Button, Drawer,
  Center, Text, space, Icon, Image, Link } from '@chakra-ui/react'
import millify from "millify";

function Home() {
  
  const optionsNews = {
    method: 'GET',
    url: 'https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk',
    headers: {
      'X-RapidAPI-Key': '622169c938msh8e0a96b3410e0f1p136bb5jsne57c542b1599',
      'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
    }
  };
  

  const options = {
    method: 'GET',
    url: 'https://coinranking1.p.rapidapi.com/coins',
    params: {
      referenceCurrencyUuid: 'yhjMzLPhuIDl',
      timePeriod: '24h',
      'tiers[0]': '1',
      orderBy: 'marketCap',
      orderDirection: 'desc',
      limit: '10',
      offset: '0'
    },
    headers: {
      'X-RapidAPI-Key': '622169c938msh8e0a96b3410e0f1p136bb5jsne57c542b1599',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };

  const [coin, setCoin] = useState();
  const [news, setNews] = useState();
  
  axios.request(optionsNews).then(dataNews => {
    let newsArr = dataNews.data.map((el) =>
    <Link className='button' href={el.url}>
      <Flex justify={'space-between'} fontSize={16}>
        <Box align={'start'} h={150} bg={'red'} borderRadius={15}>
          <Image h={150} borderRadius={15} src={el.thumbnail} />
        </Box>
        <Box align={'end'} w={'80%'} borderRadius={15}>
        <Flex direction={'column'} h={150} justify={'space-between'} align={'center'}>
          <Box><Text mx={15}>{title}</Text></Box>
            <Box><Text mx={15}>{description}</Text></Box>
              <Box align={'end'} w={'100%'}><Text mr={15}>{el.createdAt}</Text></Box>
            </Flex>
          </Box>
        </Flex>
      </Link>
    )
    setNews(newsArr);
    console.log(newsArr)
  })


  axios.request(options).then(data => {
    let cryptoArr = data.data.data.coins.map((el) =>
      <Flex justify={'space-between'} my={30} fontSize={16}>
        <Flex align={'start'} justify={'space-between'} w={50}>
          <Box>{el.rank}</Box>
          <Box ml={10} h={20} w={20} mt={3} display={'Flex'}><img src={`${el.iconUrl}`} /></Box>
        </Flex>
        <Box align={'start'} ml={15} w={'25%'}>{el.name} <Text fontSize={11}>{el.symbol}</Text></Box>
        <Box align={'start'} w={'25%'}>{`${el.price}`.slice(0, 8)}</Box>
        <Box align={'start'} w={'25%'}>{millify(`${el.marketCap}`)}</Box>
        <Box align={'end'} w={50}>24h</Box>
      </Flex>
    );
    setCoin(cryptoArr);
    //console.log(data.data);
  })
  .catch(error => {
    // handle error
    console.error(error);
  });

  return (
      <Box mx={'auto'} w={'50%'} minW={1100} h={'100%'} className=''>
        <Text textAlign={'Center'} m={10}>Top 10 Crypto Coins</Text>

        <Flex my={45} px={25} className='CryptoBlock' direction={'column'}
        borderRadius={10} boxShadow="1px 4px 12px 1px rgba(34, 60, 80, 0.13)">
          <Box h={50}>
            <Flex justify={'space-between'} mt={25} fontSize={16}>
              <Box align={'start'} w={50}>#</Box>
              <Box align={'start'} ml={15} w={'25%'}>Name</Box>
              <Box align={'start'} w={'25%'}>Price USD</Box>
              <Box align={'start'} w={'25%'}>Capitalisation</Box>
              <Box align={'end'} w={50}>24h</Box>
            </Flex>
          </Box>
          <hr h={3} mt={15} width={'100%'}></hr>
          <Box>
              {coin}
          </Box>
        </Flex>

        <Text textAlign={'Center'} m={10}>Last Crypto News</Text>
        <Box>
          <Flex my={45} className='CryptoBlock' direction={'column'} borderRadius={15} boxShadow="1px 4px 12px 1px rgba(34, 60, 80, 0.13)">
            <Box py={30} mx={30}>
              <Link className='button' href='https://www.coindesk.com/policy/2023/02/08/crypto-exchange-bitstamp-registers-in-france/?utm_medium=referral&utm_source=rss&utm_campaign=headlines'>
                <Flex justify={'space-between'} fontSize={16}>
                  <Box align={'start'} h={150} bg={'red'} borderRadius={15}>
                      <Image h={150} borderRadius={15} src='https://www.coindesk.com/resizer/eblN6NsVqLeX8MvkJ76z27jOEpY=/800x600/cloudfront-us-east-1.images.arcpublishing.com/coindesk/RDCXEGZK4FGGBPWNR6CDUTGDIU.jpg' />
                  </Box>
                  <Box align={'end'} w={'80%'} borderRadius={15}>
                    <Flex direction={'column'} h={150} justify={'space-between'} align={'center'}>
                      <Box><Text mx={15}>Crypto Exchange Bitstamp Registers in France</Text></Box>
                      <Box><Text mx={15}>The exchange joins Binance, Bitpanda and Société Générale in securing recognition from one of the most sophisticated regimes in the EU.</Text></Box>
                      <Box align={'end'} w={'100%'}><Text mr={15}>Wed, 08 Feb 2023 14:09:00 +0000</Text></Box>
                    </Flex>
                  </Box>
                </Flex>
              </Link>
            </Box>

            <Box py={10} mx={30}>
              {news}
            </Box>
          </Flex>
        </Box>
      </Box>
  )
}

export default Home
