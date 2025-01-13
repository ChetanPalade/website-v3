import ConfirmDetails from '@/components/ConfirmDetails';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Order from '@/components/Order';
import OrderHistory from '@/components/OrderHistory';
import ShowProviders from '@/components/ShowProviders';
import { ProviderContext } from '@/context/StoreContext';
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

const Profile = () => {
  useEffect(() => {
    if (!isAuth) {
      router.push('/');
    } else {
      if (localStorage.getItem('user')) {
        const userData = JSON.parse(localStorage.getItem('user'));
        setUserOrder(JSON.parse(localStorage.getItem('user')));
        getProviders(
          userData.location,
          userData.region.value,
          userData.service,
          userData.startDate,
          userData.startTime.label
        );
      }
      if (localStorage.getItem('phone')) {
        getHistory(localStorage.getItem('phone'));
        setPhone(localStorage.getItem('phone'));
      }
      setPrice(localStorage.getItem('price'));
    }
  }, []);
  const getProviders = async (location, area, service, date, time) => {
    try {
      const getProviders = await fetch(
        `https://yellowsensebackendapi.azurewebsites.net/get_matching_service_providers?${
          location == 'Area' ? 'Region=' + area : 'Locations=' + area
        }&Services=${service}&date=${date}&start_time=${time}`
      );
      const gotProviders = await getProviders.json();
      if (!gotProviders.error) {
        setproviders(gotProviders?.providers);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  const getHistory = async (phone) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://backendapiyellowsense.azurewebsites.net/get_booking_details_by_customer_number?customer_phone_number=${phone}`
      );
      const data = await response.json();
      if (data?.booking_details) {
        setHistory(data.booking_details);
      } else {
        console.error('Unexpected data format:', data);
        setHistory([]);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching history:', error);
      alert(error.message);
    }
  };
  const { isAvailableOpen, onAvailableClose, isAuth, setLoading } =
    useContext(ProviderContext);
  const [phoneNumber, setPhone] = useState('');
  const {
    isOpen: isNameOpen,
    onOpen: onNameOpen,
    onClose: onNameClose,
  } = useDisclosure();
  const {
    isOpen: isAddressOpen,
    onOpen: onAddressOpen,
    onClose: onAddressClose,
  } = useDisclosure();
  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onClose: onConfirmClose,
  } = useDisclosure();
  const [changed, setChange] = useState(false);
  const [price, setPrice] = useState(0);
  const [history, setHistory] = useState([]);
  const [userOrder, setUserOrder] = useState({});
  const [providers, setproviders] = useState([]);
  const router = useRouter();
  const getUserDetails = () => {
    if (
      (history && history[0]?.user_name) ||
      (localStorage.getItem('name') && localStorage.getItem('address'))
    ) {
      // onAddressOpen()
      onConfirmOpen();
    } else if (localStorage.getItem('name')) {
      onAddressOpen();
    } else {
      onNameOpen();
    }
  };
  const validateFirstName = (value) => {
    let error;
    if (!value) {
      error = 'It is required';
    }
    return error;
  };
  return (
    <>
      <Header />
      <Flex
        pt={{ md: '20vh', base: '12vh' }}
        bgGradient="linear(to-br, #FFF1D0, #FFFFFF)"
        justifyContent="space-around"
        alignItems={'flex-start'}
        px={{ md: '10%', base: '2%' }}
        minH="90vh"
      >
        <Box
          textAlign="center"
          pt="3%"
          bg="#FFED9B"
          borderRadius="30px"
          w="20%"
          boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
          display={{ md: 'block', base: 'none' }}
        >
          <Heading size="md" px="2%">
            <Heading size="md" px="2%">
              Hey,{' '}
              {history && history.length > 0 && history[0]?.user_name
                ? history[0].user_name
                : 'User'}
            </Heading>
          </Heading>
          <Text>(+91 {phoneNumber})</Text>
          <Divider margin="10% auto" border="1px solid #BCBCBC" w="80%" />
          <Box bg="#FFFFE9" borderRadius="30px" p="10% 3%">
            <Flex alignItems="center" justifyContent="space-around">
              <Heading size="sm" p="5%" color="#A15942">
                My Services
              </Heading>
              <ChevronRightIcon
                fontSize="1.5rem"
                bg="#A15942"
                borderRadius="50%"
                color="white"
              />
            </Flex>
            <Divider margin="10% auto 0" border="1px solid #BCBCBC" w="80%" />
          </Box>
        </Box>
        <Box
          w={{ md: '60%', base: '100%' }}
          bg="#FFED9B"
          borderRadius="30px"
          p={{ md: '2%', base: '5%' }}
          mb={{ md: '5%', base: '10%' }}
        >
          <Text fontSize="1.2rem">My Bookings</Text>
          <Divider margin="2% 0" border="1px solid #BCBCBC" w="100%" />
          {history?.length > 0 ? (
            history.map((single) => (
              <OrderHistory
                person={single.service_type}
                location={single.user_address}
                startDate={single.StartDate}
                startTime={single.start_time}
                serviceStatus={single.CurrentStatus}
                serviceProvider={single.provider_name}
                price={single.TotalAmount}
                source="history"
                bookingplan_amount={single.bookingplan_amount}
                AmountPaid={single.AmountPaid}
                providerLanguages={single.maid_details.Languages}
                providerPhoneNumber={single.provider_phone_number}
                providerRatings={single.maid_details.RATING}
                providerExperience={single.maid_details.Years_of_Experience}
                providerImage={single.maid_details.image}
                customerName={single.user_name}
              />
            ))
          ) : (
            <Box textAlign="center" p="10%">
              <Text>No History found</Text>
            </Box>
          )}
        </Box>
      </Flex>
      <Drawer
        placement={{ md: 'right', base: 'bottom' }}
        onClose={onAvailableClose}
        isOpen={isAvailableOpen}
        size="lg"
        preserveScrollBarGap
      >
        <DrawerOverlay />
        <DrawerContent bg="#F5F1D2" p="2%">
          <DrawerCloseButton />
          <Flex
            justifyContent="space-between"
            my="2%"
            p="5%"
            mt={{ base: '10%', md: '5%' }}
            flexDirection={{ md: 'row', base: 'column' }}
            gap={{ base: '20px', md: '' }}
          >
            <Heading>Estimated ₹ {price}</Heading>
            <Button
              bg="#A15942"
              borderRadius="30px"
              fontSize="1.5rem"
              p="3% 5%"
              color="white"
              _hover={{}}
              onClick={getUserDetails}
            >
              Proceed
            </Button>
          </Flex>
          <Divider m="2% auto 5%" border="1px solid #BCBCBC" w="80%" />
          <DrawerHeader
            textAlign="center"
            fontSize={{ md: '2rem', base: '1.6rem' }}
            color="#A15942"
          >{`Available ${userOrder.service}s Nearby`}</DrawerHeader>

          <DrawerBody>
            {providers.length > 0 ? (
              providers.map((worker) => (
                <ShowProviders
                  key={worker.ID}
                  name={worker.Name}
                  time={worker.Timings}
                  service={worker.Services}
                />
              ))
            ) : (
              <Text>
                Sorry at that moment no one is available but we will make
                adjustment for you please proceed.
              </Text>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Modal
        isOpen={isNameOpen}
        onClose={onNameClose}
        isCentered
        size={{ md: 'lg', base: 'xs' }}
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent borderRadius="30px" bg="#FFFFE9">
          <ModalHeader bg="#FFED9B" pb="0px" borderRadius="30px">
            <Flex alignItems="center" justifyContent="space-between">
              <Heading size={{ md: 'xl', base: 'lg' }} color="#a15942" p="5%">
                Enter Your Name
              </Heading>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
              }}
              onSubmit={(values, actions) => {
                localStorage.setItem(
                  'name',
                  `${values.firstName} ${values.lastName}`
                );
                actions.setSubmitting(false);
                if (
                  history[0]?.user_address ||
                  localStorage.getItem('address')
                ) {
                  setChange(!changed);
                  onConfirmOpen();
                  onNameClose();
                } else {
                  console.log('yaay');
                  onAddressOpen();
                  onNameClose();
                }
                // onOpen();
              }}
            >
              {(props) => (
                <Form>
                  <Flex flexDirection={{ base: 'column', md: 'row' }}>
                    <Field name="firstName" validate={validateFirstName}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.firstName && form.touched.firstName
                          }
                          my="2%"
                        >
                          <FormLabel>First Name</FormLabel>
                          <Input
                            type="text"
                            placeholder="e.g. Vijay"
                            {...field}
                            borderRadius="20px"
                            bg="white"
                            w="90%"
                          />
                          <FormErrorMessage>
                            {form.errors.firstName}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="lastName" validate={validateFirstName}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.lastName && form.touched.lastName
                          }
                          my="2%"
                        >
                          <FormLabel>Last Name</FormLabel>
                          <Input
                            type="text"
                            {...field}
                            placeholder="e.g. Sharma"
                            borderRadius="20px"
                            bg="white"
                            w="90%"
                          />
                          <FormErrorMessage>
                            {form.errors.lastName}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                  <Button
                    mt={4}
                    bg="#A15942"
                    color="white"
                    isLoading={props.isSubmitting}
                    borderRadius="20px"
                    type="submit"
                    display="block"
                    margin="5% auto"
                  >
                    Proceed
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isAddressOpen}
        onClose={onAddressClose}
        isCentered
        size={{ md: 'lg', base: 'xs' }}
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent borderRadius="30px" bg="#FFFFE9">
          <ModalHeader bg="#FFED9B" pb="0px" borderRadius="30px">
            <Flex alignItems="center" justifyContent="space-between">
              <Heading size={{ md: 'xl', base: 'lg' }} color="#a15942" p="5%">
                Enter Your Address
              </Heading>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                flatDetails: '',
                address: '',
                landmark: '',
                pincode: '',
              }}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  localStorage.setItem(
                    'address',
                    `${values.flatDetails} ${values.address} ${values.landmark} ${values.pincode}`
                  );

                  actions.setSubmitting(false);
                  if (history[0]?.user_address) {
                    setChange(!changed);
                  }
                  setChange(!changed);
                  onConfirmOpen();
                  onAddressClose();
                }, 1000);
              }}
            >
              {(props) => (
                <Form>
                  <Flex flexDirection={{ base: 'column', md: 'row' }}>
                    <Field name="flatDetails">
                      {({ field, form }) => (
                        <FormControl my="2%">
                          <FormLabel>Flat Details / House Number</FormLabel>
                          <Input
                            type="text"
                            placeholder="e.g. 304"
                            {...field}
                            borderRadius="20px"
                            bg="white"
                            w="90%"
                          />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="address" validate={validateFirstName}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.address && form.touched.address
                          }
                          my="2%"
                        >
                          <FormLabel>Address</FormLabel>
                          <Input
                            type="text"
                            {...field}
                            placeholder="e.g. Ananth Nagar, Phase 1, Electronic City, Bengaluru, Karnataka"
                            borderRadius="20px"
                            bg="white"
                            w="90%"
                          />
                          <FormErrorMessage>
                            {form.errors.address}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                  <Flex flexDirection={{ base: 'column', md: 'row' }}>
                    <Field name="landmark">
                      {({ field, form }) => (
                        <FormControl my="2%">
                          <FormLabel>Landmark</FormLabel>
                          <Input
                            type="text"
                            placeholder="e.g. Behind Vishal Megha Mart"
                            {...field}
                            borderRadius="20px"
                            bg="white"
                            w="90%"
                          />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="pincode">
                      {({ field, form }) => (
                        <FormControl my="2%">
                          <FormLabel>PIN Code</FormLabel>
                          <Input
                            type="number"
                            {...field}
                            placeholder="e.g. 560100"
                            borderRadius="20px"
                            bg="white"
                            w="90%"
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                  <Button
                    mt={4}
                    bg="#A15942"
                    color="white"
                    isLoading={props.isSubmitting}
                    borderRadius="20px"
                    type="submit"
                    display="block"
                    margin="5% auto"
                  >
                    Proceed
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
      <ConfirmDetails
        isConfirmOpen={isConfirmOpen}
        onConfirmClose={onConfirmClose}
        history={history}
        onNameOpen={onNameOpen}
        onAddressOpen={onAddressOpen}
        change={changed}
        onAvailableClose={onAvailableClose}
      />
      <Footer />
    </>
  );
};

export default Profile;
