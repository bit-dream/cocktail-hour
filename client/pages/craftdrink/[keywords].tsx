import type { NextPage } from 'next'
import {Flex, ScaleFade, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import DisplayCocktail from '../../components/cocktail_display/DisplayCocktail'
import { useEffect, useState } from 'react'
import ApiResponse from './interfaces'
import { generateInstructions, generateIngredientsList, validateReponse } from './generation'
import cocktailshaker from '../../images/cocktailshaker.svg'
import CocktailShakerLoader from './CocktailShakerLoader'

const CraftDrink: NextPage = ({ message }) => {


  // Get router keywords from url
  const router = useRouter();
  const search = router.query.keywords;
  const drinkName = search ? search.toUpperCase() : '';

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [ingredientsList, setIngredientsList] = useState<Map<String,String>>({});
  const [instructionsList, setinstructionsList] = useState<string[]>([]);
  const toast = useToast();

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {

      const response = await fetch(`http://localhost:5000/craftdrink?search=${search}`)
      const json: ApiResponse = await response.json()
      
      if (!validateReponse(json)) {
        // Go back home and display error message
        router.push(`/`)
        toast({
          title: 'oops!',
          description: `Looks like we couldn't find a cocktail for you. Try again with a different keyword. We've logged the error and will make sure if it was a valid request to.
          If it is we will fix it.`,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }

      setinstructionsList(generateInstructions(json))
      setIngredientsList(generateIngredientsList(json))
      setIsLoading(false)
    }
    // call the function
    fetchData().catch(console.error);
  }, [])

  return (
    <Flex justify='center' align='center' height='100vh'>
      {isLoading ? 
        <CocktailShakerLoader />
        : 
        <ScaleFade initialScale={0.50} in={true}>
        <DisplayCocktail
          drinkName = {drinkName}
          ingredientHeading = ""
          ingredients = {ingredientsList}
          howToHeading = 'Preparation'
          howTo = {instructionsList}
          isLoading = {isLoading}
        />
      </ScaleFade>
      }
    </Flex>
  )
}

export default CraftDrink
