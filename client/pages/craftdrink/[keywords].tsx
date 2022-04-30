import type { NextPage } from 'next'
import { Box, Flex, Spacer, Text } from '@chakra-ui/react'
import { Center, Container, Heading, List, ListIcon, ListItem } from '@chakra-ui/react'
import { Input, InputGroup, InputLeftElement, InputRightElement, Button } from '@chakra-ui/react'
import { Search2Icon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Fade, ScaleFade, Slide, SlideFade } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import DisplayCocktail from '../../components/cocktail_display/DisplayCocktail'
import { useEffect, useState } from 'react'

const CraftDrink: NextPage = ({ message }) => {

  // Get router keywords from url
  const router = useRouter();
  const search = router.query.keywords;
  const drinkName = search ? search.toUpperCase() : '';

  const [isLoading, setIsLoading] = useState(true);
  const [ingredientsList, setIngredientsList] = useState({});
  const [instructionsList, setinstructionsList] = useState([]);

  interface ApiResponse {
    spirit: string,
    liqueur: string,
    sweetner: string,
    bitter: string,
    style: string,
    glass: string,
    garnish: string,
    fragrance: string,
    spice: string,
    fruit: string,
    topper: string
  }

  /* Generates a list of instructions that can be used to paint the instructions screen */ 
  const generateInstructions = (json: ApiResponse): string[] => {
    
    let instructions: string[] = []

    if (json['fruit'] !== null && json['style'] !== 'blended') {
      instructions.push(`Combine ${json['sweetner']} and ${json['fruit']} in a cocktail shaker`)
      instructions.push('Muddle fruit and sweetener')
    } else if (json['fruit'] !== null && json['style'] === 'blended') {
      instructions.push(`Combine ${json['sweetner']} and ${json['fruit']} in a blender`)
    }

    instructions.push(`
      Add ${json['spirit']} ${json['liqueur'] ? 'and ' + json['liqueur'] : ''} to a ${json['style'] === 'blended' ? 'blender' : 'cocktail shaker'}
    `)

    instructions.push(`Add a few dashes of ${json['bitter']} bitters`)

    if (json['style'] === 'blended') {
      instructions.push('Add ice and blend until a smooth consistency is reached')
    } else {
      // Capitialize first letter of style since it is start of sentence
      // Also remove last 2 characters since they are 'en' and 'ed'
      const style = json['style'].charAt(0).toUpperCase() + json['style'].slice(1,-2);
      instructions.push(`${style} until chilled and slightly diluted`)
    }

    if (json['fragrance'] !== null && json['fragrance'].includes('smoke')) {
      instructions.push(`Smoke glass with ${json['fragrance']}`)
    }

    instructions.push(`Strain and serve in an ${json['glass']} glass`)
    if (json['topper'] !== null) {
      instructions.push(`Add a splash of ${json['topper']}`)
    }

    if (json['fragrance'] !== null && json['fragrance'].includes('smoke') === false) {
      instructions.push(`Express ${json['fragrance']} over drink for fragrance`)
    }

    if (json['spice'] !== null) {
      instructions.push(`Lightly dust drink with ${json['spice']} for extra aroma if desired`)
    }

    instructions.push(`Garnish with ${json['garnish']}`)
    instructions.push('Enjoy!')

    return instructions
  }

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {

      const response = await fetch(`http://localhost:5000/craftdrink?search=${search}`)
      const json = await response.json()
      setIngredientsList(json)
      setIsLoading(false)

      setinstructionsList(generateInstructions(json))
      
    }
  
    // call the function
    fetchData().catch(console.error);
  }, [])

  return (
    <Flex justify='center' align='center' height='100vh'>
      <ScaleFade initialScale={0.50} in={true}>
        <DisplayCocktail
          drinkName = {drinkName}
          ingredientHeading = ""
          ingredients = {Object.values(ingredientsList).filter(ingredient => ingredient !== null)}
          howToHeading = 'Preparation'
          howTo = {instructionsList}
          isLoading = {isLoading}
        />
      </ScaleFade>
    </Flex>
  )
}

export default CraftDrink
