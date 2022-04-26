import {Box, Heading, Text} from '@chakra-ui/react'

interface HowTo {
    heading: string,
    directions: string
}

const HowToDisplay = (props: HowTo) => {
    return(
        <Box boxShadow='md' p='6' rounded='md' bg='white'>
          <Heading fontSize='xl'>{props.heading}</Heading>
          <Text mt={4}>{props.directions}</Text>
        </Box>
    )
}

export default HowToDisplay