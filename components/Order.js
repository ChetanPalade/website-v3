import { ProviderContext } from '@/context/StoreContext';
import {
  Box,
  Button,
  Flex,
  Heading,
  Img,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState, useContext } from 'react';

const Order = ({
  person,
  location,
  startDate,
  startTime,
  price,
  source,
  action,
  serviceStatus,
  serviceProvider,
  bookingplan_amount,
}) => {
  useEffect(() => {
    if (
      serviceStatus === 'Open' ||
      serviceStatus === '' ||
      serviceStatus === 'Customer Yet To Revert'
    ) {
      setStatus('In Progress');
      setColor('#EFAD1D');
    } else if (serviceStatus === 'Closed') {
      setStatus('Completed');
      setColor('#1DA912');
    } else {
      setStatus('Cancelled');
      setColor('#D53519');
    }
    const start = new Date(startDate);
    setDate(
      start.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    );
  }, []);

  const [status, setStatus] = useState('In Progress');
  const [color, setColor] = useState('yellow');
  const [date, setDate] = useState('');
  const { onAvailableOpen } = useContext(ProviderContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleBookingClick = () => {
    setSelectedBooking({
      service_type: person,
      location: location,
      startDate: startDate,
      startTime: startTime,
      serviceStatus: serviceStatus,
      serviceProvider: serviceProvider,
      totalAmount: price,
    });
    onOpen();
  };

  return (
    <Box>
      <Flex
        bg="#FFFFE9"
        borderRadius="80px"
        alignItems="center"
        justifyContent="space-around"
        p="1.5rem"
        my="2%"
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
        flexDirection={{ base: 'column', md: 'row' }}
        gap={{ base: '30px' }}
        onClick={handleBookingClick}
        cursor="pointer"
      >
        {(serviceStatus == 'Open' ||
          serviceStatus == '' ||
          serviceStatus === 'Customer Yet To Revert') &&
        source != 'order' ? (
          <Img
            w={{ md: '5rem', base: '10rem' }}
            src={`images/search.webp`}
            alt="service"
          />
        ) : (
          <Img
            borderRadius="80px 0px 0px 80px"
            w={{ md: '5rem', base: '10rem' }}
            src={`images/${person.toLowerCase()} (2).webp`}
            alt="service"
          />
        )}
        <Box textAlign={{ md: 'left', base: 'center' }}>
          <Heading size={{ md: 'md', base: '2xl' }}>Booking {person}</Heading>
          <Text my="5%" fontSize={{ md: '1rem', base: '1.5rem' }}>
            {location}
          </Text>

          <Text>
            {date} , {startTime}
          </Text>
          {source != 'order' && serviceProvider != '' && (
            <Flex
              alignItems="center"
              justifyContent={{ base: 'center', md: 'flex-start' }}
            >
              {serviceProvider ? (
                <>
                  <Text>{person} Name : </Text>
                  <Text color="black" p="2% 4%" borderRadius="20px">
                    {serviceProvider}
                  </Text>
                </>
              ) : (
                <Text>{person} Not Assigned</Text>
              )}
            </Flex>
          )}
        </Box>

        <Flex
          alignItems="center"
          flexDirection={{ md: 'column' }}
          w={{ base: '100%', md: '30%' }}
          justifyContent="space-between"
        >
          <Heading size="md" color="#A15942" mb={{ md: '10%' }}>
            ₹ {price}
          </Heading>
          {source == 'order' ? (
            <Button
              my="5%"
              bg="#A15942"
              borderRadius="30px"
              color="white"
              onClick={action}
              _hover={{}}
            >
              Proceed
            </Button>
          ) : (
            <Button
              _hover={{}}
              my="5%"
              bg={color}
              mx="auto"
              p={{ base: '10%' }}
              fontSize={{ md: '1rem', base: '1.8rem' }}
              borderRadius="30px"
              color="white"
            >
              {status}
            </Button>
          )}
        </Flex>
      </Flex>
      {(serviceStatus == 'Open' ||
        serviceStatus == '' ||
        serviceStatus === 'Customer Yet To Revert') &&
        source != 'order' && (
          <Text textAlign="center" color="#AD6A4D">
            Please wait for a while our team provides you the best {person}
          </Text>
        )}
    </Box>
  );
};

export default Order;
