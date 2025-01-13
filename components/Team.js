import { Box, Flex, Heading, Img, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

const Team = ({ photo, name, position, linkedIn }) => {
  const router = useRouter();
  return (
    <Box
      w="250px"
      bg="radial-gradient(circle, rgba(255,254,254,1) 36%, rgba(232,197,53,1) 100%)"
      borderRadius="50px"
      boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
      transition={'1.5s'}
      _hover={{ transform: 'translateY(-20px)' }}
      my={{ md: '2%', base: '5%' }}
    >
      <Img
        h={{ md: '300px', base: '280px' }}
        p="5%"
        w="250px"
        objectFit="cover"
        src={photo}
      />
      <Box textAlign="center" bg="white" borderRadius="0px 50px" p="5%">
        <Heading size={{ md: 'md', base: 'sm' }}>{name}</Heading>
        <Text my="5%" fontSize={{ base: '0.8rem', md: '1rem' }}>
          {position}
        </Text>
        <Flex justifyContent="center">
          <Img
            cursor="pointer"
            w="15%"
            src="images/linked.webp"
            alt="linkedIn"
            onClick={() => router.push(linkedIn)}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default Team;
