import { Flex } from '@chakra-ui/react'
import Header from './Header'
import Footer from "./Footer"
import Content from './Content'

const HomeLayout = (props) => {
  return (
    <Flex
      direction="column"
      align="center"
      //maxW={{ xl: "1200px" }}
      m="0 auto"
      {...props}
    >
        <Header />
        <Content>
          {props.children}
        </Content>
        <Footer />
    </Flex>
  )
}

export default HomeLayout