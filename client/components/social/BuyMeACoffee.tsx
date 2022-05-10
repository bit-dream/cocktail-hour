import { Box, Button, useBreakpointValue } from '@chakra-ui/react'

const BuyMeACoffee = () => {

    return(
          <Button 
            size='sm' 
            leftIcon='☕' 
            colorScheme='yellow'
            position={'absolute'}
            bottom = {3}
            left = {3}
            maxW={150}>
              Buy me a coffee
          </Button>
    )    
}

export default BuyMeACoffee