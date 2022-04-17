import type { NextPage } from 'next'
import { Box, Flex, Spacer, Text } from '@chakra-ui/react'
import { Center, Container } from '@chakra-ui/react'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { Stack, HStack, VStack } from '@chakra-ui/react'

const Home: NextPage = () => {
  return (
    <Flex justify='center' align='center' height='100vh'>
      <Container maxW='container.sm' boxShadow='dark-lg' p='6' rounded='md' bg='white'>
      <VStack
      spacing={4}
      align='stretch'
      >
        <Spacer/>
        <Center>
          <Text
            bgGradient='linear(to-l, #7928CA, #FF0080)'
            bgClip='text'
            fontSize='5xl'
            fontWeight='extrabold'
          >
            Cocktail Hour
          </Text>
        </Center>
        <Spacer/>
        <Spacer/>
        <Text fontSize='lg'>
          Craft custom and unique cocktails 🍸 based on your favorite artist 👨‍🎤, album 💽, mood 😎, or event 🎉.
        </Text>
        <Center>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              children={<Search2Icon color='gray.300' />}
            />
            <Input type='tel' placeholder='Enter Artist or Album Name' />
          </InputGroup>
        </Center>
        <Spacer/>
      </VStack>
    </Container>
    </Flex>
  )
}

export default Home
