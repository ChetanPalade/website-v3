import ConfirmDetails from '@/components/ConfirmDetails';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Order from '@/components/Order';
import { ProviderContext } from '@/context/StoreContext';
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
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

const Checkout = () => {
  useEffect(() => {
    if (!isAuth) {
      return;
    } else {
      if (localStorage.getItem('user')) {
        const userData = JSON.parse(localStorage.getItem('user'));
        setUserOrder(JSON.parse(localStorage.getItem('user')));
      }
      if (localStorage.getItem('phone')) {
        getHistory(localStorage.getItem('phone'));
        setPhone(localStorage.getItem('phone'));
      }
      setPrice(localStorage.getItem('price'));
      getUserDetails();
    }
  }, []);

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
  const router = useRouter();
  const getUserDetails = () => {
    if (
      (history && history[0]?.user_name) ||
      (localStorage.getItem('name') && localStorage.getItem('address'))
    ) {
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
          w={{ md: '60%', base: '100%' }}
          bg="#FFED9B"
          borderRadius="30px"
          p={{ md: '2%', base: '5%' }}
          mb={{ md: '5%', base: '10%' }}
        >
          <Text fontSize="1.2rem">Checkout Page</Text>
          <Divider margin="2% 0" border="1px solid #BCBCBC" w="80%" />
          {userOrder?.service ? (
            <Order
              person={userOrder.service}
              location={userOrder.region.value}
              startDate={userOrder.startDate}
              startTime={userOrder.startTime.label}
              price={price}
              action={getUserDetails}
              source="order"
            />
          ) : (
            <Box textAlign="center" p="10%">
              <Text>Hey it's Lonely here</Text>
              <Link href="/maid" color="#A15942" fontWeight="700">
                Book a maid?
              </Link>
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
                  if (
                    history &&
                    history.length > 0 &&
                    history[0]?.user_address
                  ) {
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

export default Checkout;
