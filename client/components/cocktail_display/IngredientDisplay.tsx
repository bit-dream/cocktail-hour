import { List, ListItem, Box, ListIcon, Heading } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'

interface Ingredients {
    ingredients: string[],
    heading: string
}

const IngredientDisplay = (props: Ingredients) => {
    
    return(
        <Box boxShadow='md' p='6' rounded='md' bg='white'>
          <Heading fontSize='xl'>{props.heading}</Heading>

          <List spacing={3}>
            {props.ingredients.map(ingredient => {
                return(
                <ListItem>
                    <ListIcon as={ArrowForwardIcon} color='green.500' />
                    {ingredient}
                </ListItem>
                ) 
                })
            }
          </List>
        </Box>
    )
}

export default IngredientDisplay