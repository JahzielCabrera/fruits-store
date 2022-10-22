import React from 'react';
import Head from 'next/head';
import { ChakraProvider, Container, VStack, Image, Heading, Text, Box, Divider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import theme from '../theme'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Fruits Store</title>
      </Head>
      <ChakraProvider theme={theme}>
        <Box padding={8}>
          <Container 
            borderRadius="sm"
            backgroundColor="white"   
            boxShadow="md" 
            marginY={4} 
            maxWidth="container.xl"
            padding={6}
          >
            <VStack marginBottom={6}>
              <Image borderRadius={999} width={40} src='https://res.cloudinary.com/dpk1tokvy/image/upload/v1666416916/fruits-store/logo-fruits-store_ecruzw.png'/> 
              <Heading>Fruits Store</Heading>
              <Text>The freshest fruits are here!</Text>
            </VStack>
            <Divider marginBottom={4}/>
            <Component {...pageProps} />
          </Container>
        </Box>
      </ChakraProvider>
    </>
  )
}

export default App