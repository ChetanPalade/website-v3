import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

const Failure = () => {
  return (
    <Flex alignItems="center">
      <Text fonsize="4xl" color="tomato">
        Your payment was unsuccessfully please try again
      </Text>
    </Flex>
  );
};

export default Failure;
