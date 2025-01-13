import Footer from '@/components/Footer';
import Header from '@/components/Header';
import {
  Box,
  Flex,
  Heading,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

const Terms = () => {
  const router = useRouter();
  return (
    <>
      <Header />
      <Flex
        pt={{ md: '20vh', base: '12vh' }}
        bgGradient="linear(to-br, #FFF1D0, #FFFFFF)"
      >
        <Box w={{ md: '70%', base: '90%' }} m="auto" mb="5%">
          <Heading
            size={{ md: 'xl', base: 'lg' }}
            mb="5%"
            textAlign="center"
            color="#A15942"
          >
            Terms and Conditions
          </Heading>
          <Text>
            By accessing and using the services provided by YellowSense
            Technologies, you agree to comply with and be bound by the following
            terms and conditions:
          </Text>
          <OrderedList>
            <ListItem>Service Booking</ListItem>
            <UnorderedList>
              <ListItem>
                All service bookings are subject to availability.
              </ListItem>
              <ListItem>
                We reserve the right to decline or cancel any booking.
              </ListItem>
            </UnorderedList>
            <ListItem>Cancellation Policy</ListItem>
            <UnorderedList>
              <ListItem>
                Cancellations must be made 6 hours in advance.
              </ListItem>
              <ListItem>
                Late cancellations may result in a cancellation fee.
              </ListItem>
            </UnorderedList>
            <ListItem>Payment</ListItem>
            <UnorderedList>
              <ListItem>
                Payment for services is due before or at the time of service
                delivery.
              </ListItem>
              <ListItem>
                Accepted payment methods include all major payment methods like
                credit card, debit card UPI etc.
              </ListItem>
              <ListItem>
               {/*A non-refundable subscription fee 30% of Nanny's salary is charged and two replacement.*/}
               A non-refundable subscription fee 30% of Nanny's salary is charged & Zero replacement or with
               50% of Nanny's salary is charged & 1 replacement.
              </ListItem>
            </UnorderedList>
            <ListItem>Service Quality</ListItem>
            <UnorderedList>
              <ListItem>
                We strive to provide high-quality services, but we do not
                guarantee the suitability or quality of services provided by
                service providers.
              </ListItem>
            </UnorderedList>
            <ListItem>Liability</ListItem>
            <UnorderedList>
              <ListItem>
                YellowSense Technologies is not liable for any damages,
                injuries, or losses resulting from the use of our services.
              </ListItem>
            </UnorderedList>
            <ListItem>Privacy</ListItem>
            <UnorderedList>
              <ListItem>
                We respect your privacy. Please review our{' '}
                <Text
                  onClick={() => router.push('/privacy')}
                  textDecoration="underline"
                >
                  Privacy Policy
                </Text>{' '}
                for information on how we collect, use, and protect your
                personal information.
              </ListItem>
            </UnorderedList>
            <ListItem>Changes to Terms & Conditions</ListItem>
            <UnorderedList>
              <ListItem>
                YellowSense Technologies reserves the right to modify these
                terms and conditions at any time. Updated terms will be
                effective upon posting on our website.
              </ListItem>
            </UnorderedList>
          </OrderedList>
        </Box>
      </Flex>
      <Footer />
    </>
  );
};

export default Terms;
