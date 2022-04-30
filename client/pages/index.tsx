import type { NextPage } from 'next'
import { Flex, ScaleFade} from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from 'next/router';
import CocktailSearch from '../components/search/CocktailSearch';

const Home: NextPage = () => {

  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  return (
    <Flex justify='center' align='center' height='100vh'>
      <ScaleFade initialScale={0.50} in={true}>
        <CocktailSearch 
          title = 'Cocktail Hour'
          description = 'Elevate your next expierence with a specaility crafted cocktail based on your favorite artist, album, mood, or event'
        />
      </ScaleFade>
    </Flex>
  )
}

export default Home
