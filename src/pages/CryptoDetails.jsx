import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Grid, GridItem, Box, Flex, Spacer, Heading, Button, Drawer,
  Center, Text, space, Icon  } from '@chakra-ui/react'
import { useState } from "react";
import millify from "millify";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function CryptoDetails() {

  let {coinID} = useParams();

  const graphOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  
  const url = 'https://coinranking1.p.rapidapi.com/coin/' + coinID
  const options = {
    method: 'GET',
    url: url,
    params: {
      referenceCurrencyUuid: 'yhjMzLPhuIDl',
      timePeriod: '24h'
    },
    headers: {
      'X-RapidAPI-Key': '622169c938msh8e0a96b3410e0f1p136bb5jsne57c542b1599',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };

  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [rank, setRank] = useState();
  const [hVolume, sethVolume] = useState();
  const [marketCap, setMarketCap] = useState();
  const [numberOfMarkets, setNumberOfMarkets] = useState();
  const [numberOfExchanges, setNumberOfExchanges] = useState();
  const [allTimeHigh, setAllTimeHigh] = useState();
  const [supplyCirculating, setSupplyCirculating] = useState();
  const [supplyTotal, setSupplyTotal] = useState();
  const [description, setDescription] = useState();
  const [type, setType] = useState();
  const [nameW, setNameW] = useState();
  const [symbol, setSymbol] = useState();
  const [graphik, setGraphikLine] = useState();

  axios.request(options).then(data => {
    let block = data.data.data.coin
    let arr = []
    
    
    for (let key in block) {
      if (!Array.isArray(block[key]) && typeof block[key] != 'object' ) arr.push( <div><p>{key}: {block[key]}</p></div>)
      if (Array.isArray(block[key])) arr.push(<div><p>{key}: {block[key].map(el => el.url).join("; ")}</p></div>)
    }
    
    let graphikLine = block['sparkline']
    // graphikLine.push(block['sparkline'].map(el => {el.Array}))

    let ArrType = []
    ArrType.push(
      <div>{block['links'].map(el => <a href={`${el.url}`}><p className='button'>{el.type}</p></a>)}</div>
      )
    let ArrName = []
    ArrName.push(
      <div>{block['links'].map(el => <a href={`${el.url}`}><p className='button'>{el.name}</p></a>)}</div>
      )

    
    let allTimeH = block['allTimeHigh']

    setGraphikLine(graphikLine)
    setSymbol(block['symbol'])
    setName(block['name']);
    setPrice(block['price']);
    setRank(block['rank']);
    sethVolume(block['24hVolume']);
    setMarketCap(block['marketCap']);
    setNumberOfMarkets(block['numberOfMarkets']);
    setNumberOfExchanges(block['numberOfExchanges']);
    setAllTimeHigh(allTimeH['price']);
    setNumberOfMarkets(block['numberOfMarkets']);
    setSupplyCirculating(block['supply']['circulating']);
    setSupplyTotal(block['supply']['total']);
    setDescription(block['description']);
    setType(ArrType);
    setNameW(ArrName);

    console.log(), 10000
  })
  .catch(error => {
    // handle error
    console.error(error);
  });

  const labels = ['1', '2', '3', '4', '5', '6', '7', '8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'];
  
  const line = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Dataset 2',
        data: graphik,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div>
      
      <Flex direction='column' align={'center'} my={20} >
        <Flex my={15} direction='row'>
          <Text mx={10}>{name}</Text><Text mx={10}>{symbol}</Text>
        </Flex>
        <Box mx={'auto'} w={1100} minH={'50vh'} p={10} className='v4'
        borderRadius={15} boxShadow="1px 4px 12px 1px rgba(34, 60, 80, 0.33)">
          <Flex direction='row' minH={550} justify={'space-between'} >
            <Flex w={'50%'} h={'50%'} direction={'column'} justify={'space-between'} >
              <Flex borderRadius={15} mr={10} px={10} pt={10} pb={20} h={'57%'} 
              justify={'space-between'} className='CryptoBlock' direction={'row'} boxShadow="1px 4px 12px 1px rgba(34, 60, 80, 0.23)">
                <Box ml={10}>
                  <Text mt={10}>Price to USD</Text>
                  <Text mt={10}>All-time-high</Text>
                  <Text mt={10}>Coin rank</Text>
                  <Text mt={10}>24h Volume</Text>
                  <Text mt={10}>Market cap</Text>
                  <Text mt={10}>Number Of Markets</Text>
                  <Text mt={10}>Number Of Exchanges</Text>
                  <Text mt={10}>Total Supply</Text>
                  <Text mt={10}>Circulating Supply</Text>
                </Box>
                <Box mr={15}>
                  <Text mt={10}>{`${price}`.slice(0, 10)}</Text>
                  <Text mt={10}>{`${allTimeHigh}`.slice(0, 10)}</Text>
                  <Text mt={10}>{rank}</Text>
                  <Text mt={10}>{millify(`${hVolume}`)} $</Text>
                  <Text mt={10}>{millify(`${marketCap}`)} $</Text>
                  <Text mt={10}>{numberOfMarkets}</Text>
                  <Text mt={10}>{numberOfExchanges}</Text>
                  <Text mt={10}>{millify(`${supplyTotal}`)}</Text>
                  <Text mt={10}>{millify(`${supplyCirculating}`)}</Text>
                </Box>
              </Flex>
              <Flex h={'10%'} borderRadius={15} mr={10} mt={10} mb={5} className='CryptoBlock' p={10}
              direction={'row'} justify={'space-between'} boxShadow="1px 4px 12px 1px rgba(34, 60, 80, 0.23)">
                <Box ml={10}>
                {type}
                </Box>
                <Box mr={15} align={'end'}>
                  {nameW}
                </Box>
              </Flex>
            </Flex>
            <Flex w={'50%'} borderRadius={10} direction={'row'} justify={'space-between'}>
              <Flex direction={'column'} minH={500} justify={'space-between'}>
                <Box borderRadius={10} h={120} w={'100%'} className='CryptoBlock' boxShadow="1px 4px 12px 1px rgba(34, 60, 80, 0.23)">
                  <Text m={10}>
                    {description}
                  </Text>
                </Box>
                <Flex borderRadius={10} mt={10} h={450} w={'100%'} className='v4' direction={'column'} justify={'space-between'}>
                  <Box borderRadius={10} m={5} mt={25} className={'CryptoBlock'} h={'12%'} boxShadow="1px 4px 12px 1px rgba(34, 60, 80, 0.23)">
                    <Flex direction={'row'}  justify={'space-around'} pt={6}>
                      <Button className={'hComponent'} h={40} w={40} fontSize={14}>3h</Button>
                      <Button className={'hComponent'} h={40} w={40} fontSize={14}>24h</Button>
                      <Button className={'hComponent'} h={40} w={40} fontSize={14}>7d</Button>
                      <Button className={'hComponent'} h={40} w={40} fontSize={14}>30d</Button>
                      <Button className={'hComponent'} h={40} w={40} fontSize={14}>3m</Button>
                      <Button className={'hComponent'} h={40} w={40} fontSize={14}>1y</Button>
                      <Button className={'hComponent'} h={40} w={40} fontSize={14}>3y</Button>
                      <Button className={'hComponent'} h={40} w={40} fontSize={14}>5y</Button>
                    </Flex>
                  </Box>
                  <Box borderRadius={10} m={5} className={'CryptoBlock'} h={'80%'} boxShadow="1px 4px 12px 1px rgba(34, 60, 80, 0.23)">
                    <Box m={5}>
                    <Line width={530} height={320} options={graphOptions} data={line} />
                    </Box>
                  </Box>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </div>
    )
}


export default CryptoDetails