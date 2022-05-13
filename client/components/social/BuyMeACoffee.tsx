import { Box, Button, useBreakpointValue } from '@chakra-ui/react'

const BuyMeACoffee = () => {

    return(
          <Button 
            size='sm' 
            leftIcon='☕' 
            colorScheme='yellow'
            position={'absolute'}
            left = {3}
            bottom = {3}
            maxW={150}>
              Buy me a coffee
          </Button>
    )    
}

export default BuyMeACoffee