import type { NextPage } from 'next'
import { ScaleFade, useToast, Box, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CocktailData from '../../components/interfaces'
import { generateInstructions, generateIngredientsList, validateReponse } from '../../components/generation'
import CocktailShakerLoader from '../../components/cocktail_display/CocktailShakerLoader'
import DividedLayout from '../../components/layout/DividedLayout'
import Preparation from '../../components/cocktail/Preparation'
import Ingredients from '../../components/cocktail/Ingredients'
import BuyMeACoffee from '../../components/social/BuyMeACoffee'
import Contact from '../../components/contact/Contact'

const CraftDrink: NextPage = () => {

  // Get router keywords from url
  const router = useRouter();
  const search = router.query.keywords;
  const configUrl = process.env.NEXT_PUBLIC_CONFIG_URL;
  let drinkName: string; 
  if (Array.isArray(search)) {
    drinkName = search.join(' ').toUpperCase();
  } else {
    drinkName = search ? search.toUpperCase() : '';
  }

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [ingredientsList, setIngredientsList] = useState<Map<String,String>>(new Map());
  const [instructionsList, setinstructionsList] = useState<string[]>([]);
  const [glassImage, setGlassImage] = useState<string>('/CaipirinhaCocktail.svg');
  const toast = useToast();

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {

      const response = await fetch(`${configUrl}${search}`)
      const json: CocktailData = await response.json()

      // Set cocktail image
      switch (json['glass']) {
        case 'martini':
          setGlassImage('/KamikazeCocktail.svg');
          break;
        case 'coupe':
          setGlassImage('/MargaritaCocktail.svg');
          break;
        case 'highball':
          setGlassImage('/MojitoCocktail.svg');
          break;
        case 'old fashioned':
          setGlassImage('/ScrewdriverCocktail.svg');
          break;
        case 'tiki':
          setGlassImage('/CaipirinhaCocktail.svg');
          break;
      }

      if (!validateReponse(json)) {
        // Go back home and display error message
        router.push(`/`)
        toast({
          title: 'oops!',
          description: `Looks like we couldn't find a cocktail for you. Try again with different keywords. We've logged the error to determine the validity of the request.`,
          status: 'error',
          duration: 10000,
          isClosable: true,
        })
      }

      setinstructionsList(generateInstructions(json))
      setIngredientsList(generateIngredientsList(json))
      setIsLoading(false)
    }
    // call the function
    fetchData().catch(res => {
      console.log(res)
      router.push(`/`)
      toast({
        title: 'oops!',
        description: `Something went wrong with the request. This is most likely a network error.`,
        status: 'error',
        duration: 10000,
        isClosable: true,
      })
    });
  },[])

  return (
    <Box>
      {isLoading ? 
        <CocktailShakerLoader 
          gradient={['#c9d6ff', '#ffffff']}
        />
        : 
        <ScaleFade initialScale={0.50} in={true}>
        <Box position={'relative'}>
          <BuyMeACoffee />
          <DividedLayout
            left={<Preparation 
                    cocktailName={drinkName}
                    directions={instructionsList}/>}
            right={
                    <Box>
                      <Ingredients 
                      ingredients={ingredientsList}
                      drinkName={drinkName}/>
                      <br />
                      <Button 
                        width={'100%'}
                        variant='outline'
                        colorScheme= 'blue'
                        boxShadow= '0px 0px 10px 0px rgba(0,0,0,0.2)'
                        onClick={() => {router.push('/')}}
                        _hover={{
                          boxShadow: `
                            7px 20px 20px 0px rgba(207, 119, 243, 0.3), 
                            -20px -14px 30px 0px rgba(0, 155, 255, 0.3), 
                            -20px 5px 20px 0px rgba(42, 201, 219, 0.3), 
                            20px -10px 20px 0px rgba(66, 245, 215, 0.3), 
                            10px -20px 20px 0px rgba(255, 5, 134, 0.3);
                        `
                        }}
                        >
                        Craft Another Drink
                      </Button>
                      <br />
                      <br />
                    </Box>
                  } 
            image={glassImage}
            gradient={['#c9d6ff', '#ffffff']}
          />
        </Box>
      </ScaleFade>
      }
    </Box>
  )
}

export default CraftDrink
