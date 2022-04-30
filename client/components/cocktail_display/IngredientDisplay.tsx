import { List, ListItem, Box, ListIcon, Heading, Spacer } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { HStack, Center, TableContainer, Table, Thead, Tr, Th, Td, Tbody, TableCaption } from '@chakra-ui/react'

interface Ingredients {
    ingredients: string[],
    heading: string,
    isLoading: boolean
}

const IngredientDisplay = (props: Ingredients) => {
    
    return(
        <Box p='6' rounded='md' minWidth='230px' borderWidth='1px' borderRadius='lg' overflow='hidden'>
        <Center>
        <TableContainer>
            <Table size='sm' variant='unstyled'>
                <TableCaption>What You'll Need</TableCaption>
                <Thead>
                <Tr>
                    <Th></Th>
                    <Th></Th>
                </Tr>
                </Thead>
                <Tbody>
                {props.isLoading ?
                    <Tr>
                        <Td><SkeletonText mt='4' noOfLines={8} spacing='4' /></Td>
                        <Td><SkeletonText mt='4' noOfLines={8} spacing='4' /></Td>
                    </Tr>
                    :
                    props.ingredients.map(ingredient => {
                        return(
                        <Tr>
                            <Td isNumeric>2 oz</Td>
                            <Td>{ingredient}</Td>
                        </Tr>
                        ) 
                    })
                }
                </Tbody>
            </Table>
        </TableContainer>
        </Center>
        </Box>
    )
}

export default IngredientDisplay