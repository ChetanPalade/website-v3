import Footer from '@/components/Footer';
import Header from '@/components/Header';
import RadioCard from '@/components/RadioCard';
import { ProviderContext } from '@/context/StoreContext';
import { keyframes } from "@chakra-ui/react";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Img,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  useRadioGroup,
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { Form, Formik, Field } from 'formik';
import { useContext, useEffect, useState } from 'react';
import maidData from '../../context/prices.json';
import Login from '@/components/Login';
import { useRouter } from 'next/router';
const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: 'none',
    width: '90%',
  }),
};
const scaleAnimation = keyframes`
from {
  transform: scale(1);
}
to {
  transform: scale(1.1);
}
`;
const slideFromTop = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Maid = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onLoginOpen } = useContext(ProviderContext);
  const {
    price,
    setPrice,
    isAuth,
    onAvailableOpen,
    areaSuggestion,
    societySuggestion,
    isMobile,
  } = useContext(ProviderContext);
  const router = useRouter();

  const [planType, setPlanType] = useState('One Time');
  const [enteredDate, setEnteredDate] = useState('');
  const getCurrentDate = () => {
    const unixTimestamp = Date.now();
    const date = new Date(unixTimestamp);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };
  const timeOptions = [
    { value: '07:00:00', label: '07:00 AM' },
    { value: '07:30:00', label: '07:30 AM' },
    { value: '08:00:00', label: '08:00 AM' },
    { value: '08:30:00', label: '08:30 AM' },
    { value: '09:00:00', label: '09:00 AM' },
    { value: '09:30:00', label: '09:30 AM' },
    { value: '10:00:00', label: '10:00 AM' },
    { value: '10:30:00', label: '10:30 AM' },
    { value: '11:00:00', label: '11:00 AM' },
    { value: '11:30:00', label: '11:30 AM' },
    { value: '12:00:00', label: '12:00 PM' },
    { value: '12:30:00', label: '12:30 PM' },
    { value: '13:00:00', label: '01:00 PM' },
    { value: '13:30:00', label: '01:30 PM' },
    { value: '14:00:00', label: '02:00 PM' },
    { value: '14:30:00', label: '02:30 PM' },
    { value: '15:00:00', label: '03:00 PM' },
    { value: '15:30:00', label: '03:30 PM' },
    { value: '16:00:00', label: '04:00 PM' },
    { value: '16:30:00', label: '04:30 PM' },
    { value: '17:00:00', label: '05:00 PM' },
    { value: '17:30:00', label: '05:30 PM' },
    { value: '18:00:00', label: '06:00 PM' },
    { value: '18:30:00', label: '06:30 PM' },
    { value: '19:00:00', label: '07:00 PM' },
    { value: '19:30:00', label: '07:30 PM' },
    { value: '20:00:00', label: '08:00 PM' },
    { value: '20:30:00', label: '08:30 PM' },
    { value: '21:00:00', label: '09:00 PM' },
    { value: '21:30:00', label: '09:30 PM' },
    { value: '22:00:00', label: '10:00 PM' },
    { value: '22:30:00', label: '10:30 PM' },
    { value: '23:00:00', label: '11:00 PM' },
    { value: '23:30:00', label: '11:30 PM' },
  ];
  const preference = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' },
  ];
  const langOptions = [
    { value: 'English', label: 'English' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Kannada', label: 'Kannada' },
    { value: 'Marathi', label: 'Marathi' },
    { value: 'Telugu', label: 'Telugu' },
    { value: 'Punjabi', label: 'Punjabi' },
  ];
  const options = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK'];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'house size',
    defaultValue: '1 BHK',
    onChange: (value) => {
      const newValue = maidData['Maid'][planType][value];
      setPrice(newValue * (planType == 'One Time' ? 1.2 : 1.5));
      const previous = JSON.parse(localStorage.getItem('user'));
      const newData = { ...previous, houseSize: value };
      localStorage.setItem('user', JSON.stringify(newData));
    },
  });

  const group = getRootProps();
  function validateStartDate(value) {
    const formattedDate = getCurrentDate();
    setEnteredDate(value);
    let error;
    if (!value) {
      error = 'Start Date is required';
    } else if (value.toLowerCase() < formattedDate) {
      error = 'Please Enter a valid start date';
    }
    return error;
  }
  function validateArea(value) {
    let error;
    if (!value) {
      error = 'Location is required';
    }
    return error;
  }

  function validateStartTime(value) {
    const currentTime = new Date();
    const enteredTime = new Date(`${enteredDate} ${value.value}`);
    let error;
    if (!value) {
      error = 'Start Time is required';
    } else if (enteredTime < currentTime) {
      error = 'Please Enter a valid Start Time';
    }
    return error;
  }

  const proceedtoConfirmation = () => {
    localStorage.setItem('price', price);
    if (isAuth) {
      router.push('/checkout');
    } else {
      onLoginOpen();
    }
    onClose();
  };
 

  return (
    <>
      <Header />
      <Flex
        pt={{ md: '20vh', base: '10vh' }}
        bgGradient="linear(to-br, #FFF1D0, #FFFFFF)"
        justifyContent="space-around"
        alignItems={'flex-start'}
        px={{ md: '10%', base: '0' }}
      >
        <Box position="relative" w={{ md: '55%', base: '100%' }}>
          {!isMobile ? (
            <Heading color="#A15942" size="3xl" p="5%">
              Book a Maid
            </Heading>
          ) : (
            <>
              <Img src="images/maidMobile.webp" alt="maidBook" />
              <Heading
                position="absolute"
                top="10%"
                left="15%"
                bg="rgba(255,255,255,0.5)"
                backdropFilter={'blur("10px")'}
                borderRadius="20px"
                color="black"
                size="2xl"
                p="5%"
              >
                Book a Maid
              </Heading>
            </>
          )}

          <Box
            bg="#FFED9B"
            p="5%"
            borderRadius={{ md: '30px', base: '0 0 30px 30px' }}
            my={{ md: '5%' }}
            mb="10%"
          >
            <Formik
              initialValues={{
                service: 'Maid',
                startDate: '',
                startTime: '',
                plan: 'One Time',
                location: 'Society',
                region: '',
                specificPreference: { value: false, label: 'No' },
                message: '',
                serviceType: '',
              }}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  localStorage.setItem('user', JSON.stringify(values, null, 2));
                  setPlanType(values.plan);
                  setPrice(
                    maidData['Maid'][values.plan]['1 BHK'] *
                      (values.plan == 'One Time' ? 1.2 : 1.5)
                  );
                  actions.setSubmitting(false);
                  onOpen();
                }, 1000);
              }}
            >
              {(props) => (
                <Form>
                  <Heading py="2%" size="sm">
                    Service Details
                  </Heading>
                  <Text pb="2%">Please tell us your Requirements</Text>
                  <Divider border="1px solid white" mb="2%" />
                  <Flex flexDirection={{ md: 'row', base: 'column' }}>
                    <Field name="startDate" validate={validateStartDate}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.startDate && form.touched.startDate
                          }
                          my="2%"
                        >
                          <Flex alignItems="center">
                            <FormLabel>Select Start Date</FormLabel>
                            <Text color="red" fontSize="1.5rem">
                              *
                            </Text>
                          </Flex>
                          <Input
                            type="date"
                            min={getCurrentDate()}
                            {...field}
                            borderRadius="20px"
                            bg="white"
                            w="90%"
                          />
                          <FormErrorMessage>
                            {form.errors.startDate}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="startTime" validate={validateStartTime}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.startTime && form.touched.startTime
                          }
                          my="2%"
                        >
                          <Flex alignItems="center">
                            <FormLabel>Select Start Time</FormLabel>
                            <Text color="red" fontSize="1.5rem">
                              *
                            </Text>
                          </Flex>
                          <Select
                            useBasicStyles
                            {...field}
                            options={timeOptions}
                            placeholder="Choose Start Time"
                            chakraStyles={customStyles}
                            onChange={(value) =>
                              form.setFieldValue(field.name, value)
                            }
                            closeMenuOnSelect={true}
                          />
                          <FormErrorMessage>
                            {form.errors.startTime}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>

                  <Flex flexDirection={{ base: 'column', md: 'row' }}>
                    <Box
                      w="100%"
                      display="flex"
                      flexDirection={{ md: 'column', base: 'column-reverse' }}
                    >
                      <Flex
                        role="group"
                        aria-labelledby="my-radio-group"
                        gap="1rem"
                        m="5%"
                      >
                        <FormLabel
                          display="flex"
                          alignItems="center"
                          gap="1rem"
                        >
                          <Field type="radio" name="location" value="Society" />
                          Society
                        </FormLabel>
                        <FormLabel
                          display="flex"
                          alignItems="center"
                          gap="1rem"
                        >
                          <Field type="radio" name="location" value="Area" />
                          Area
                        </FormLabel>
                      </Flex>
                      <Flex
                        role="group"
                        aria-labelledby="my-radio-group"
                        gap="1rem"
                        m="5%"
                      >
                        <FormLabel
                          display="flex"
                          alignItems="center"
                          gap="1rem"
                        >
                          <Field type="radio" name="plan" value="One Time" />
                          One Time
                        </FormLabel>
                        <FormLabel
                          display="flex"
                          alignItems="center"
                          gap="1rem"
                        >
                          <Field type="radio" name="plan" value="Monthly" />
                          Monthly
                        </FormLabel>
                      </Flex>
                    </Box>
                    <Field name="region" validate={validateArea}>
                      {({ field, form }) => (
                        <FormControl
                          my="2%"
                          isInvalid={form.errors.region && form.touched.region}
                        >
                          <Select
                            useBasicStyles
                            {...field}
                            options={
                              form.values.location == 'Society'
                                ? societySuggestion
                                : areaSuggestion
                            }
                            placeholder={`Enter your ${form.values.location}`}
                            chakraStyles={customStyles}
                            onChange={(value) =>
                              form.setFieldValue(field.name, value)
                            }
                            closeMenuOnSelect={true}
                          />
                          <FormErrorMessage>
                            {form.errors.region}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                  <Flex flexDirection={{ md: 'row', base: 'column' }}>
                  <Box w="100%">
                    <Field name="specificPreference">
                      {({ field, form }) => (
                        <FormControl my="2%">
                          <FormLabel>Any Specific Preference</FormLabel>
                          <Select
                            useBasicStyles
                            {...field}
                            options={preference}
                            placeholder="Enter your Preference"
                            chakraStyles={customStyles}
                            onChange={(value) => form.setFieldValue(field.name, value)}
                            closeMenuOnSelect={true}
                          />
                        </FormControl>
                      )}
                    </Field>
                    <Flex flexDirection={{ md: 'row', base: 'column' }}>
                    <Field name="languages">
                      {({ field, form }) => (
                        <FormControl my="2%">
                          <FormLabel>Known Languages</FormLabel>
                          <Select
                            isMulti
                            {...field}
                            options={langOptions}
                            placeholder="Prefered Language"
                            chakraStyles={customStyles}
                            onChange={(value) =>
                              form.setFieldValue(field.name, value)
                            }
                            closeMenuOnSelect={false}
                            hideSelectedOptions={true}
                          />
                        </FormControl>
                      )}
                    </Field>
                    </Flex>
                    <Field name="message">
                      {({ field, form }) => (
                        <FormControl my="5%">
                          <Textarea
                            isDisabled={
                              !JSON.parse(form.values.specificPreference.value)
                            }
                            placeholder="Please Mention here"
                            {...field}
                            borderRadius="20px"
                            bg="white"
                            w="90%"
                          />
                        </FormControl>
                      )}
                      </Field>
                    </Box>
                    <FormControl my="2%">
                      <FormLabel>Services : </FormLabel>
                      <Flex direction="column" pl="20%">
                        <FormLabel
                          display="flex"
                          alignItems="center"
                          gap="1rem"
                        >
                          <Field
                            type="checkbox"
                            name="serviceType"
                            value="Sweeping"
                          />
                          Sweeping
                        </FormLabel>
                        <FormLabel
                          display="flex"
                          alignItems="center"
                          gap="1rem"
                        >
                          <Field
                            type="checkbox"
                            name="serviceType"
                            value="Mopping"
                          />
                          Mopping
                        </FormLabel>
                        <FormLabel
                          display="flex"
                          alignItems="center"
                          gap="1rem"
                        >
                          <Field
                            type="checkbox"
                            name="serviceType"
                            value="Washroom Cleaning"
                          />
                          Washroom Cleaning
                        </FormLabel>
                        <FormLabel
                          display="flex"
                          alignItems="center"
                          gap="1rem"
                        >
                          <Field
                            type="checkbox"
                            name="serviceType"
                            value="Utensils Cleaning"
                          />
                          Utensils Cleaning
                        </FormLabel>
                      </Flex>
                    </FormControl>
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
                    _hover={{}}
                  >
                    Proceed
                  </Button>
                  <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                    isCentered
                    size={{ md: 'lg', base: 'xs' }}
                    preserveScrollBarGap
                  >
                    <ModalOverlay />
                    <ModalContent bg="#FFFFE9" borderRadius="30px">
                      <ModalHeader>
                        Estimated ₹ {price} {planType == 'Monthly' && '/month'}
                      </ModalHeader>
                      <ModalCloseButton />
                      <ModalBody pb="5%">
                        <Heading size="md" my="5%">
                          Select your house size
                        </Heading>
                        <HStack {...group}>
                          {options.map((value) => {
                            const radio = getRadioProps({ value });
                            return (
                              <RadioCard key={value} {...radio}>
                                {value}
                              </RadioCard>
                            );
                          })}
                        </HStack>
                        <Button
                          bg="#A15942"
                          color="white"
                          borderRadius="20px"
                          type="submit"
                          display="block"
                          margin="auto"
                          mt="8%"
                          _hover={{}}
                          onClick={proceedtoConfirmation}
                        >
                          Proceed
                        </Button>
                      </ModalBody>
                    </ModalContent>
                  </Modal>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
        {/* <Img
          display={{ base: 'none', md: 'block' }}
          borderRadius="50%"
          w="45%"
          pd="3px"
          src="images/maid3.jpg"
          alt="maid booking"
        /> */}
            
        <Img
          display={{ base: 'none', md: 'block' }}
          borderRadius="50%"
          w="50%"
          h="60vh"
          bg="transparent" 
          src="images/maidw.png"
          alt="maid booking"
          animation={`${slideFromTop} 1s ease-out`}
          _hover={{
            animation: `${scaleAnimation} 0.5s ease-in-out forwards`,
          }}
        />

      </Flex>
      

      <Footer />
    </>
  );
};

export default Maid;
