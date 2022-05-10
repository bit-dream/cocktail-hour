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
    FormLabel,
    useToast,
    Box,
    Image 
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import logo from '../../public/logo.jpg'

const SimpleSearch = () => {

    const [searchText, setSearchText] = useState('');
    const router = useRouter();
    const toast = useToast()

    const redirectCallback = (): void => {
        if (searchText !== '') {
            router.push(`/craftdrink/${searchText}`);
            } else {
                toast({
                    title: 'oops!',
                    description: "You need to provide search keywords, such as 'Katy Perry' or 'The Beatles' to craft a cocktail.",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
    }}

    return (
        <Container maxW='container.sm' boxShadow='dark-lg' p='3' rounded='md' bg='white'>
            <FormControl isRequired>
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
                    onKeyPress={e=> {if (e.key === 'Enter') {redirectCallback()}}}
                />
                <InputRightElement width='4.5rem'>
                    <Button 
                        colorScheme='blue' 
                        h='1.75rem' 
                        size='sm'
                        onClick={() => {redirectCallback()}}
                    >
                    Craft
                    </Button>
                </InputRightElement>
                </InputGroup>
            </FormControl>
        </Container>
    )
}

export default SimpleSearch