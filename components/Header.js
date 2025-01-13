import { ProviderContext } from '@/context/StoreContext';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Img,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Login from './Login';
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import Thanks from './Thanks';
import Loading from './Loading';

const Header = ({ activeSection }) => {
  const toast = useToast();
  const { onLoginOpen, isAuth, setAuth, isJoin, isLoading, isMobile } =
    useContext(ProviderContext);
  const router = useRouter();
  const {
    isOpen: isMenuOpen,
    onClose: onMenuClose,
    onOpen: onMenuOpen,
  } = useDisclosure();

  const {
    onOpen: onPayOpen,
    onClose: onPayClose,
    isOpen: isPayOpen,
  } = useDisclosure();

  const scrollToSection = (sectionId, event) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section?.offsetTop,
        behavior: 'smooth',
      });
    }
  };
  const handleLogOut = () => {
    router.push('/');
    sessionStorage.removeItem('auth');
    localStorage.removeItem('phone');
    localStorage.removeItem('price');
    localStorage.removeItem('name');
    localStorage.removeItem('address');
    sessionStorage.removeItem('auth');
    setAuth(false);
    toast({
      title: `Logged Out Successfully`,
      variant: 'top-accent',
      position: 'top',
      duration: 3000,
    });
  };

  const marqueeAnimation = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

  return (
    <Box>
      <Box
        className="marquee"
        position="fixed"
        top="0"
        left="0"
        w="100%"
        bg="#A15942"
        color="#FEF0CC"
        display="flex"
        overflow="hidden"
        zIndex="1000"
        px={{ base: '1rem', md: '2rem' }}
        lineHeight="1.5"
      >
        <Box
          className="marquee__group"
          display="flex"
          alignItems="center"
          minWidth="100%"
          animation={`${marqueeAnimation} 20s linear infinite`}
          fontSize={{ base: '1.2rem', md: '1.1rem' }}
          whiteSpace="nowrap"
        >
          <Text as="span" mx="0.5rem">
            Driving financial inclusion in India [fin-tech]
          </Text>
          <Text>• AI based maid booking [consumer-tech]</Text>
          <Text as="span" mx="0.5rem">
            available one-time also no commitment needed!
          </Text>
          <Text>&nbsp; &nbsp; contact us: 94038-90108.</Text>
        </Box>
      </Box>
      <Flex
        h={{ md: '15vh', base: '10vh' }}
        borderBottom="10px solid yellow"
        justifyContent={{ md: 'space-around', base: 'space-between' }}
        position="fixed"
        w="100vw"
        bg="white"
        zIndex="3"
        alignItems="center"
        px={{ base: '2%' }}
        mt={{ base: '3vh' }}
      >
        <Flex gap="1rem" alignItems="center" onClick={() => router.push('/')}>
          <Img
            src="images/logo.webp"
            alt="logo"
            w={{ md: '4rem', base: '3rem' }}
            display={{ base: 'none', md: 'block' }}
          />
          <Heading
            bgGradient="linear(to-b, #FF9918, #F9FF22)"
            bgClip="text"
            fontSize={{ md: '2rem', base: '1.5rem' }}
          >
            YellowSense
          </Heading>
        </Flex>

        {!isMobile && (
          <>
            <Flex alignItems="center" w="35%" justifyContent="space-between">
              <Link
                href="/"
                fontWeight="600"
                fontSize="1.1rem"
                _hover={{ textDecoration: 'none', color: '#FF9918' }}
                onClick={(event) => {
                  router.push('/');
                  scrollToSection('home', event);
                }}
                color={activeSection === 'home' ? 'orange' : 'black'}
              >
                Home
              </Link>
              <Link
                href="/"
                fontWeight="600"
                fontSize="1.1rem"
                _hover={{ textDecoration: 'none', color: '#FF9918' }}
                onClick={(event) => scrollToSection('about', event)}
                color={activeSection === 'about' ? 'orange' : 'black'}
              >
                About Us
              </Link>
              <Menu>
                <MenuButton
                  as={Button}
                  bg="transparent"
                  _hover={{}}
                  _active={{}}
                  rightIcon={<ChevronDownIcon />}
                >
                  Products
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <Link
                      href="https://ondc.yellowsense.in/"
                      fontWeight="600"
                      fontSize="1.1rem"
                      _hover={{ textDecoration: 'none', color: '#FF9918' }}
                    >
                      ONDC
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      href="https://melody.yellowsense.in/"
                      fontWeight="600"
                      fontSize="1.1rem"
                      _hover={{ textDecoration: 'none', color: '#FF9918' }}
                    >
                      Melody
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      href="https://ccr.yellowsense.in/"
                      fontWeight="600"
                      fontSize="1.1rem"
                      _hover={{ textDecoration: 'none', color: '#FF9918' }}
                    >
                      CCR-OCEN
                    </Link>
                  </MenuItem>
                </MenuList>
              </Menu>
              <Link
                href="/"
                fontWeight="600"
                fontSize="1.1rem"
                _hover={{ textDecoration: 'none', color: '#FF9918' }}
                onClick={(event) => scrollToSection('contact', event)}
                color={activeSection === 'contact' ? 'orange' : 'black'}
              >
                Contact
              </Link>
              <Button
                mb={{ base: '10%', md: '0' }}
                mt={{ base: '-5%', md: '0' }}
                borderRadius="20px"
                bg="#AD6A4D"
                color="white"
                _hover={{}}
                onClick={onPayOpen}
              >
                Pay Us
              </Button>
            </Flex>
            <Flex gap="10%" alignItems="center">
              {!isJoin && (
                <Link
                  href="/joinUs"
                  fontWeight="600"
                  fontSize="1.1rem"
                  _hover={{ textDecoration: 'none', color: '#FF9918' }}
                  color={activeSection === 'contact' ? 'orange' : 'black'}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  Join Us
                </Link>
              )}
              {isAuth ? (
                <Flex alignItems="center">
                  <Img
                    w="40px"
                    src="images/user.webp"
                    cursor="pointer"
                    onClick={() => router.push('/profile')}
                  />
                  <Menu>
                    <MenuButton
                      as={Button}
                      bg="transparent"
                      _hover={{}}
                      _active={{}}
                    >
                      <ChevronDownIcon
                        bg="black"
                        color="white"
                        fontSize="1.2rem"
                        borderRadius="50%"
                      />
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => router.push('/profile')}>
                        Profile
                      </MenuItem>
                      <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              ) : (
                <Link
                  onClick={onLoginOpen}
                  fontWeight="600"
                  fontSize="1.1rem"
                  _hover={{ textDecoration: 'none', color: '#FF9918' }}
                  color={activeSection === 'contact' ? 'orange' : 'black'}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  Login
                </Link>
              )}
              <Link
                fontSize="1.1rem"
                fontWeight="600"
                href="tel:9403890108"
                ml="5%"
                color={activeSection === 'contact' ? 'orange' : 'black'}
                _hover={{ textDecoration: 'none', color: '#FF9918' }}
                _active={{ backgroundColor: '#D39B84' }}
              >
                <Text>+919403890108</Text>
              </Link>
            </Flex>

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
                    <Heading size="xl" color="#a15942" p="5%">
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
          </>
        )}
        {isMobile && (
          <Flex gap="5px" alignItems="center">
            {!isJoin && (
              <Button
                p="0.5rem 1rem"
                borderRadius="20px"
                bg="#AD6A4D"
                color="white"
                _hover={{}}
                _active={{ backgroundColor: '#D39B84' }}
                onClick={() => router.push('/joinUs')}
              >
                Join Us
              </Button>
            )}
            <Button
              p="0.5rem 1rem"
              borderRadius="20px"
              bg="#AD6A4D"
              color="white"
              _hover={{}}
              _active={{ backgroundColor: '#D39B84' }}
              onClick={() => {
                console.log('Open Pay Modal button clicked');
                onPayOpen();
              }}
              fontSize="0.8rem"
              letterSpacing="1px"
            >
              Pay Us
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
                    <Heading size="xl" color="#a15942" p="5%">
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

            <HamburgerIcon fontSize="1.5rem" onClick={onMenuOpen} />
            <Drawer
              isOpen={isMenuOpen}
              placement="right"
              onClose={onMenuClose}
              size="md"
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>
                  <Flex
                    gap="1rem"
                    alignItems="center"
                    onClick={() => router.push('/')}
                  >
                    <Img
                      src="images/logo.webp"
                      alt="logo"
                      w={{ md: '4rem', base: '3rem' }}
                    />
                    <Heading
                      bgGradient="linear(to-b, #FF9918, #F9FF22)"
                      bgClip="text"
                      fontSize={{ md: '2rem', base: '1.5rem' }}
                    >
                      YellowSense
                    </Heading>
                  </Flex>
                </DrawerHeader>

                <DrawerBody
                  display="flex"
                  flexDirection="column"
                  gap="10%"
                  pt="10%"
                >
                  <Flex alignItems="center" gap="10%" ml="2rem">
                    <Img w="30px" src="images/home.webp" alt="home" />
                    <Link
                      href="/"
                      fontWeight="600"
                      fontSize="1.1rem"
                      _hover={{ textDecoration: 'none', color: '#FF9918' }}
                      onClick={(event) => {
                        router.push('/');
                        scrollToSection('home', event);
                        onMenuClose();
                      }}
                      color={activeSection === 'home' ? 'orange' : 'black'}
                    >
                      Home
                    </Link>
                  </Flex>

                  <Flex alignItems="center" gap="10%" ml="2rem">
                    <Img w="30px" src="images/products.webp" alt="products" />
                    <Menu>
                      <MenuButton
                        as={Button}
                        variant="link"
                        fontSize="1.1rem"
                        fontWeight="600"
                        _hover={{ textDecoration: 'none', color: '#FF9918' }}
                        color="black"
                      >
                        Products
                      </MenuButton>
                      <MenuList>
                        <MenuItem>
                          <Link
                            _hover={{
                              textDecoration: 'none',
                              color: '#FF9918',
                            }}
                            href="https://ondc.yellowsense.in/"
                            color={
                              activeSection === 'home' ? 'orange' : 'black'
                            }
                          >
                            ONDC
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link
                            _hover={{
                              textDecoration: 'none',
                              color: '#FF9918',
                            }}
                            color={
                              activeSection === 'home' ? 'orange' : 'black'
                            }
                            href="https://melody.yellowsense.in/"
                          >
                            Melody
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link
                            _hover={{
                              textDecoration: 'none',
                              color: '#FF9918',
                            }}
                            color={
                              activeSection === 'home' ? 'orange' : 'black'
                            }
                            href="https://ccr.yellowsense.in/"
                          >
                            CCR-OCEN
                          </Link>
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Flex>
                  <Flex>
                    {isAuth ? (
                      <Flex alignItems="center" gap="30%" ml="2rem">
                        <Img w="30px" src="images/user.webp" cursor="pointer" />
                        <Link
                          fontWeight="600"
                          fontSize="1.1rem"
                          _hover={{ textDecoration: 'none', color: '#FF9918' }}
                          onClick={() => {
                            router.push('/profile');
                            onMenuClose();
                          }}
                          letterSpacing="2px"
                          color={activeSection === 'about' ? 'orange' : 'black'}
                        >
                          Profile
                        </Link>
                      </Flex>
                    ) : (
                      <Flex alignItems="center" gap="30%" ml="2rem">
                        <Img w="30px" src="images/login.webp" alt="login" />
                        <Link
                          fontWeight="600"
                          fontSize="1.1rem"
                          _hover={{ textDecoration: 'none', color: '#FF9918' }}
                          onClick={onLoginOpen}
                          letterSpacing="2px"
                          color={activeSection === 'about' ? 'orange' : 'black'}
                        >
                          Login
                        </Link>
                      </Flex>
                    )}
                  </Flex>
                  {isAuth && (
                    <Flex alignItems="center" gap="10%" ml="2rem">
                      <Img w="30px" src="images/logout.webp" alt="logout" />
                      <Text
                        fontWeight="600"
                        fontSize="1.1rem"
                        _hover={{ textDecoration: 'none', color: '#FF9918' }}
                        onClick={() => {
                          handleLogOut();
                          onMenuClose();
                        }}
                        color={activeSection === 'contact' ? 'orange' : 'black'}
                      >
                        Logout
                      </Text>
                    </Flex>
                  )}
                  <Flex alignItems="center" gap="10%" ml="2rem">
                    <Img w="30px" src="images/about.webp" alt="about" />
                    <Link
                      href="/"
                      fontWeight="600"
                      fontSize="1.1rem"
                      _hover={{ textDecoration: 'none', color: '#FF9918' }}
                      onClick={(event) => {
                        scrollToSection('about', event);
                        onMenuClose();
                      }}
                      color={activeSection === 'about' ? 'orange' : 'black'}
                    >
                      About
                    </Link>
                  </Flex>
                  <Flex alignItems="center" gap="10%" ml="2rem">
                    <Img w="30px" src="images/phone.webp" alt="phone" />
                    <Link
                      href="/"
                      fontWeight="600"
                      fontSize="1.1rem"
                      _hover={{ textDecoration: 'none', color: '#FF9918' }}
                      onClick={(event) => {
                        scrollToSection('contact', event);
                        onMenuClose();
                      }}
                      color={activeSection === 'contact' ? 'orange' : 'black'}
                    >
                      Contact
                    </Link>
                  </Flex>
                </DrawerBody>

                <DrawerFooter
                  display="flex"
                  flexDirection="column"
                  gap="10px"
                  bgGradient="linear(to-t, #FFF1D0, #FFFFFF)"
                >
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
                  <Text textAlign="center">
                    For Booking Maid, Cook or Nanny in 1 hour call
                  </Text>
                  <Link
                    p="0.6rem 2rem"
                    href="tel:9403890108"
                    display="flex"
                    alignItems="center"
                    gap="5px"
                    borderRadius="20px"
                    bg="#AD6A4D"
                    color="white"
                    _hover={{}}
                    _active={{ backgroundColor: '#D39B84' }}
                  >
                    <Img w="15px" src="images/whitePhone.webp" alt="phone" />
                    <Text>+919403890108</Text>
                  </Link>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </Flex>
        )}
        <Login />
        <Thanks />
        {isLoading && <Loading />}
      </Flex>
    </Box>
  );
};

export default Header;
