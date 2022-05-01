import type { NextPage } from 'next'
import {Flex, ScaleFade } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import DisplayCocktail from '../../components/cocktail_display/DisplayCocktail'
import { useEffect, useState } from 'react'
import ApiResponse from './interfaces'
import { generateInstructions, generateIngredientsList } from './generation'

const CraftDrink: NextPage = ({ message }) => {

  // Get router keywords from url
  const router = useRouter();
  const search = router.query.keywords;
  const drinkName = search ? search.toUpperCase() : '';

  const [isLoading, setIsLoading] = useState(true);
  const [ingredientsList, setIngredientsList] = useState({});
  const [instructionsList, setinstructionsList] = useState([]);

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {

      const response = await fetch(`http://localhost:5000/craftdrink?search=${search}`)
      const json: ApiResponse = await response.json()
      setIsLoading(false)
      setinstructionsList(generateInstructions(json))
      setIngredientsList(generateIngredientsList(json))
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
          ingredients = {ingredientsList}
          howToHeading = 'Preparation'
          howTo = {instructionsList}
          isLoading = {isLoading}
        />
      </ScaleFade>
    </Flex>
  )
}

export default CraftDrink
