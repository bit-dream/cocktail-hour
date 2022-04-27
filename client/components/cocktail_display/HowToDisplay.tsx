import {Box, Heading, Text} from '@chakra-ui/react'
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

interface HowTo {
    heading: string,
    directions: string,
    isLoading: boolean
}

const HowToDisplay = (props: HowTo) => {
    return(
        <Box boxShadow='md' p='6' rounded='md' bg='white'>
          <Heading fontSize='xl'>{props.heading}</Heading>
          {
            props.isLoading ? 
            <SkeletonText mt='4' noOfLines={8} spacing='4' />
            :
            <Text mt={4}>{props.directions}</Text>
          }
        </Box>
    )
}

export default HowToDisplay