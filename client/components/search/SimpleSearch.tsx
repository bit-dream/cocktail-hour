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
    Image, Icon, useColorModeValue, createIcon 
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
        <Container 
            maxW='container.sm'
            p='3' 
            rounded='md'
            border={'1px solid #bebebe'} 
            bg='white'
            boxShadow={`
                7px 20px 30px 0px rgba(207, 119, 243, 0.2), 
                -20px -14px 50px 0px rgba(0, 155, 255, 0.2), 
                -20px 5px 30px 0px rgba(42, 201, 219, 0.2), 
                20px -10px 30px 0px rgba(66, 245, 215, 0.2), 
                10px -20px 30px 0px rgba(255, 5, 134, 0.2);
            `}
            >
            <FormControl isRequired>
                <InputGroup>
                <InputLeftElement
                    pointerEvents='none'>
                        {<Search2Icon color='gray.300' />}
                </InputLeftElement>
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