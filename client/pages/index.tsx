import type { NextPage } from 'next'
import { Box, Flex, Spacer, Text } from '@chakra-ui/react'
import { Center, Container } from '@chakra-ui/react'
import { Input, InputGroup, InputLeftElement, InputRightElement, Button } from '@chakra-ui/react'
import { Search2Icon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Fade, ScaleFade, Slide, SlideFade } from '@chakra-ui/react'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <Flex justify='center' align='center' height='100vh'>
      <ScaleFade initialScale={0.50} in={true}>
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
              <Input type='search' placeholder='Enter Artist or Album Name' />
              <InputRightElement width='4.5rem'>
                <Link href='/craftdrink/help'><Button colorScheme='blue' h='1.75rem' size='sm'>Craft</Button></Link>
              </InputRightElement>
            </InputGroup>
          </Center>
          <Spacer/>
        </VStack>
        </Container>
      </ScaleFade>
    </Flex>
  )
}

export default Home
