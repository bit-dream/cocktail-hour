import { Box, Center, TableContainer, Table, TableCaption, Thead, Tr, Th, Td, Tbody, Image } from "@chakra-ui/react"
import { url } from "inspector";
import Twitter from "../social/Twitter";

interface Ingredients {
    ingredients: Map<String,String>
}

const Ingredients = (props: Ingredients) => {

    const createTableFromIngredients = (ingredients: Map<String,String>) => {
        let tableRows = [];
        for (const [key, value] of ingredients.entries()) {
            tableRows.push(
                <Tr>
                    <Td isNumeric>{value}</Td>
                    <Td>{key}</Td>
                </Tr>
            )
        }
        return tableRows
    }

    return(
        <Box 
            p='6' 
            rounded='md' 
            minWidth='230px' 
            borderWidth='1px'
            borderColor='gray.400'
            borderRadius='lg'
            overflow='hidden'
            position={'relative'} 
            background={'white'}
            boxShadow={`
                7px 20px 30px 0px rgba(207, 119, 243, 0.3), 
                -20px -14px 50px 0px rgba(0, 155, 255, 0.3), 
                -20px 5px 30px 0px rgba(42, 201, 219, 0.3), 
                20px -10px 30px 0px rgba(66, 245, 215, 0.3), 
                10px -20px 30px 0px rgba(255, 5, 134, 0.3);
            `}
        >
        <Center>
        <Twitter />
        <TableContainer>
            <Table size='sm' variant='unstyled'>
                <TableCaption>What You&apos;ll Need</TableCaption>
                <Thead>
                <Tr>
                    <Th></Th>
                    <Th></Th>
                </Tr>
                </Thead>
                <Tbody>
                {createTableFromIngredients(props.ingredients)}
                </Tbody>
            </Table>
        </TableContainer>
        </Center>
        </Box>
    )
}

export default Ingredients