import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Button, Flex, Img, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const ThankYou = () => {
  useEffect(() => {
    setTimeout(() => {
      router.push('/profile');
    }, 5000);
  }, []);

  const router = useRouter();
  return (
    <>
      <Header />
      <Flex
        pt={{ md: '20vh', base: '12vh' }}
        bgGradient="linear(to-br, #FFF1D0, #FFFFFF)"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        pb={{ base: '30%', md: '2%' }}
      >
        <Img src="images/Thanks.webp" w={{ md: '30%', base: '60%' }} />
        <Text textAlign="center" fontWeight="700" px="8%">
          We acknowledge your request. Our team will get back to you soon!
        </Text>
        <Button
          bg="#A15942"
          color="white"
          borderRadius="20px"
          type="submit"
          display="block"
          margin="auto"
          my="5%"
          _hover={{}}
          id="sign"
          onClick={() => router.push('/profile')}
        >
          View Bookings
        </Button>
      </Flex>
      <Footer />
    </>
  );
};

export default ThankYou;
