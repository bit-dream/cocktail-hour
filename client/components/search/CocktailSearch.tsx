import {
    Spacer,
    Text,
    Center,
    Container, 
    Input, 
    InputGroup, 
    InputLeftElement, 
    InputRightElement, 
    Button, 
    FormControl, 
    FormLabel 
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from 'next/router'

/* Define interface for passed props */
interface SearchProps {
    title: string,
    description: string
} 

const CocktailSearch = (props: SearchProps) => {

    const [searchText, setSearchText] = useState('');
    const router = useRouter();

    return (
        <Container maxW='container.sm' boxShadow='dark-lg' p='6' rounded='md' bg='white'>
            <VStack
                spacing={4}
                align='stretch'
            >
            <Spacer/>
            <Center>
                <Text
                    bgGradient='linear(to-l, #7928CA, #FF0080)'
                    bgClip='text'
                    fontSize='5xl'
                    fontWeight='extrabold'
                >
                {props.title}
                </Text>
            </Center>
            <Spacer/>
            <Spacer/>
            <Text fontSize='lg'>
                {props.description}
            </Text>
            <Center>
            <FormControl isRequired>
                <FormLabel htmlFor='search'>Search Text</FormLabel>
                <InputGroup>
                <InputLeftElement
                    pointerEvents='none'
                    children={<Search2Icon color='gray.300' />}
                />
                <Input 
                    id='search'
                    type='search' 
                    placeholder='Enter Artist or Album Name'
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyPress={e=> {
                    if (e.key === 'Enter') {
                        if (searchText !== '') {
                        router.push(`/craftdrink/${searchText}`);
                        }
                    }
                }}
                />
                <InputRightElement width='4.5rem'>
                    <Button 
                        colorScheme='blue' 
                        h='1.75rem' 
                        size='sm'
                        onClick={() => {
                            if (searchText !== '') {
                            router.push(`/craftdrink/${searchText}`);
                            }
                        }}
                    >
                    Craft
                    </Button>
                </InputRightElement>
                </InputGroup>
            </FormControl>
            </Center>
            <Spacer/>
            </VStack>
        </Container>
    )
}

export default CocktailSearch