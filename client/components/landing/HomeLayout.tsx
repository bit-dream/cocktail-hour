import { Flex, FlexProps, OmitCommonProps } from '@chakra-ui/react'
import Header from './Header'
import Footer from "./Footer"
import Content from './Content'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

const HomeLayout = (props: JSX.IntrinsicAttributes & OmitCommonProps<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, keyof FlexProps> & FlexProps & { as?: "div" | undefined }) => {
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