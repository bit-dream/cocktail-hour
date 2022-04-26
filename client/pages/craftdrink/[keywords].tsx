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
        <DisplayCocktail
          drinkName = {drinkName}
          ingredientHeading = 'Ingredients'
          ingredients = {['Tequila', 'Seltzer', 'Cherry', 'Orange','Cocktail Shaker', 'Ice', 'Rum', 'Gin', 'Vodka', 'Lime', 'Lemon', 'Cherry']}
          howToHeading = 'How To'
          howTo = 'Start by combining tequila and seltzer in a cocktail shaker. Muddle cherry and orange. Shake vigerously until chilled. Serve in a coup class. Garnish with lime wedge.'
        />
      </ScaleFade>
    </Flex>
  )
}

export default CraftDrink
