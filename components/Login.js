import { ProviderContext } from '@/context/StoreContext';
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  getAuth,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import { app } from '@/public/config';
import { setLogLevel } from 'firebase/app';

const Login = () => {
  const {
    onLoginOpen,
    onLoginClose,
    isLoginOpen,
    onAvailableOpen,
    setAuth,
    setLoading,
  } = useContext(ProviderContext);
  const {
    onOpen: onVerifyOpen,
    onClose: onVerifyClose,
    isOpen: isVerifyOpen,
  } = useDisclosure();
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otp, setOtp] = useState('');
  const [recaptchaInitialized, setRecaptchaInitialized] = useState(false);
  const [sentOtp, setSentOtp] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const auth = getAuth(app);

  const initializeRecaptcha = () => {
    if (
      !recaptchaInitialized &&
      typeof document !== 'undefined' &&
      document.getElementById('recaptcha-container')
    ) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        'recaptcha-container',
        {
          size: 'normal',
          callback: (response) => {
            // reCAPTCHA solved
            console.log('good');
            setSentOtp(false);
          },
          'expired-callback': () => {},
        }
      );
      setRecaptchaInitialized(true);
    }
  };
  const requestOTP = async () => {
    initializeRecaptcha();
    try {
      const confirmation = await signInWithPhoneNumber(
        auth,
        `+91${mobileNumber}`,
        window.recaptchaVerifier
      );
      setConfirmationResult(confirmation);
      onVerifyOpen();
      onLoginClose();
      setError(false);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };
  const verifyCode = async (code) => {
    try {
      await confirmationResult.confirm(code);
      localStorage.setItem('phone', mobileNumber);
      sessionStorage.setItem('auth', 'true');
      router.push('/checkout');
      toast({
        title: 'Logged In Successfully',
        position: 'top',
        status: 'success',
        duration: 3000,
      });
      sessionStorage.setItem('auth', 'true');
      setAuth(true);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };
  const handleVerifyClick = () => {
    if (confirmationResult) {
      verifyCode(otp);
    }
    if (localStorage.getItem('user')) {
      onAvailableOpen();
    }
  };
  const handlePinInputChange = (value) => {
    setOtp(value);
  };
  const resendOTP = () => {
    setSentOtp(true);
    initializeRecaptcha();

    signInWithPhoneNumber(auth, `+91${mobileNumber}`, window.recaptchaVerifier)
      .then((confirmationResult) => {
        setConfirmationResult(confirmationResult);
        setError(null);
        console.log('success');
      })
      .catch((error) => {
        setError('Unable to resend code: ' + error.message);
        console.log(error);
      });
  };

  const handleLogin = () => {
    if (
      mobileNumber == '' ||
      mobileNumber.length > 10 ||
      mobileNumber.length < 10
    ) {
      setError(true);
    } else {
      // onVerifyOpen();
      onLoginClose();
      setError(false);
      // setSentOtp(true)
      //  setTimeout(() => {
      //    requestOTP()
      //  }, 3000);
      if (localStorage.getItem('user') && localStorage.getItem('price')) {
        // onAvailableOpen()
      }
      setLoading(true);
      setTimeout(() => {
        localStorage.setItem('phone', mobileNumber);
        sessionStorage.setItem('auth', 'true');
        router.push('/checkout');
        toast({
          title: 'Logged In Successfully',
          position: 'top',
          status: 'success',
          duration: 3000,
        });
        sessionStorage.setItem('auth', 'true');
        setAuth(true);
      }, 2000);
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={isLoginOpen}
        onClose={onLoginClose}
        isCentered
        size={{ md: 'lg', base: 'xs' }}
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent borderRadius="30px" bg="#FFFFE9">
          <ModalHeader bg="#FFED9B" pb="0px" borderRadius="30px">
            <Flex alignItems="center" justifyContent="space-between">
              <Heading size="xl" color="#a15942" p="5%">
                Login
              </Heading>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {error && (
              <Text px="5%" color="red">
                Please Enter A Valid Mobile Number
              </Text>
            )}
            <Flex justifyContent="space-between">
              <InputGroup p="5%">
                <InputLeftAddon borderRadius="30px 0 0 30px">
                  +91
                </InputLeftAddon>
                <Input
                  type="number"
                  bg="white"
                  borderRadius="30px"
                  placeholder="Enter Your Mobile Number"
                  value={mobileNumber}
                  pattern="[1-9]{1}[0-9]{9}"
                  onChange={(event) => setMobileNumber(event.target.value)}
                />
              </InputGroup>
            </Flex>
            <Button
              bg="#A15942"
              color="white"
              borderRadius="20px"
              type="submit"
              display="block"
              margin="auto"
              my="5%"
              _hover={{}}
              onClick={handleLogin}
              id="sign"
            >
              Proceed
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isVerifyOpen}
        onClose={onVerifyClose}
        isCentered
        size="lg"
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent borderRadius="30px" bg="#FFFFE9">
          <ModalHeader bg="#FFED9B" pb="0px" borderRadius="30px">
            <Text
              fontSize={'1rem'}
              cursor="pointer"
              onClick={() => {
                onLoginOpen();
                onVerifyClose();
              }}
            >
              Edit Number
            </Text>
            <Flex alignItems="center" justifyContent="space-between">
              <Heading size="xl" color="#a15942" p="5%">
                Verification Code
              </Heading>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mx="5%" fontWeight={700}>
              We have sent you a code on +91 {mobileNumber}
            </Text>
            {sentOtp && <Box id="recaptcha-container" m="auto"></Box>}
            <Flex justifyContent="space-between">
              <HStack m="5%">
                <PinInput otp onChange={handlePinInputChange}>
                  <PinInputField bg="white" borderRadius={'30px'} />
                  <PinInputField bg="white" borderRadius={'30px'} />
                  <PinInputField bg="white" borderRadius={'30px'} />
                  <PinInputField bg="white" borderRadius={'30px'} />
                  <PinInputField bg="white" borderRadius={'30px'} />
                  <PinInputField bg="white" borderRadius={'30px'} />
                </PinInput>
              </HStack>
            </Flex>
            <Flex alignItems="center" justifyContent="space-between">
              <Text
                cursor="pointer"
                fontWeight="700"
                color="#A15942"
                onClick={resendOTP}
              >
                Resend Code
              </Text>
              <Button
                bg="#A15942"
                color="white"
                borderRadius="20px"
                type="submit"
                display="block"
                px="5%"
                mb="5%"
                _hover={{}}
                onClick={handleVerifyClick}
              >
                Verify
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Login;
