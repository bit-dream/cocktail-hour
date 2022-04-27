import { List, ListItem, Box, ListIcon, Heading } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

interface Ingredients {
    ingredients: string[],
    heading: string,
    isLoading: boolean
}

const IngredientDisplay = (props: Ingredients) => {
    
    return(
        <Box boxShadow='md' p='6' rounded='md' bg='white'>
          <Heading fontSize='xl'>{props.heading}</Heading>

          <List spacing={3}>
            {props.isLoading ?
                <ListItem><SkeletonText mt='4' noOfLines={8} spacing='4' /></ListItem>
                :
                props.ingredients.map(ingredient => {
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