import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Input,
  Heading,
  Img,
  Radio,
  RadioGroup,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionImage = motion(Image);

const Card = ({ title, description, buttonText, imageSrc, bgColor, btnColor, onClick }) => (
  <Box
    bg={bgColor}
    p={6}
    borderRadius="lg"
    boxShadow="md"
    textAlign="center"
    w={{ base: "100%", md: "48%" }}
    mb={{ base: 4, md: 0 }}
  >
    <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" mb={2}>
      {title}
    </Text>
    <MotionImage
      src={imageSrc}
      alt={title}
      borderRadius="lg"
      mb={5}
      boxSize={{ base: "150px", md: "200px" }}
      animate={{ scale: 1.1 }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
    />
    <Text fontSize={{ base: "sm", md: "md" }} color="gray.600" mb={4}>
      {description}
    </Text>
    <Button colorScheme={btnColor} onClick={onClick} size="sm">
      {buttonText}
    </Button>
  </Box>
);

const Explore = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const isMobile = useBreakpointValue({ base: true, md: false });

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
  };

  return (
    <Flex
      direction="column"
      align="center"
      p={{ base: 4, md: 6 }}
      bg="gray.100"
      minH="100vh"
    >
      <Heading
        fontSize={{ base: "2xl", md: "3xl" }}
        mb={6}
        textAlign="center"
        bgGradient="linear(to-r, #FF9918, #F9FF22)"
        bgClip="text"
      >
        Explore Our Services
      </Heading>

      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={{ base: 4, md: 6 }}
        align="center"
        w="100%"
      >
        <Card
          title="Register as a Worker"
          description="Register to work with us! Just fill this form, and we will get back to you."
          buttonText="Fill your details"
          imageSrc="images/registerimage.png"
          bgColor="yellow.100"
          btnColor="yellow"
          onClick={() => openModal("register")}
        />
        <Card
          title="Refer a Worker"
          description="Do your bit by getting them a job that pays well! Help them register as a worker now & get rewards up to Rs. 100."
          buttonText="Fill your details"
          imageSrc="images/refer_prev_ui.png"
          bgColor="green.100"
          btnColor="green"
          onClick={() => openModal("refer")}
        />
      </Stack>

      {/* Modal for Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        size={isMobile ? "sm" : "lg"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modalContent === "register" ? "Register as a Worker" : "Refer a Worker"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {modalContent === "refer" ? (
              <Box as="form">
                <Text mb={2}>Worker Name/कार्यकर्ता का नाम*</Text>
                <Input placeholder="Enter worker's name" mb={4} />

                <Text mb={2}>Worker Mobile Number/कार्यकर्ता का फोन नंबर*</Text>
                <Input placeholder="Enter worker's mobile number" mb={4} />

                <Text mb={2}>Worker Address/कार्यकर्ता का पता</Text>
                <Input placeholder="Enter worker's address" mb={4} />

                <Text mb={2}>Worker Occupation/कार्यकर्ता का पेशा:</Text>
                <RadioGroup>
                  <Stack direction="column" spacing={2}>
                    <Text fontWeight="bold">Day Time Worker:</Text>
                    <Radio value="househelp">Househelp/घरेलू सहायक</Radio>
                    <Radio value="cook">Cook/रसोइया</Radio>
                    <Radio value="babysitter">Babysitter/दाई</Radio>

                    <Text fontWeight="bold" mt={4}>24hr Live-In Worker:</Text>
                    <Radio value="househelp-livein">Househelp/घरेलू सहायक</Radio>
                    <Radio value="cook-livein">Cook/रसोइया</Radio>
                    <Radio value="babysitter-livein">Babysitter/दाई</Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            ) : (
              <Box as="form">
                <Text mb={2}>Your Name/आपका नाम*</Text>
                <Input placeholder="Enter your name" mb={4} />

                <Text mb={2}>Your Mobile Number/आपका फोन नंबर*</Text>
                <Input placeholder="Enter your mobile number" mb={4} />

                <Text mb={2}>Your Address/आपका पता</Text>
                <Input placeholder="Enter your address" mb={4} />

                <Text mb={2}>Preferred Job Role/पसंदीदा काम:</Text>
                <RadioGroup>
                  <Stack direction="column" spacing={2}>
                    <Radio value="househelp">Househelp/घरेलू सहायक</Radio>
                    <Radio value="cook">Cook/रसोइया</Radio>
                    <Radio value="babysitter">Babysitter/दाई</Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeModal}>
              Submit
            </Button>
            <Button variant="ghost" onClick={closeModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Explore;



// import React, { useState } from 'react';

// import {
//   Box,
//   Flex,
//   Text,
//   Button,
//   Image,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   ModalCloseButton,
//   Input,
//   Heading,
//   Img,
//   Radio,
//   RadioGroup,
//   Stack,
//   keyframes,
// } from '@chakra-ui/react';
// import { motion } from 'framer-motion';

// const MotionImage = motion(Image);
// const Card = ({ title, description, buttonText, imageSrc, bgColor, btnColor, onClick }) => (
//   <Box
//     bg={bgColor}
//     p={8}
//     borderRadius="lg"
//     boxShadow="md"
//     textAlign="center"
//     justifyContent="center" 
//     alignItems="center" 
//   >
//     <Text fontSize="xl" fontWeight="bold" mb={2}>{title}</Text>
//     <MotionImage  
//       src={imageSrc}
//       alt={title}
//       borderRadius="lg"
//       mb={5}
//       boxSize="200px"
//       animate={{ scale: 1.2 }}
//       transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }} />
//     <Text fontSize="sm" color="gray.600" mb={4}>{description}</Text>
//     <Button colorScheme={btnColor} onClick={onClick}>
//       {buttonText}
//     </Button>
//   </Box>
// );

// const FormModal = ({ isOpen, onClose }) => (
//   <Modal isOpen={isOpen} onClose={onClose} size="lg">
//     <ModalOverlay />
//     <ModalContent>
   
//       <ModalHeader>Refer a Worker</ModalHeader>
//       <ModalCloseButton />
//       <ModalBody>
//         <Box as="form">
//           <Text mb={2}>Worker Name/कार्यकर्ता का नाम*</Text>
//           <Input placeholder="Enter worker's name" mb={4} />

//           <Text mb={2}>Worker Mobile Number/कार्यकर्ता का फोन नंबर*</Text>
//           <Input placeholder="Enter worker's mo                                                                                                         bile number" mb={4} />

//           <Text mb={2}>Worker Address/कार्यकर्ता का पता</Text>
//           <Input placeholder="Enter worker's address" mb={4} />

//           <Text mb={2}>Worker Occupation/कार्यकर्ता का पेशा:</Text>
//           <RadioGroup>
//             <Stack direction="column" spacing={2}>
//               <Text fontWeight="bold">Day Time Worker (2-10 घंटे का काम):</Text>
//               <Radio value="househelp">Househelp/घरेलू सहायक</Radio>
//               <Radio value="cook">Cook/रसोइया</Radio>
//               <Radio value="babysitter">Babysitter/दाई</Radio>

//               <Text fontWeight="bold" mt={4}>24hr Live-In Worker (रहना एवं खाना-पीना):</Text>
//               <Radio value="househelp-livein">Househelp/घरेलू सहायक</Radio>
//               <Radio value="cook-livein">Cook/रसोइया</Radio>
//               <Radio value="babysitter-livein">Babysitter/दाई</Radio>
//             </Stack>
//           </RadioGroup>
//         </Box>
//       </ModalBody>

//       <ModalFooter>
//         <Button colorScheme="blue" mr={3} onClick={onClose}>
//           Submit
//         </Button>
//         <Button variant="ghost" onClick={onClose}>
//           Cancel
//         </Button>
//       </ModalFooter>
//     </ModalContent>
//   </Modal>
// );

// const Explore = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalContent, setModalContent] = useState("");

//   const openModal = (content) => {
//     setModalContent(content); // Set the modal content based on the clicked card
//     setIsModalOpen(true); // Open the modal
//   };

//   const closeModal = () => {
//     setIsModalOpen(false); // Close the modal
//     setModalContent(""); // Clear modal content
//   };

//   const FormModal = ({ isOpen, onClose, content }) => (
//     <Modal isOpen={isOpen} onClose={onClose} size="xl">
//       <ModalOverlay />
//       <ModalContent bg="yellow.100" p={6} borderRadius="lg">
//       <Flex gap="1rem" alignItems="center" onClick={() => router.push('/')}>
//           <Img
//             src="images/logo.webp"
//             alt="logo"
//             mb={3} 
//             w={{ md: '2rem', base: '2rem' }}
//             display={{ base: 'none', md: 'block' }}
//           />
//           <Heading
//             bgGradient="linear(to-b, #FF9918, #F9FF22)"
//             bgClip="text"
//             fontSize={{ md: '2rem', base: '2rem' }}
//           >
//             YellowSense
//           </Heading>
//         </Flex>
//         <ModalHeader>{content === "register" ? "Register as a Worker" : "Refer a Worker"}</ModalHeader>
//         <ModalCloseButton />
       
//         <ModalBody>
//           {content === "refer" ? (
//             // Form for referring a worker
//             <Box as="form">
//               <Text mb={2}>Worker Name/कार्यकर्ता का नाम*</Text>
//               <Input placeholder="Enter worker's name" mb={4} />

//               <Text mb={2}>Worker Mobile Number/कार्यकर्ता का फोन नंबर*</Text>
//               <Input placeholder="Enter worker's mobile number" mb={4} />

//               <Text mb={2}>Worker Address/कार्यकर्ता का पता</Text>
//               <Input placeholder="Enter worker's address" mb={4} />

//               <Text mb={2}>Worker Occupation/कार्यकर्ता का पेशा:</Text>
//               <RadioGroup>
//                 <Stack direction="column" spacing={2}>
//                   <Text fontWeight="bold">Day Time Worker (2-10 घंटे का काम):</Text>
//                   <Radio value="househelp">Househelp/घरेलू सहायक</Radio>
//                   <Radio value="cook">Cook/रसोइया</Radio>
//                   <Radio value="babysitter">Babysitter/दाई</Radio>

//                   <Text fontWeight="bold" mt={4}>24hr Live-In Worker (रहना एवं खाना-पीना):</Text>
//                   <Radio value="househelp-livein">Househelp/घरेलू सहायक</Radio>
//                   <Radio value="cook-livein">Cook/रसोइया</Radio>
//                   <Radio value="babysitter-livein">Babysitter/दाई</Radio>
//                 </Stack>
//               </RadioGroup>
//             </Box>
//           ) : (
//             // Form for registering as a worker
//             <Box as="form">
//               <Text mb={2}>Your Name/आपका नाम*</Text>
//               <Input placeholder="Enter your name" mb={4} />

//               <Text mb={2}>Your Mobile Number/आपका फोन नंबर*</Text>
//               <Input placeholder="Enter your mobile number" mb={4} />

//               <Text mb={2}>Your Address/आपका पता</Text>
//               <Input placeholder="Enter your address" mb={4} />

//               <Text mb={2}>Preferred Job Role/पसंदीदा काम:</Text>
//               <RadioGroup>
//                 <Stack direction="column" spacing={2}>
//                   <Radio value="househelp">Househelp/घरेलू सहायक</Radio>
//                   <Radio value="cook">Cook/रसोइया</Radio>
//                   <Radio value="babysitter">Babysitter/दाई</Radio>
//                 </Stack>
//               </RadioGroup>
//             </Box>
//           )}
//         </ModalBody>

//         <ModalFooter>
//           <Button colorScheme="blue" mr={3} onClick={onClose}>
//             Submit
//           </Button>
//           <Button variant="ghost" onClick={onClose}>
//             Cancel
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );

//   return (
//     <Flex display="flex" direction="row" align="center" p={6} bg="gray.100">
//       {/* <Text fontSize="2xl" fontWeight="bold" mb={6}>
//         Explore Our Services
//       </Text> */}
//       <Flex gap={6} justify="center">
//       <Card
//           title="Register as a Worker"
//           description="Register to work with us! Just fill this form, and we will get back to you."
//           buttonText="Fill your details"
//           imageSrc="images/registerimage.png"
//           bgColor="yellow.100"
//           btnColor="yellow"
//           onClick={() => openModal("register")} // Pass "register" to set modal content
//         />
//         <Card
//           title="Refer a Worker"
//           description="Do your bit by getting them a job that pays well! Help them register as a worker now & get rewards up to Rs. 100."
//           buttonText="Fill your details"
//           imageSrc="images/refer_prev_ui.png"
//           bgColor="green.100"
//           btnColor="green"
//           onClick={() => openModal("refer")} // Pass "refer" to set modal content
//         />
        
//       </Flex>

//       {/* Form Modal */}
//       <FormModal isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
//     </Flex>
//   );
// };

// export default Explore;




// import { Box, Flex, Text, Button, Image } from '@chakra-ui/react';

// const Card = ({ title, description, buttonText, imageSrc, bgColor, btnColor }) => (
//   <Box 
//     bg={bgColor} 
//     p={6} 
//     borderRadius="lg" 
//     boxShadow="md" 
//     textAlign="center"
//   >
//     <Image src={imageSrc} alt={title} borderRadius="lg" mb={4} />
//     <Text fontSize="lg" fontWeight="bold" mb={2}>{title}</Text>
//     <Text fontSize="sm" color="gray.600" mb={4}>{description}</Text>
//     <Button colorScheme={btnColor}>{buttonText}</Button>
//   </Box>
// );

// const NewSection = () => (
//   <Flex direction="column" align="center" p={8} bg="gray.100">
//     <Text fontSize="2xl" fontWeight="bold" mb={6}>
//       Explore Our Services
//     </Text>
//     <Flex gap={8} wrap="wrap" justify="center">
//       <Card
//         title="Register as a Worker"
//         description="Register to work with us! Just fill this form, and we will get back to you."
//         buttonText="Fill your details"
//         imageSrc="/path/to/image2.jpg"
//         bgColor="yellow.100"
//         btnColor="yellow"
//       />
//       <Card
//         title="Refer a Worker"
//         description="Do your bit by getting them a job that pays well! Help them register as a Broomee now & get rewards up to Rs. 100."
//         buttonText="Fill your details"
//         imageSrc="/path/to/image3.jpg"
//         bgColor="green.100"
//         btnColor="green"
//       />
//     </Flex>
//   </Flex>
// );
// export default Explore;
