import { List, ListItem, Box, ListIcon, Heading } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { HStack, Center } from '@chakra-ui/react'

interface Ingredients {
    ingredients: string[],
    heading: string,
    isLoading: boolean
}

const IngredientDisplay = (props: Ingredients) => {
    
    return(
            <Box p='6' rounded='md' minWidth='300px'>
            <Center>
            <Heading fontSize='xl'>{props.heading}</Heading>
            <HStack spacing={10}>
                <Box>
                    <Heading fontSize='sm'>Ingredient</Heading>
                    <List spacing={1}>
                        {props.isLoading ?
                            <ListItem><SkeletonText mt='4' noOfLines={8} spacing='4' /></ListItem>
                            :
                            props.ingredients.map(ingredient => {
                                return(
                                <ListItem>
                                    {ingredient}
                                </ListItem>
                                ) 
                            })
                        }
                    </List>
                </Box>
                <Box>
                    <Heading fontSize='sm'>Amount</Heading>
                    <List spacing={1}>
                        {props.isLoading ?
                            <ListItem><SkeletonText mt='4' noOfLines={8} spacing='4' /></ListItem>
                            :
                            props.ingredients.map(ingredient => {
                                return(
                                <ListItem>
                                    {ingredient}
                                </ListItem>
                                ) 
                            })
                        }
                    </List>
                </Box>
            </HStack>
            </Center>
            </Box>
    )
}

export default IngredientDisplay