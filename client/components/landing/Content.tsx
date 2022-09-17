import { Flex } from '@chakra-ui/react'
import { ReactChild, ReactFragment, ReactPortal } from 'react'

const Content = (props: { children: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined }) => {
    return(
        <Flex
            align="center"
            justify={{ base: "center", md: "space-around", xl: "space-between" }}
            direction={{ base: "column-reverse", md: "row" }}
            wrap="nowrap"
            minH="70vh"
            px={8}
            mb={16}
            >
            {props.children}
        </Flex>
    )
}

export default Content