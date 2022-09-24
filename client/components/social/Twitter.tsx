import { Button, Link } from '@chakra-ui/react'
import createDrinkName from '../cocktail/createDrinkName'
import Ingredients from '../cocktail/Ingredients'

const Twitter = (props: {drinkName: string, ingredients: Map<String,String>}) => {
    const baseAddr = 'https://twitter.com/intent/tweet?text='
    let ingredientList = Array.from(props.ingredients.keys())
    let twitterLink = baseAddr + encodeURIComponent(
        `Currently sipping on ${createDrinkName(props.drinkName)}\n@cocktailhourtk\n\n${createDrinkName(props.drinkName)}: ${ingredientList.join(', ')}\nCheck it out at: https://www.cocktailhour.tk`
    )

    return(
        <Link 
            href={twitterLink} 
            isExternal   
        >
            <Button
                position={'absolute'}
                top = {3}
                right = {3}
                colorScheme='twitter' size='sm'>
                Twitter
            </Button>
        </Link>
    )
}

export default Twitter