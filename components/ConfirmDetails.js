import { ProviderContext } from '@/context/StoreContext';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import sha256 from 'crypto-js/sha256';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const ConfirmDetails = ({
  isConfirmOpen,
  onConfirmClose,
  history,
  onNameOpen,
  onAddressOpen,
  change,
  onAvailableClose,
}) => {
  useEffect(() => {
    const nameFromLocalStorage = localStorage.getItem('name');
    const addressFromLocalStorage = localStorage.getItem('address');
    setNumber(localStorage.getItem('phone'));
    if (localStorage.getItem('user')) {
      setCurrentOrder(JSON.parse(localStorage.getItem('user')));
      setPrice(localStorage.getItem('price'));
    }

    if (nameFromLocalStorage) {
      setUserName(nameFromLocalStorage);
    } else if (history && history.length > 0 && history[0].user_name) {
      setUserName(history[0].user_name);
    }

    if (addressFromLocalStorage) {
      setUserAddress(addressFromLocalStorage);
    } else if (history && history.length > 0 && history[0].user_address) {
      setUserAddress(history[0].user_address);
    }

    // handleBook();
  }, [history, change]);

  const [userName, setUserName] = useState();
  const { onThanksOpen, setLoading } = useContext(ProviderContext);
  const [price, setPrice] = useState('');
  const [userAddress, setUserAddress] = useState();
  const [number, setNumber] = useState('');
  const [currentOrder, setCurrentOrder] = useState({});
  const [paymentLoading, setPaymentLoading] = useState(null);
  const [paymentModal, setPaymentModal] = useState(false);

  const {
    isOpen: isBookOpen,
    onOpen: onBookOpen,
    onClose: onBookClose,
  } = useDisclosure();

  const {
    isOpen: isPaymentModalOpen,
    onOpen: onPaymentModalOpen,
    onClose: onPaymentModalClose,
  } = useDisclosure();

  const router = useRouter();

  const handleNameChange = () => {
    onNameOpen();
    onConfirmClose();
  };

  const handleAddressChange = () => {
    onAddressOpen();
    onConfirmClose();
  };

  const handleProceed = () => {
    onBookOpen();
    onConfirmClose();
  };

  const handlePaymentModaOpen = () => {
    onPaymentModalOpen();
  };

  const handlePaymentModaClose = () => {
    onPaymentModalClose();
  };

  const handleBook = async () => {
    setLoading(true);
    try {
      const data = {
        service_type: currentOrder.service,
        StartDate: currentOrder.startDate,
        start_time: currentOrder.startTime.label,
        name: userName,
        mobileNumber: number,
        society:
          currentOrder.location == 'Area' ? '' : currentOrder.region.value,
        area: currentOrder.location == 'Area' ? currentOrder.region.value : '',
        plan: currentOrder.plan,
        anyspecificPreference: currentOrder.specificPreference.value
          ? currentOrder.message
          : 'NO',
        price: price,
        address: userAddress,
        Payment_mode: 'Cash on Delivery',

        ageGreaterthan2: 1,
        ageLessthan2: 0,
        'no ofhours': '2',
        bookingplan_amount: selectedPrice,
      };
      if (currentOrder.service == 'Maid') {
        data['prefferedServices'] = currentOrder.serviceType
          ? currentOrder.serviceType.join()
          : '';
        data['houseSize'] = currentOrder.houseSize;
      } else if (currentOrder.service == 'Cook') {
        data['prefferedServices'] = currentOrder.vegNonveg.label;
        data['mealtype'] = currentOrder.meal;
        data['NoOfPeople'] = currentOrder.people.label;
      } else if (currentOrder.service == 'Nanny') {
        data['ageGreaterthan2'] = currentOrder.ageGreaterthan2.value;
        data['ageLessthan2'] = currentOrder.ageLessthan2.value;
        data['no ofhours'] = currentOrder.hours;
      }

      const response = await fetch(
        'https://backendapiyellowsense.azurewebsites.net/servicebookings',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      const stateOfResponse = await response.json();
      setLoading(false);
      router.push('/thankyou');
      console.log('====================================');
      console.log('Booking Stored Successfully');
      console.log('====================================');
      // onThanksOpen()
      // onBookClose()
      // onAvailableClose()
      localStorage.removeItem('user');
      //   if(currentOrder.location == "Society"){
      //     const dataSociety = await fetch("https://yellowsensebackendapi.azurewebsites.net/society_names")
      //     const listOfSocieties = await dataSociety.json()
      //     const selectedSociety =  listOfSocieties.filter((place)=> place.name == currentOrder.region.value)[0]?.code
      //     console.log(selectedSociety, number, currentOrder.service.toUpperCase(), currentOrder.startDate+" "+currentOrder.startTime.value)
      //     const payload = {
      //       'number': number,
      //           'app-id': '73056189',
      //           'param1': selectedSociety,
      //           'param2': currentOrder.service.toUpperCase(),
      //           'param3': `${currentOrder.startDate} ${currentOrder.startTime.value}`

      //     }
      //     const responseCall = await fetch('https://telephonycloud.co.in/api/v1/calls', {
      //     method: 'POST',
      //     headers: {
      //       'Authorization': 'Basic OTEyMTM3MDc5NDphZG1pbg==',
      //       'Content-Type': 'application/json',
      //     },
      //     body: payload,
      // })
      // const callResponse = await responseCall.json()
      // console.log(callResponse)
      //   }
    } catch (error) {
      setLoading(false);
      alert(error);
      console.log(error);
    }
  };

  const proceedTopay = async (selectedPrice, plan) => {
    console.log('Setting paymentLoading to:', plan);
    setPaymentLoading(plan);

    try {
      const transactionId = 'YS-' + uuidv4().toString(36).slice(-6);
      const merchantUserId = 'MUID-' + uuidv4().toString(36).slice(-6);

      const paymentPayload = {
        merchantId: process.env.NEXT_PUBLIC_MERCHANT_ID,
        merchantTransactionId: transactionId,
        merchantUserId: merchantUserId,
        amount: selectedPrice * 100,
        redirectUrl: `https://backendapiyellowsense.azurewebsites.net/check_transaction_status/${transactionId}`,
        redirectMode: 'REDIRECT',
        callbackUrl: `https://backendapiyellowsense.azurewebsites.net/check_status_callback_url/${transactionId}`,
        mobileNumber: number,
        paymentInstrument: {
          type: 'PAY_PAGE',
        },
      };

      console.log('Payment Payload:', paymentPayload);

      const data = {
        service_type: currentOrder.service,
        StartDate: currentOrder.startDate,
        start_time: currentOrder.startTime.label,
        name: userName,
        mobileNumber: number,
        society:
          currentOrder.location == 'Area' ? '' : currentOrder.region.value,
        area: currentOrder.location == 'Area' ? currentOrder.region.value : '',
        plan: currentOrder.plan,
        anyspecificPreference: currentOrder.specificPreference.value
          ? currentOrder.message
          : 'NO',
        price: price,
        address: userAddress,
        Payment_mode: 'Cash on Delivery',

        ageGreaterthan2: 1,
        ageLessthan2: 0,
        'no ofhours': '2',
        bookingplan_amount: selectedPrice,
      };

      const dataPayload = JSON.stringify(paymentPayload);
      const dataBase64 = Buffer.from(dataPayload).toString('base64');
      const fullURL = `${dataBase64}/pg/v1/pay${process.env.NEXT_PUBLIC_SALT_KEY}`;
      const dataSha256 = sha256(fullURL).toString();
      const checkSum = `${dataSha256}###${process.env.NEXT_PUBLIC_SALT_INDEX}`;

      console.log('Checksum:', checkSum);

      localStorage.removeItem('transactionIddd');
      localStorage.removeItem('bookingDetails');
      console.log('Removing TransactionId & BookingDetails');

      localStorage.setItem('transactionIddd', transactionId);
      localStorage.setItem('bookingDetails', JSON.stringify(data));

      const PROD_API_URL =
        'https://backendapiyellowsense.azurewebsites.net/payment_initiate';

      const response = await axios.post(
        PROD_API_URL,
        { payload: paymentPayload },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-VERIFY': checkSum,
          },
        }
      );

      if (response.status === 200) {
        const result = response.data;
        console.log('Result:', result);
        const redirectUrl =
          result.response.data.instrumentResponse.redirectInfo.url;
        router.push(redirectUrl);
      } else {
        console.error('Error:', response.data.message);
      }
    } catch (error) {
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else {
        console.error('Error message:', error.message);
      }
    } finally {
      setPaymentLoading(null);
    }
  };

  return (
    <>
      <Modal
        isOpen={isConfirmOpen}
        onClose={onConfirmClose}
        isCentered
        size={{ md: 'lg', base: 'xs' }}
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent borderRadius="30px" bg="#FFFFE9" p="2%">
          <ModalCloseButton />
          <ModalBody>
            <Heading size="md">Name :</Heading>
            <Flex alignItems="center" justifyContent="space-between">
              <Heading size="lg" color="#A15942">
                {userName}
              </Heading>
              <Button
                bg="#D19835"
                color="white"
                borderRadius="20px"
                w={{ md: '100px', base: '70px' }}
                p="0 2rem"
                onClick={handleNameChange}
              >
                Update
              </Button>
            </Flex>
            <Heading size="md" mt="5%">
              Address :
            </Heading>
            <Flex alignItems="center" justifyContent="space-around">
              <Heading size="lg" color="#A15942">
                {userAddress}
              </Heading>
              <Button
                bg="#D19835"
                color="white"
                borderRadius="20px"
                w="100px"
                p="0 2rem"
                onClick={handleAddressChange}
              >
                Update
              </Button>
            </Flex>
            <Button
              bg="#A15942"
              color="white"
              borderRadius="20px"
              fontSize="1.5rem"
              p="0 5%"
              display="block"
              margin="5% auto"
              mt="10%"
              onClick={handleProceed}
            >
              Continue
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isBookOpen}
        onClose={onBookClose}
        isCentered
        size={{ md: 'lg', base: 'xs' }}
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent borderRadius="30px" bg="#FFFFE9">
          <ModalHeader bg="#FFED9B" pb="0px" borderRadius="30px">
            <Flex alignItems="center" justifyContent="space-between">
              <Heading size="lg" color="#a15942" p="2%">
                Booking Details
              </Heading>
              <Heading size="lg" color="#a15942" p="2%" textAlign="center">
                ₹ {price}
              </Heading>
            </Flex>
          </ModalHeader>

          <ModalBody>
            <Box py="2%">
              <Heading size="md">User summary</Heading>
              <Divider my="2%" border="1px solid gray" />
              <Flex flexWrap="wrap" gap="5%">
                <Text>Name: {userName}</Text>
                <Text>Contact: +91 {number}</Text>
                <Text>Address: {userAddress}</Text>
              </Flex>
            </Box>
            <Box py="2%">
              <Heading size="md">Booking summary</Heading>
              <Divider my="2%" border="1px solid gray" />

              {currentOrder.service && (
                <>
                  <Flex justifyContent="space-between">
                    <Text fontWeight="500">Requirement: </Text>
                    <Text>{currentOrder.plan}</Text>
                  </Flex>
                  <Flex justifyContent="space-between">
                    <Text fontWeight="500">Start Date: </Text>
                    <Text>{currentOrder.startDate}</Text>
                  </Flex>
                  <Flex justifyContent="space-between">
                    <Text fontWeight="500">Start Time: </Text>
                    <Text>{currentOrder.startTime.label}</Text>
                  </Flex>
                  <Flex justifyContent="space-between">
                    <Text fontWeight="500">Selected Service: </Text>
                    <Text>{currentOrder.service}</Text>
                  </Flex>
                  {currentOrder.service == 'Nanny' && (
                    <>
                      <Flex justifyContent="space-between">
                        <Text fontWeight="500">Hours per day: </Text>
                        <Text>{currentOrder.hours}</Text>
                      </Flex>
                      <Flex justifyContent="space-between">
                        <Text fontWeight="500">Age Greater than 2: </Text>
                        <Text>{currentOrder.ageGreaterthan2.value}</Text>
                      </Flex>
                      <Flex justifyContent="space-between">
                        <Text fontWeight="500">Age Less than 2: </Text>
                        <Text>{currentOrder.ageLessthan2.value}</Text>
                      </Flex>
                    </>
                  )}
                  {currentOrder.service == 'Cook' && (
                    <>
                      <Flex justifyContent="space-between">
                        <Text fontWeight="500">Veg / Non Veg: </Text>
                        <Text>{currentOrder.vegNonveg.value}</Text>
                      </Flex>
                      <Flex justifyContent="space-between">
                        <Text fontWeight="500">No. of People: </Text>
                        <Text>{currentOrder.people.value}</Text>
                      </Flex>
                      <Flex justifyContent="space-between">
                        <Text fontWeight="500">Meal Type: </Text>
                        <Text>{currentOrder.meal}</Text>
                      </Flex>
                    </>
                  )}
                  {currentOrder.service == 'Maid' && (
                    <>
                      <Flex justifyContent="space-between">
                        <Text fontWeight="500">House Size: </Text>
                        <Text>{currentOrder.houseSize}</Text>
                      </Flex>
                      <Flex justifyContent="space-between">
                        <Text fontWeight="500">Preffered Services: </Text>
                        {currentOrder.serviceType ? (
                          currentOrder.serviceType.join()
                        ) : (
                          <Text>None</Text>
                        )}
                      </Flex>
                    </>
                  )}
                  <Flex justifyContent="space-between">
                    <Text fontWeight="500">Notes: </Text>
                    <Text>
                      {currentOrder.message == ''
                        ? 'None'
                        : currentOrder.message}
                    </Text>
                  </Flex>
                </>
              )}
            </Box>
            <Box py="2%">
              <Heading size="md">Booking summary</Heading>
              <Divider my="2%" border="1px solid gray" />
              <Flex justifyContent="space-between">
                <Text fontWeight="500">Estimated Worker Salary: </Text>
                <Text>
                  ₹{' '}
                  {(price / (currentOrder.plan == 'One Time' ? 1.3 : 1.3)) * 1} {/*1.5*/}
                </Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text fontWeight="500">Platform fees: </Text>
                <Text>
                  ₹{' '}
                  {price -
                    (price / (currentOrder.plan == 'One Time' ? 1.3 : 1.3)) * 1} {/*1.5*/}
                </Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text fontWeight="500">Total Price: </Text>
                <Text>₹ {price}</Text>
              </Flex>
              <Divider my="2%" border="1px solid gray" />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Flex w="100%" justifyContent="center" alignItems="center">
              <Button
                bg="#A15942"
                color="white"
                borderRadius="20px"
                fontSize="1.2rem"
                p="0 5%"
                onClick={handlePaymentModaOpen}
              >
                {paymentLoading ? 'Loading' : 'Proceed To Book '}
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {currentOrder.plan === 'One Time' ? (
        <Modal
          isOpen={isPaymentModalOpen}
          onClose={onPaymentModalClose}
          isCentered
          size={{ md: 'lg', base: 'xs' }}
        >
          <ModalOverlay />
          <ModalContent borderRadius="30px" bg="#FFFFE9">
            <ModalHeader bg="#FFED9B" pb="0px" borderRadius="30px">
              <Heading size="lg" color="#a15942" p="2%">
                Booking Charges
              </Heading>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontSize="lg" p={4}>
                You have selected a One Time plan. Your total amount is: ₹
                {price}, As Booking charges to confirm your Booking You need to
                pay ₹
                {price -
                  (price / (currentOrder.plan == 'One Time' ? 1.3 : 1.3)) *
                    1}{' '}
                Later You can Pay the remaining amount which is ₹
                {(price / (currentOrder.plan == 'One Time' ? 1.3 : 1.3)) * 1} to
                Provider directly.
              </Text>
              <Button
                colorScheme="blue"
                size="lg"
                width="100%"
                onClick={() =>
                  proceedTopay(price - (price / 1.3) * 1, 'oneTime')
                }
                isLoading={paymentLoading === 'oneTime'}
              >
                Proceed with Pay ₹
                {price -
                  (price / (currentOrder.plan == 'One Time' ? 1.3 : 1.3)) * 1}
              </Button>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      ) : (
        <Modal
          isOpen={isPaymentModalOpen}
          onClose={onPaymentModalClose}
          isCentered
          size={{ md: 'lg', base: 'xs' }}
        >
          <ModalOverlay />
          <ModalContent borderRadius="30px" bg="#FFFFE9">
            <ModalHeader bg="#FFED9B" pb="0px" borderRadius="30px">
              <Heading size="lg" color="#a15942" p="2%">
                Choose Payment Plan
              </Heading>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={4} align="stretch">
                <Stack
                  spacing={2}
                  borderWidth="1px"
                  borderRadius="md"
                  p={4}
                  bg="white"
                  boxShadow="md"
                  flex="1"
                >
                  <Text fontWeight="bold">Regular Plan (₹499)</Text>
                  <Text color="black">• Fast and confirming booking</Text>
                  <Text>
                    • 10 - 15 working days, the provider will be assigned
                  </Text>
                  <Text>• Premium support included</Text>
                  <Button
                    colorScheme="blue"
                    size="lg"
                    width="100%"
                    onClick={() => proceedTopay(499, 'pro')}
                    isLoading={paymentLoading === 'pro'}
                  >
                    Regular Plan (₹499)
                  </Button>
                </Stack>

                <Stack
                  spacing={2}
                  borderWidth="1px"
                  borderRadius="md"
                  p={4}
                  bg="white"
                  boxShadow="md"
                  flex="1"
                >
                  <Text fontWeight="bold">Tatkal Plan(Urgent) (₹999)</Text>
                  <Text>• Fastest response guaranteed</Text>
                  <Text>
                    • 2 - 3 working days, the provider will be assigned
                  </Text>
                  <Text>• Includes priority support and extra benefits</Text>
                  <Button
                    colorScheme="blue"
                    size="lg"
                    width="100%"
                    onClick={() => proceedTopay(999, 'premium')}
                    isLoading={paymentLoading === 'premium'}
                  >
                    Tatkal Plan (₹999)
                  </Button>
                </Stack>
              </Stack>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default ConfirmDetails;
