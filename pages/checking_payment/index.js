import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Box, Flex, Spinner, Text } from '@chakra-ui/react';

const CheckPayment = () => {
  const [loading, setLoading] = useState(true);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const router = useRouter();
  const merchantId = process.env.NEXT_PUBLIC_MERCHANT_ID;
  const [amountPaid, setAmountPaid] = useState('');

  useEffect(() => {
    const storedBookingDetails = localStorage.getItem('bookingDetails');
    const storedTransactionId = localStorage.getItem('transactionIddd');

    if (storedBookingDetails) {
      try {
        const parsedBookingDetails = JSON.parse(storedBookingDetails);
        setBookingDetails(parsedBookingDetails);
        console.log('Booking Details:', parsedBookingDetails);
      } catch (e) {
        console.error('Failed to parse bookingDetails:', e);
      }
    }

    if (storedTransactionId) {
      setTransactionId(storedTransactionId);
      console.log('Transaction ID:', storedTransactionId);
    } else {
      console.error('No Transaction ID found in localStorage');
    }

    console.log('Merchant ID:', merchantId);

    if (storedTransactionId && merchantId) {
      setTimeout(() => checkingPaymentStatus(storedTransactionId), 3000);
    } else {
      console.error('Merchant ID or Transaction ID is missing');
      router.push('/');
    }
  }, [merchantId, router]);

  useEffect(() => {
    if (bookingDetails && amountPaid) {
      storeBookingData();
    }
  }, [bookingDetails, amountPaid]);

  useEffect(() => {
    if (amountPaid) {
      console.log('Amount Paid:', amountPaid);
    }
  }, [amountPaid]);

  const checkingPaymentStatus = async (txId) => {
    setLoading(true);

    if (!txId) {
      console.error('Transaction ID is null');
      setLoading(false);
      return;
    }

    const options = {
      method: 'GET',
      url: `https://backendapiyellowsense.azurewebsites.net/pay_status/${txId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    console.log('Options:', options);

    try {
      const response = await axios.request(options);
      console.log('Full response data:', response.data);

      if (response.data && response.data.code === 'PAYMENT_SUCCESS') {
        const paidAmount = response.data.data.amount / 100;
        setAmountPaid(paidAmount);

        setBookingDetails((prev) => {
          if (!prev) {
            const storedBookingDetails = localStorage.getItem('bookingDetails');
            if (storedBookingDetails) {
              try {
                return JSON.parse(storedBookingDetails);
              } catch (e) {
                console.error('Failed to parse bookingDetails:', e);
              }
            }
          }
          return prev;
        });
        router.push('/thankyou');
      } else {
        console.error(
          'Payment failed or no response code found:',
          response.data
        );
        router.push('/');
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  const storeBookingData = async () => {
    try {
      console.log('Storing booking details:', bookingDetails);

      if (!bookingDetails || typeof bookingDetails !== 'object') {
        throw new Error('Invalid booking details');
      }

      const bookingDataWithAmount = {
        ...bookingDetails,
        bookingplan_amount: amountPaid,
      };

      const response = await fetch(
        'https://backendapiyellowsense.azurewebsites.net/servicebookings',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingDataWithAmount),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const stateOfResponse = await response.json();
      console.log('Data stored successfully:', stateOfResponse);
    } catch (error) {
      console.error('Error while storing the data:', error);

      if (error.response) {
        console.log('Server response:', error.response.data);
      } else if (error.request) {
        console.log('Request made but no response received:', error.request);
      } else {
        console.log('Error:', error.message);
      }
    }
  };

  return (
    <>
      <Header />
      <Flex direction="column" minH="100vh" justify="space-between">
        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          mt={64}
          mb={64}
          textAlign="center"
        >
          {loading && (
            <>
              <Spinner size="xl" />
              <Text mt={4} fontSize="lg">
                We are checking the payment status. Please wait. Don't press
                back or close the page.
              </Text>
            </>
          )}
        </Box>
        <Footer />
      </Flex>
    </>
  );
};

export default CheckPayment;
