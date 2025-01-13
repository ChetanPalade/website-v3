import {
  Button,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { BounceLoader } from 'react-spinners';

const Loading = () => {
  useEffect(() => {
    onOpen();
    return () => {
      onClose();
    };
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent mt="50vh" bg="transparent" boxShadow={'none'}>
          <Flex justifyContent="center">
            <BounceLoader color="yellow" />
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Loading;
