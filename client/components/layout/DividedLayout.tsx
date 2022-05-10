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
}
  
const DividedLayout = (props: DividedLayout) =>{
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          {props.left}
        </Stack>
      </Flex>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          {props.right}
        </Stack>
      </Flex>
    </Stack>
  );
}

export default DividedLayout