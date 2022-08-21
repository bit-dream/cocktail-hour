import type { NextPage } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router';
import SplitScreen from '../components/landing/SplitScreen';
import DividedWithImageLayout from '../components/layout/DividedWithImageLayout';
import IngredientDisplay from '../components/cocktail_display/IngredientDisplay';
import Main from '../components/home/Main';
import SideImage from '../components/home/SideImage';
import BuyMeACoffee from '../components/social/BuyMeACoffee';
import { Box } from '@chakra-ui/react';
import Contact from '../components/contact/Contact';

const Home: NextPage = () => {

  return (
    <Box position={'relative'}>
      <BuyMeACoffee />
      <Contact />
      <DividedWithImageLayout 
        left={<Main />}
        right={<SideImage />}
      />
    </Box>
  )
}

export default Home
