import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { ChakraProvider } from '@chakra-ui/react'

import { extendTheme } from "@chakra-ui/react"
import { useEffect, useState } from 'react'
import '@fontsource/urbanist/500.css'
import "@fontsource/space-grotesk/700.css"
import "@fontsource/inter/900.css"


function MyApp({ Component, pageProps }: AppProps) {

  let gradient = `linear(to-r,${'#ee9ca7'},${'#ffdde1'})`
  const theme = extendTheme({
    fonts: {
      heading: `'Inter', sans-serif`,
      body: `'Urbanist', sans-serif`,
    },
    styles: {
      global: {
        html: {
        },
        // styles for the `body`
        body: {
          height: '100vh'
        }
      }
    }
  })

  return (
    <ChakraProvider theme={theme}>

        <Head>
          <link rel="shortcut icon" href="favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png"/>
        </Head>

      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
