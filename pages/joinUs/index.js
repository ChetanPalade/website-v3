import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ProviderContext } from '@/context/StoreContext';
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Img,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: 'none',
    width: '90%',
  }),
};

const Join = () => {
  useEffect(() => {
    setJoin(true);
    return () => {
      setJoin(false);
    };
  }, []);
  const {
    setJoin,
    onThanksOpen,
    areaSuggestion,
    societySuggestion,
    setLoading,
    isMobile,
  } = useContext(ProviderContext);
  const router = useRouter();
  function validateField(value) {
    let error;
    if (!value) {
      error = 'It is required';
    }
    return error;
  }
  const timeOptions = [
    { value: '07:00', label: '07:00 AM' },
    { value: '07:30', label: '07:30 AM' },
    { value: '08:00', label: '08:00 AM' },
    { value: '08:30', label: '08:30 AM' },
    { value: '09:00', label: '09:00 AM' },
    { value: '09:30', label: '09:30 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '10:30', label: '10:30 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '11:30', label: '11:30 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '12:30', label: '12:30 PM' },
    { value: '13:00', label: '01:00 PM' },
    { value: '13:30', label: '01:30 PM' },
    { value: '14:00', label: '02:00 PM' },
    { value: '14:30', label: '02:30 PM' },
    { value: '15:00', label: '03:00 PM' },
    { value: '15:30', label: '03:30 PM' },
    { value: '16:00', label: '04:00 PM' },
    { value: '16:30', label: '04:30 PM' },
    { value: '17:00', label: '05:00 PM' },
    { value: '17:30', label: '05:30 PM' },
    { value: '18:00', label: '06:00 PM' },
    { value: '18:30', label: '06:30 PM' },
    { value: '19:00', label: '07:00 PM' },
    { value: '19:30', label: '07:30 PM' },
    { value: '20:00', label: '08:00 PM' },
    { value: '20:30', label: '08:30 PM' },
    { value: '21:00', label: '09:00 PM' },
    { value: '21:30', label: '09:30 PM' },
    { value: '22:00', label: '10:00 PM' },
    { value: '22:30', label: '10:30 PM' },
    { value: '23:00', label: '11:00 PM' },
    { value: '23:30', label: '11:30 PM' },
  ];
  const langOptions = [
    { value: 'Hindi', label: 'Hindi' },
    { value: 'English', label: 'English' },
    { value: 'Kannada', label: 'Kannada' },
    { value: 'Bengali', label: 'Bengali' },
    { value: 'Telugu', label: 'Telugu' },
    { value: 'Tamil', label: 'Tamil' },
    { value: 'Malayalam', label: 'Malayalam' },
  ];
  const serviceOptions = [
    { value: 'Maid', label: 'Maid' },
    { value: 'Cook', label: 'Cook' },
    { value: 'Nanny', label: 'Nanny' },
  ];
  const postServiceProvider = async (
    adhaar,
    name,
    mobile,
    gender,
    services,
    location,
    area,
    timing,
    language
  ) => {
    setLoading(true);
    try {
      const data = {
        AadharNumber: adhaar,
        Name: name,
        PhoneNumber: mobile,
        Gender: gender,
        Services: services,
        Locations: location == 'Area' ? '' : area,
        Region: location == 'Area' ? area : '',
        Timings: timing,
        languages: language,
      };
      console.log(data);
      console.log('Waqi1');
      const response = await fetch(
        'https://yellowsensebackendapi.azurewebsites.net/insert_maid',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      console.log('Waqi2');
      const res = await response.json();
      console.log(res);
      console.log('Waqi3');
      setLoading(false);
      router.push('/');
      onThanksOpen();
      console.log('Waqi4');
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  return (
    <>
      <Header />
      <Flex position="relative" bgGradient="linear(to-br, #FFF1D0, #FFFFFF)">
        <Box
          w={{ md: '60%', base: '100%' }}
          pt={{ md: '20vh', base: '10vh' }}
          m={{ md: 'auto' }}
        >
          {!isMobile ? (
            <Heading color="#A15942" size="3xl" p="3%" textAlign="center">
              Work with Us
            </Heading>
          ) : (
            <>
              <Img src="images/joinMobile.webp" alt="maidBook" />
              <Heading
                position="absolute"
                top="10%"
                left="22%"
                bg="rgba(255,255,255,0.5)"
                backdropFilter={'blur("10px")'}
                borderRadius="20px"
                color="black"
                size="2xl"
                p="5%"
              >
                Join Us
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
                name: '',
                adhaar: '',
                mobile: '',
                gender: 'Female',
                startTime: '',
                endTime: '',
                location: 'Society',
                region: '',
                languages: '',
                service: '',
              }}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  //   localStorage.setItem("user", JSON.stringify(values, null, 2))
                  //   setPlanType(values.plan)
                  //   setPrice(maidData["Maid"][values.plan]["1 BHK"]*(values.plan=="One Time"?1.2:1.3)
                  actions.setSubmitting(false);
                  const comfortableLoc = values?.region.map((reg) => reg.label);
                  const servicesProvide = values?.service.map(
                    (work) => work.label
                  );
                  const prefLang = values?.languages.map((lang) => lang.label);
                  postServiceProvider(
                    values.adhaar,
                    values.name,
                    values.mobile,
                    values.gender,
                    servicesProvide.join(),
                    values.location,
                    comfortableLoc.join(),
                    `${values.startTime.label}-${values.endTime.label}`,
                    prefLang.join()
                  );
                  // console.log(values.adhaar, values.name, values.mobile, values.gender, servicesProvide.join(), values.location, comfortableLoc.join(), `${values.startTime.label}-${values.endTime.label}`, prefLang.join() )

                  // router.push("/");
                  // onThanksOpen();
                  //   onOpen();
                }, 1000);
              }}
            >
              {(props) => (
                <Form>
                  <Heading py="2%" size="sm">
                    Service Details
                  </Heading>
                  <Text pb="2%">Get Work / Job of desired service</Text>
                  <Divider border="1px solid white" mb="2%" />
                  <Flex flexDirection={{ md: 'row', base: 'column' }}>
                    <Field name="name" validate={validateField}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.name && form.touched.name}
                          my="2%"
                        >
                          <Flex alignItems="center">
                            <FormLabel>Name </FormLabel>
                            <Text color="red" fontSize="1.5rem">
                              *
                            </Text>
                          </Flex>
                          <Input
                            type="text"
                            placeholder="Enter your name"
                            {...field}
                            borderRadius="20px"
                            bg="white"
                            w="90%"
                          />
                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="adhaar" validate={validateField}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.adhaar && form.touched.adhaar}
                          my="2%"
                        >
                          <Flex alignItems="center">
                            <FormLabel>Aadhaar Number</FormLabel>
                            <Text color="red" fontSize="1.5rem">
                              *
                            </Text>
                          </Flex>
                          <Input
                            type="number"
                            placeholder="Enter your Aadhaar Number"
                            {...field}
                            borderRadius="20px"
                            bg="white"
                            w="90%"
                          />
                          <FormErrorMessage>
                            {form.errors.adhaar}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                  <Flex
                    justifyContent="space-between"
                    flexDirection={{ md: 'row', base: 'column-reverse' }}
                  >
                    <Flex
                      role="group"
                      aria-labelledby="my-radio-group"
                      gap="1rem"
                      m="2.5%"
                    >
                      <FormLabel display="flex" alignItems="center" gap="1rem">
                        <Field type="radio" name="gender" value="Female" />
                        Female
                      </FormLabel>
                      <FormLabel display="flex" alignItems="center" gap="1rem">
                        <Field type="radio" name="gender" value="Male" />
                        Male
                      </FormLabel>
                    </Flex>
                    <Field name="mobile" validate={validateField}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.mobile && form.touched.mobile}
                          my="2%"
                          w={{ md: '50%' }}
                        >
                          <Flex alignItems="center">
                            <FormLabel>Contact</FormLabel>
                            <Text color="red" fontSize="1.5rem">
                              *
                            </Text>
                          </Flex>
                          <Input
                            type="number"
                            placeholder="Enter Phone Number"
                            {...field}
                            borderRadius="20px"
                            bg="white"
                            w="90%"
                          />
                          <FormErrorMessage>
                            {form.errors.mobile}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>

                  <Flex flexDirection={{ md: 'row', base: 'column' }}>
                    <Box w="100%">
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
                    </Box>
                    <Field name="region" validate={validateField}>
                      {({ field, form }) => (
                        <FormControl
                          my="2%"
                          isInvalid={form.errors.region && form.touched.region}
                        >
                          <Select
                            isMulti
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
                            hideSelectedOptions={true}
                          />
                          <FormErrorMessage>
                            {form.errors.region}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                  <Flex flexDirection={{ md: 'row', base: 'column' }}>
                    <Field name="startTime" validate={validateField}>
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
                    <Field name="endTime" validate={validateField}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.endTime && form.touched.endTime
                          }
                          my="2%"
                        >
                          <Flex alignItems="center">
                            <FormLabel>Select End Time</FormLabel>
                            <Text color="red" fontSize="1.5rem">
                              *
                            </Text>
                          </Flex>
                          <Select
                            useBasicStyles
                            {...field}
                            options={timeOptions}
                            placeholder="Choose End Time"
                            chakraStyles={customStyles}
                            onChange={(value) =>
                              form.setFieldValue(field.name, value)
                            }
                            closeMenuOnSelect={true}
                          />
                          <FormErrorMessage>
                            {form.errors.endTime}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                  <Flex flexDirection={{ md: 'row', base: 'column' }}>
                    <Field name="languages">
                      {({ field, form }) => (
                        <FormControl my="2%">
                          <FormLabel>Known Languages</FormLabel>
                          <Select
                            isMulti
                            {...field}
                            options={langOptions}
                            placeholder="Languages you Know"
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
                    <Field name="service" validate={validateField}>
                      {({ field, form }) => (
                        <FormControl
                          my="2%"
                          isInvalid={
                            form.errors.service && form.touched.service
                          }
                        >
                          <Flex alignItems="center">
                            <FormLabel>Services</FormLabel>
                            <Text color="red" fontSize="1.5rem">
                              *
                            </Text>
                          </Flex>  
                          <Select
                            isMulti
                            {...field}
                            options={serviceOptions}
                            placeholder="Services you Provide"
                            chakraStyles={customStyles}
                            onChange={(value) =>
                              form.setFieldValue(field.name, value)
                            }
                            closeMenuOnSelect={false}
                            hideSelectedOptions={true}
                          />
                          <FormErrorMessage>
                            {form.errors.service}
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
                    _hover={{}}
                  >
                    Proceed
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
        {!isMobile && (
          <Img
            position="absolute"
            right="0"
            top={{ md: '15%', base: '13%' }}
            w="35%"
            borderRadius="0 0 0 40%"
            src="images/maidsug.webp"
            alt="maid"
          />
        )}
        <Img
          position="absolute"
          bottom="0"
          borderRadius="0 70% 0 0"
          w="32%"
          src="/images/cooksug.webp"
          alt="cook"
        />
        <Img
          position="absolute"
          bottom="0"
          right="0"
          w="29%"
          src="/images/nannysug.webp"
          alt="nanny"
        />
      </Flex>
      <Footer />
    </>
  );
};

export default Join;
