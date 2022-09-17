import {Box, Heading, Text} from '@chakra-ui/react'
import { Skeleton, SkeletonCircle, SkeletonText, OrderedList, ListItem } from '@chakra-ui/react'

interface HowTo {
    heading: string,
    directions: string[],
    isLoading: boolean
}

const HowToDisplay = (props: HowTo) => {
    return(
        <Box p='6' rounded='md' mt={{ base: 4, md: 0 }}>
          <Heading fontSize='xl'>{props.heading}</Heading>
          <OrderedList>
            {props.isLoading ? 
                <ListItem><SkeletonText mt='4' noOfLines={8} spacing='4' /></ListItem>
                :
                props.directions.map((direction, index) => <ListItem key={index}>{direction}</ListItem>)
            }
          </OrderedList>
        </Box>
    )
}

export default HowToDisplay