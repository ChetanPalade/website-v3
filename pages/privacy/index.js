import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Box, Flex, Heading, ListItem, OrderedList, Text, UnorderedList } from '@chakra-ui/react'
import React from 'react'

const Privacy = () => {
  return (
    <>
        <Header/>
        <Flex pt={{ md: "20vh", base: "12vh" }}
        bgGradient="linear(to-br, #FFF1D0, #FFFFFF)">
      <Box
        w={{md:"70%", base:"90%"}}
        m="auto"
        mb="5%"
      >
        <Heading size={{ md: "xl", base: "lg" }} mb="5%" textAlign="center" color="#A15942">Privacy Policy</Heading>
        <Text>
        By using our services, you agree to the terms of this privacy policy. Please read the following information carefully:
        </Text>
        <OrderedList>
          <ListItem>Information We Collect</ListItem>
          <UnorderedList>
            <ListItem>
            We collect personal information such as names, addresses, and contact details for the purpose of providing maid, cook, and nanny services.
            </ListItem>
          </UnorderedList>
          <ListItem>How We Use Your Information</ListItem>
          <UnorderedList>
            <ListItem>We use the collected information to facilitate service bookings, process payments, and communicate with users regarding their requested services.</ListItem>
          </UnorderedList>
          <ListItem>Cookies and Tracking Technologies</ListItem>
          <UnorderedList>
            <ListItem>
            We may use cookies to enhance the user experience on our website. Users can manage cookie preferences through their browser settings.
            </ListItem>
          </UnorderedList>
          <ListItem>Information Sharing</ListItem>
          <UnorderedList>
            <ListItem>
            We may share user information with service providers to fulfill booked services. We do not sell or share information with third parties for marketing purposes.
            </ListItem>
          </UnorderedList>
          <ListItem>Security Measures</ListItem>
          <UnorderedList>
            <ListItem>
            We implement security measures to protect user information, including encryption and secure payment processing.
            </ListItem>
          </UnorderedList>
          <ListItem>Your Choices</ListItem>
          <UnorderedList>
            <ListItem>
            Users can choose to opt-out of promotional communications. However, essential service-related communications will still be sent.
            </ListItem>
          </UnorderedList>
          <ListItem>Changes to Privacy Policy</ListItem>
          <UnorderedList>
            <ListItem>
            We reserve the right to update our privacy policy. Changes will be effective upon posting on our website.
            </ListItem>
          </UnorderedList>
        </OrderedList>
        <Text textAlign="center" my="5%">If you have any questions about our privacy policy, please contact us at +91 - 94038-90108.</Text>
      </Box>
      </Flex>
        <Footer/>
    </>
  )
}

export default Privacy