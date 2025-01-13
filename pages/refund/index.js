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

const Refund = () => {
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
            Refund Policy
          </Heading>
          <Text textAlign="center" mb="5%">
            Thank you for choosing YellowSense Technologies.
          </Text>
          <Text>
          We understand that sometimes circumstances may require you to seek a refund. 
          Please read our refund policy carefully to understand your rights and obligations
          </Text>
          <UnorderedList>
            <ListItem>Refund Conditions</ListItem>
            <OrderedList>
              <ListItem>
              Service Cancellation: You may request a refund if you cancel a booked service
              before the scheduled date and time.
              </ListItem>
              <ListItem>
              Unsatisfactory Service: If you are dissatisfied with the provided service,
              please contact us at +91-94038-90108 within 10 days of service delivery for a refund consideration.
              </ListItem>
            </OrderedList>
            <ListItem>Refund Process</ListItem>
            <OrderedList>
              <ListItem>
              Contact Us: To initiate a refund, please contact our customer support at +91-94038-90108.
              Within 2 to 3 weeks the amount will be refunded.
              </ListItem>
              <ListItem>
              Provide Details: Please provide details about your booking and the reason for the refund request.
              </ListItem>
              <ListItem>
              Cancellation Charges: If the cancellation is due to a reason other than Yellowsense's inability to give a caregiver, maid, nanny, or cook, 50% of the remaining pro-rated refund will be deducted as a cancellation charge. The booking amount can't be refunded. 
              It will provide you service in the future till 3 months from the booking date.
              </ListItem>
              <ListItem>
              Refund Decision: We will review your request and notify you of the refund decision.
              </ListItem>
            </OrderedList>
          </UnorderedList>
          <Text textAlign="center" my="5%">
          Note: Refund eligibility may vary based on the specific circumstances of each case.
          </Text>
        </Box>
      </Flex>
      <Footer />
    </>
  );
};

export default Refund;
