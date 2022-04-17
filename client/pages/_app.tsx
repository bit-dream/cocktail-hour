import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { ChakraProvider } from '@chakra-ui/react'

import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bgGradient: 'linear(to-r, #ee9ca7, #ffdde1)'
      }
    }
  }
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}><Component {...pageProps} /></ChakraProvider>
  )
}

export default MyApp
