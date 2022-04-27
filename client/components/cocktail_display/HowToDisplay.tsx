import {Box, Heading, Text} from '@chakra-ui/react'
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

interface HowTo {
    heading: string,
    directions: string,
    isLoading: boolean
}

const HowToDisplay = (props: HowTo) => {
    return(
        <Box p='6' rounded='md' mt={{ base: 4, md: 0 }}>
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