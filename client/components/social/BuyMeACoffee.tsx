import { Box, Button, Link, useBreakpointValue } from '@chakra-ui/react'

const BuyMeACoffee = () => {

    return(
        <Link href='https://www.buymeacoffee.com/collaptic' isExternal>
          <Button
            size='sm' 
            colorScheme='yellow'
            position={'absolute'}
            left = {3}
            bottom = {3}
            maxW={150}>
              Buy me a coffee
          </Button>
        </Link>
    )    
}

export default BuyMeACoffee