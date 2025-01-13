import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Img,
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
import { useRouter } from 'next/router';

const Footer = () => {
  const router = useRouter();
  const {
    onOpen: onPayOpen,
    onClose: onPayClose,
    isOpen: isPayOpen,
  } = useDisclosure();
  return (
    <Box id="contact" bg="black" p="2%">
      <Flex flexDirection={{ md: 'row', base: 'column' }}>
        <Box flex={1} w={{ base: '90%', md: '' }} m="auto">
          <Flex
            justifyContent="space-between"
            alignItems="center"
            flexDirection={{ base: 'column', md: 'row' }}
          >
            <Flex
              gap="1rem"
              alignItems="center"
              py="5%"
              mb={{ base: '10%', md: '0' }}
            >
              <Img src="images/logo.webp" alt="logo" w="4rem" />
              <Heading
                bgGradient="linear(to-b, #FF9918, #F9FF22)"
                bgClip="text"
              >
                YellowSense
              </Heading>
            </Flex>
            <Button
              mb={{ base: '10%', md: '0' }}
              mt={{ base: '-5%', md: '0' }}
              borderRadius="20px"
              bg="#AD6A4D"
              color="white"
              _hover={{}}
              onClick={onPayOpen}
            >
              Donate
            </Button>
            <Modal
              isOpen={isPayOpen}
              onClose={onPayClose}
              isCentered
              size={{ md: 'lg', base: 'xs' }}
              preserveScrollBarGap
            >
              <ModalOverlay />
              <ModalContent borderRadius="30px" bg="#FFFFE9">
                <ModalHeader bg="#FFED9B" pb="0px" borderRadius="30px">
                  <Flex alignItems="center" justifyContent="space-between">
                    <Heading size="xl" color="white" p="5%">
                      Scan Here
                    </Heading>
                  </Flex>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Img src="images/pay.webp" />
                </ModalBody>
              </ModalContent>
            </Modal>
          </Flex>
          <Flex
            gap="2rem"
            flexDirection={{ md: 'row', base: 'column' }}
            textAlign={{ base: 'center', md: 'left' }}
            mb={{ base: '10%', md: '0' }}
          >
            <Heading size="sm" color="white">
              CIN : U-62099-KA-2023-PTC-174648
            </Heading>
            <Heading size="sm" color="white">
              {' '}
              PAN : AABCY6908P
            </Heading>
            <Heading size="sm" color="white">
              TAN : BLRY02955B
            </Heading>
          </Flex>
          <Flex
            gap="2rem"
            py="4%"
            flexDirection={{ md: 'row', base: 'column' }}
            alignItems="center"
            textAlign={{ base: 'center', md: 'left' }}
          >
            <Heading size="sm" color="white">
              Startup India - DP - IIT: DIPP – 138 388
            </Heading>
            <Heading size="sm" color="white">
              {' '}
              MSME Udyog Aadhaar : UDYAM-KR-03-0293956
            </Heading>
            <Img
              w="200px"
              boxShadow="white 0px 5px 15px"
              cursor="pointer"
              borderRadius="20px"
              onClick={() =>
                router.push(
                  'https://play.google.com/store/apps/details?id=com.yellowsense'
                )
              }
              src="images/google.svg"
              alt="googlePlay"
            />
          </Flex>
        </Box>
        {/* <Box p="5%">
          <Heading size="sm" color="white" >
            Contact Us
          </Heading>
          <Divider size="sm" color="white" py="5%" width="40%" />
          <Flex py="5%" gap="10%" size="bold" color="white" >
            <Img src="images/basephonetelephone.svg" alt="phone" />
            <Text color="gray">+91 9403890108</Text>
          </Flex>
          <Flex py="5%" gap="10%" size="sm" color="white" >
            <Img src="images/basemail.svg" alt="mail" />
            <Text color="gray">support@yellowsense.in</Text>
          </Flex>
          <Flex py="5%" gap="10%" size="sm" color="white">
            <Img src="images/otherslocaltwo.svg" alt="location" />
            <Text color="gray">Bangalore</Text>
          </Flex> */}
          <Box p="5%">
          <Heading size="md" color="white" fontWeight="bold">
            Contact Us
          </Heading>
          <Divider size="lg" borderColor="white" py="3%" width="50%" />
          <Flex py="5%" gap="10%" alignItems="center">
            <Img src="images/basephonetelephone.svg" alt="phone" />
            <Text color="white" fontWeight="bold" fontSize="lg">
              +91 940-389-0108
            </Text> 
          </Flex>
          <Flex py="5%" gap="10%" alignItems="center">
            <Img src="images/basemail.svg" alt="mail" />
            <Text color="white" fontWeight="bold" fontSize="lg">
              tech@yellowsense.in
            </Text>
          </Flex>
          <Flex py="5%" gap="10%" alignItems="center">
            <Img src="images/otherslocaltwo.svg" alt="location" />
            <Text color="white" fontWeight="bold" fontSize="lg">
              Bangalore
            </Text>
          </Flex>
          <Flex
            justifyContent={{ md: 'space-between', base: 'space-around' }}
            py="5%"
          >
            <Link
              href="https://www.linkedin.com/company/yellowsense-technologies/"
              p={{ md: '5%', base: '2%' }}
              bg="#F8B428"
              borderRadius={{ md: '5px', base: '50%' }}
            >
              <Img w="20px" src="images/linkedin.webp" alt="linkedIn" />
            </Link>
            <Link
              href="https://www.facebook.com/profile.php?id=61550853726573"
              p={{ md: '5%', base: '2%' }}
              bg="#F8B428"
              borderRadius={{ md: '5px', base: '50%' }}
            >
              <Img w="20px" src="images/facebook.webp" alt="facebook" />
            </Link>
            <Link
              href="https://www.youtube.com/@YellowSenseTechnologies"
              p={{ md: '5%', base: '2%' }}
              bg="#F8B428"
              borderRadius={{ md: '5px', base: '50%' }}
            >
              <Img w="20px" src="images/youtube.webp" alt="youtube" />
            </Link>
          </Flex>
        </Box>
      </Flex>
      <Flex
        justifyContent={{ md: 'center', base: 'space-around' }}
        gap="5%"
        flexDirection={{ base: 'column', md: 'row' }}
        alignItems="center"
        color="white"
        mb="2%"
      >
        <Text
          textDecoration="underline"
          cursor="pointer"
          onClick={() => router.push('/refund')}
        >
          Refund Policy
        </Text>
        <Text
          textDecoration="underline"
          cursor="pointer"
          onClick={() => router.push('/terms')}
        >
          Terms & Conditions
        </Text>
        <Text
          textDecoration="underline"
          cursor="pointer"
          onClick={() => router.push('/privacy')}
        >
          Privacy Policy
        </Text>
      </Flex>
      <Text
        fontSize={{ md: '1rem', base: '0.6rem' }}
        color="white"
        textAlign="center"
      >
        All rights reserved @YellowSense Technologies Pvt Ltd
      </Text>
    </Box>
  );
};

export default Footer;
