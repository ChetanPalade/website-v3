import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { FaRupeeSign, FaComments } from "react-icons/fa";

const ChooseUs = () => (
  <Box bg="gray.50" py={10}>
    <Text fontSize="3xl" fontWeight="bold" textAlign="center" mb={8}>
      Why Choose Us
    </Text>
    <Flex
      direction={["column", "column", "row"]}
      justify="center"
      align="center"
      gap={8}
      wrap="wrap"
    >
      {/* Card 1 */}
      <Flex
        direction="column"
        align="center"
        bg="white"
        p={6}
        borderRadius="lg"
        boxShadow="md"
        maxW="sm"
        textAlign="center"
      >
        <Icon as={CheckCircleIcon} w={12} h={12} color="teal.500" mb={4} />
        <Text fontWeight="bold" fontSize="lg" mb={2}>
          Verification & Assessment
        </Text>
        <Text fontSize="sm" color="gray.600">
          Employing AI, we enhance our rigorous physical and telephonic
          verification processes to ensure the highest quality assessments of
          our workers.
        </Text>
      </Flex>

      {/* Card 2 */}
      <Flex
        direction="column"
        align="center"
        bg="white"
        p={6}
        borderRadius="lg"
        boxShadow="md"
        maxW="sm"
        textAlign="center"
      >
        <Icon as={FaRupeeSign} w={12} h={12} color="orange.500" mb={4} />
        <Text fontWeight="bold" fontSize="lg" mb={2}>
          Transparent Pricing
        </Text>
        <Text fontSize="sm" color="gray.600">
          You get what you pay for. Additionally, you get a replacement
          guarantee, COVID-19 test reports, verification documents, and more!
        </Text>
      </Flex>

      {/* Card 3 */}
      <Flex
        direction="column"
        align="center"
        bg="white"
        p={6}
        borderRadius="lg"
        boxShadow="md"
        maxW="sm"
        textAlign="center"
      >
        <Icon as={FaComments} w={12} h={12} color="yellow.500" mb={4} />
        <Text fontWeight="bold" fontSize="lg" mb={2}>
          Customer Support
        </Text>
        <Text fontSize="sm" color="gray.600">
          Our executives will always be there to hear you out and solve your
          issues.
        </Text>
      </Flex>
    </Flex>
  </Box>
);

export default ChooseUs;
