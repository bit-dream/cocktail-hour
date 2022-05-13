import {
    Flex,
    Heading,
    Stack,
    Center
  } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';


interface DividedLayout {
  left: PropsWithChildren<React.ReactChild>,
  right: PropsWithChildren<React.ReactChild>
  image: string
  gradient: string[]
}
  
const DividedLayout = (props: DividedLayout) =>{
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'} background={[
        `linear-gradient(to bottom, ${props.gradient[0]}, ${props.gradient[1]})`,
        `linear-gradient(to bottom, ${props.gradient[0]}, ${props.gradient[1]})`, 
        `linear-gradient(to right, ${props.gradient[0]}, ${props.gradient[1]})`,
        `linear-gradient(to right, ${props.gradient[0]}, ${props.gradient[1]})`
      ]}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          {props.left}
        </Stack>
      </Flex>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'} position='relative'
        _after={[{
          content: `""`,
          position: 'absolute',
          width: '115px',
          height: '115px',
          left: '-30px',
          top: '-50px',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url('${props.image}')`,
          transform: 'rotate(-10deg)',
          filter: 'drop-shadow(5px 5px 8px #222)',
          marginLeft: '10px'
        },
        {
          content: `""`,
          position: 'absolute',
          width: '150px',
          height: '150px',
          left: '-30px',
          top: '-50px',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url('${props.image}')`,
          transform: 'rotate(-10deg)',
          filter: 'drop-shadow(5px 5px 8px #222)',
          marginLeft: '10px'
        }
      ]}>
          {props.right}
        </Stack>
      </Flex>
    </Stack>
  );
}

export default DividedLayout