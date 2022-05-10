import { Box, Center, TableContainer, Table, TableCaption, Thead, Tr, Th, Td, Tbody } from "@chakra-ui/react"

interface Ingredients {
    ingredients: string[]
}

const Ingredients = (props: Ingredients) => {

    const createTableFromIngredients = (ingredients) => {
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
                {createTableFromIngredients(props.ingredients)}
                </Tbody>
            </Table>
        </TableContainer>
        </Center>
        </Box>
    )
}

export default Ingredients