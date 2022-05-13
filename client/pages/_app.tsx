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
        html: {
        },
        // styles for the `body`
        body: {
          //bgGradient: gradient
          height: '100vh',
          //backgroundAttachment: 'fixed',
          //backgroundRepeat: 'no-repeat',
          //backgroundColor: 'hsla(0,100%,50%,1)',
          //backgroundImage: `
          //radial-gradient(at 40% 20%, hsla(331,100%,74%,1) 0px, transparent 50%),
          //radial-gradient(at 79% 0%, hsla(247,100%,73%,1) 0px, transparent 50%),
          //radial-gradient(at 0% 50%, hsla(298,100%,93%,1) 0px, transparent 50%),
          //radial-gradient(at 80% 50%, hsla(283,100%,76%,1) 0px, transparent 50%),
          //radial-gradient(at 0% 100%, hsla(325,100%,77%,1) 0px, transparent 50%),
          //radial-gradient(at 80% 100%, hsla(185,100%,70%,1) 0px, transparent 50%),
          //radial-gradient(at 0% 0%, hsla(286,100%,76%,1) 0px, transparent 50%);
          //`,
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
