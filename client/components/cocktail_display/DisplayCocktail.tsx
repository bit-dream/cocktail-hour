import { Box, Spacer, Text } from '@chakra-ui/react'
import { Center, Container, Heading, List, ListIcon, ListItem } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Stack, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Link from 'next/link'

interface CocktailDisplay {
  drinkName: string,
  ingredientHeading: string,
  ingredients: string[],
  howToHeading: string,
  howTo: string,
  btnTxt: string | undefined
}

const DisplayCocktail = (props: CocktailDisplay) => { 

  return(
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
            THE {props.drinkName}
          </Text>
        </Center>
        <Spacer/>
        <Spacer/>

      <Stack spacing={8} direction='row'>
        <Box boxShadow='md' p='6' rounded='md' bg='white'>
          <Heading fontSize='xl'>{props.ingredientHeading}</Heading>
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
          <Heading fontSize='xl'>{props.howToHeading}</Heading>
          <Text mt={4}>{props.howTo}</Text>
        </Box>
      </Stack>
        <Link href='/'>
          <Button colorScheme='teal' variant='outline'>
            {props.btnTxt ? props.btnTxt : 'Craft Another Cocktail'}
          </Button>
        </Link>
      </VStack>
    </Container>
  )
}



export default DisplayCocktail