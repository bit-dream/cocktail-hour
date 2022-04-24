import type { NextPage } from 'next'
import { Box, Flex, Spacer, Text } from '@chakra-ui/react'
import { Center, Container, Heading, List, ListIcon, ListItem } from '@chakra-ui/react'
import { Input, InputGroup, InputLeftElement, InputRightElement, Button } from '@chakra-ui/react'
import { Search2Icon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Fade, ScaleFade, Slide, SlideFade } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const CraftDrink: NextPage = () => {

  // Get router keywords from url
  const router = useRouter();
  const search = router.query.keywords;
  const drinkName = search ? search.toUpperCase() : '';

  // Perform api request from search
  //const [drink, setDrink] = useState([]);
  //const [isLoading, setIsLoading] = useState(false);


  return (
    <Flex justify='center' align='center' height='100vh'>
      <ScaleFade initialScale={0.50} in={true}>
        <Container maxW='1000px' boxShadow='dark-lg' p='6' rounded='md' bg='white'>
        <VStack
        spacing={4}
        align='stretch'
        >
          <Center>
            <Text
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              bgClip='text'
              fontSize='5xl'
              fontWeight='extrabold'
            >
              THE {drinkName}
            </Text>
          </Center>
          <Spacer/>
          <Spacer/>

        <Stack spacing={8} direction='row'>
          <Box boxShadow='md' p='6' rounded='md' bg='white'>
            <Heading fontSize='xl'>What you'll need</Heading>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={ArrowForwardIcon} color='green.500' />
                Tequila
              </ListItem>
              <ListItem>
                <ListIcon as={ArrowForwardIcon} color='green.500' />
                Seltzer
              </ListItem>
              <ListItem>
                <ListIcon as={ArrowForwardIcon} color='green.500' />
                Cherry
              </ListItem>
              <ListItem>
                <ListIcon as={ArrowForwardIcon} color='green.500' />
                Orange
              </ListItem>
            </List>
          </Box>
          <Box boxShadow='md' p='6' rounded='md' bg='white'>
            <Heading fontSize='xl'>How to make it</Heading>
            <Text mt={4}>Start by combining tequila and seltzer in a cocktail shaker. Muddle cherry and orange. Shake vigerously until chilled. Serve in a coup class. Garnish with lime wedge.</Text>
          </Box>
        </Stack>
          <Link href='/'>
            <Button colorScheme='teal' variant='outline'>
              Craft Another Cocktail
            </Button>
          </Link>
        </VStack>
        </Container>
      </ScaleFade>
    </Flex>
  )
}

export default CraftDrink
