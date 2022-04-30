import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { ChakraProvider } from '@chakra-ui/react'

import { extendTheme } from "@chakra-ui/react"
import { useEffect, useState } from 'react'


function MyApp({ Component, pageProps }: AppProps) {

  let gradient = `linear(to-r,${'#ee9ca7'},${'#ffdde1'})`
  const theme = extendTheme({
    styles: {
      global: {
        // styles for the `body`
        body: {
          bgGradient: gradient
        }
      }
    }
  })

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
