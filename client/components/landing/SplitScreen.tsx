import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useBreakpointValue,
    Center, Box, createIcon, Icon, useColorModeValue, Container
  } from '@chakra-ui/react';
import SimpleSearch from '../search/SimpleSearch';
import BuyMeACoffee from '../social/BuyMeACoffee';
  
  export default function SplitScreen() {
    return (
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={6} w={'full'} maxW={'lg'}>
            <Heading fontSize={{ base: '4xl', md: '5xl', lg: '5xl' }}>
              <Center>
              <Box w={{ base: "100%", sm: "60%", md: "50%" }} maxWidth={150} mb={{ base: 12, md: 0, sm: 0 }}>
                  <Image src='/icetea-bw.svg'/>
              </Box>
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: useBreakpointValue({ base: '20%', md: '30%' }),
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'blue.400',
                  zIndex: -1,
                }}>
                Cocktail Hour
              </Text>
              </Center>
              <br />
              {' '}
                <Text color={'blue.400'} fontSize={{ base: '2xl', md: '1xl', lg: '1xl' }} textAlign='center'>
                    Sip on a uniquely crafted drink that is unique to who you are listening to right now.
                </Text>
              {' '}
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'} textAlign='center'>
                Elevate your next expierence with a specaility crafted cocktail based on your favorite artist, album, mood, or event.
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                <SimpleSearch />
            </Stack>
          </Stack>
          <BuyMeACoffee />
        </Flex>
        <Flex flex={1} background='white'>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={
              '/fourgentsdrinking.svg'
            }
          />
        </Flex>
      </Stack>
    );
}
