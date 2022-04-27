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

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {

      const response = await fetch(`http://localhost:5000/craftdrink?search=${search}`)
      const json = await response.json()
      setIngredientsList(json)
      setIsLoading(false)
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
          howToHeading = 'How To'
          howTo = 'Start by combining tequila and seltzer in a cocktail shaker. Muddle cherry and orange. Shake vigerously until chilled. Serve in a coup class. Garnish with lime wedge.'
          isLoading = {isLoading}
        />
      </ScaleFade>
    </Flex>
  )
}

export default CraftDrink
