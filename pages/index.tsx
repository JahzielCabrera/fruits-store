import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";

import { Product } from '../product/types';
import api from '../product/api';
import { 
  Grid, 
  Stack, 
  VStack,
  HStack,
  Text, 
  Box,
  Button, 
  Flex, 
  Image, 
  Drawer, 
  useDisclosure, 
  DrawerOverlay,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  Link
} from '@chakra-ui/react';
import { parse } from "node:path/win32";

interface Props {
  products: Product[]
};

function parseCurrency(value: number): string {
  return value.toLocaleString('es-MX', {style: 'currency', currency: 'MXN'})
}

const IndexRoute: React.FC<Props> = ({ products }) => {

  const [cart, setCart] = React.useState<Product[]>([])

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  const text = React.useMemo(
    () => 
      cart
        .reduce((message, product) => message.concat(`*${product.title} - ${parseCurrency(product.price)}\n`), ` `)
        .concat(`\nTotal: ${parseCurrency(cart.reduce((total: number, product: Product) => total + product.price, 0))}`), 
      [cart]
    )
  
  function handleAddToCart(product: Product) {
    setCart(cart => cart.concat(product))
  }

  return (
    <Stack spacing={6}>
        <Grid gridGap={6} templateColumns='repeat(auto-fill, minmax(240px, 1fr))'>
          {products.map(product => 
            <Stack spacing={3} borderRadius="md" padding={4} key={product.id} backgroundColor="gray.100">
              <Stack spacing={1}>
                <Text fontSize={20} fontWeight="bold" textAlign="center">{product.title}</Text>
                <Image width={80} src={product.image}/>
                <Text fontSize="xl" fontWeight="bold" color="green.500">{parseCurrency(product.price)}</Text>
              </Stack>
              <Button 
                colorScheme='primary' 
                variant="outline"
                onClick={() => handleAddToCart(product)}
                size="sm"
              >Add to cart</Button>
            </Stack>)}
        </Grid>
        {Boolean(cart.length) && 
          <Flex padding={4} bottom={0} alignItems="center" position="sticky" backgroundColor="white" justifyContent="center">
            <Button 
              width="fit-content"
              colorScheme="whatsapp"
              // as={Link}
              // href={`https://wa.me/2281495452?text=${encodeURIComponent(text)}`}
              // isExternal
              ref={btnRef}
              onClick={onOpen}
            >
              View Cart ({cart.length})
            </Button>
          </Flex>
        }

        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Your Cart</DrawerHeader>
            <DrawerBody>
              <Stack>
                  {cart.map(product => (
                    <Box backgroundColor="gray.100" padding={3} borderRadius={5} key={product.id}>
                      <HStack>
                        <Image width={20} src={product.image}/>
                        <VStack>
                          <Text fontWeight="bold">{product.title}</Text>
                          <Text fontWeight="medium" color="green.500">{parseCurrency(product.price)}</Text>
                        </VStack>
                      </HStack>
                    </Box>
                  ))}
              </Stack>
            </DrawerBody>
            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button 
                as={Link}
                colorScheme='whatsapp'
                href={`https://wa.me/2281495452?text=${encodeURIComponent(text)}`}
                isExternal
              >
                Go to checkout
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
    </Stack>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  
  const products = await api.list();

  return {
    props: {
      products,
    },
    revalidate: 10
  }
}

export default IndexRoute;