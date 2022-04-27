import { Spacer, Text } from '@chakra-ui/react'
import { Center, Container} from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Stack, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import IngredientDisplay from '../../components/cocktail_display/IngredientDisplay'
import HowToDisplay from '../../components/cocktail_display/HowToDisplay'

interface CocktailDisplay {
  drinkName: string,
  ingredientHeading: string,
  ingredients: string[],
  howToHeading: string,
  howTo: string,
  btnTxt?: string
  isLoading: boolean
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

      <Stack spacing={4} direction='row'>
        <IngredientDisplay
          ingredients={props.ingredients}
          heading={props.ingredientHeading}
          isLoading={props.isLoading}
        />
        <HowToDisplay
          heading={props.howToHeading}
          directions={props.howTo}
          isLoading={props.isLoading}
        />
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