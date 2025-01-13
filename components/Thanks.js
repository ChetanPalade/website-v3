import { ProviderContext } from '@/context/StoreContext';
import {
  Button,
  Img,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { useContext } from 'react';

const Thanks = () => {
  const { isThanksOpen, onThanksClose } = useContext(ProviderContext);
  return (
    <Modal
      isOpen={isThanksOpen}
      onClose={onThanksClose}
      isCentered
      size={{ md: 'lg', base: 'xs' }}
      preserveScrollBarGap
    >
      <ModalOverlay />
      <ModalContent borderRadius="30px" bg="#FFFFE9">
        <ModalCloseButton />
        <ModalBody>
          <Img src="images/Thanks.webp" />
          <Text textAlign="center" fontWeight="700" px="8%">
            We acknowledge your request. Our team will get back to you soon!
          </Text>
          <Button
            bg="#A15942"
            color="white"
            borderRadius="20px"
            type="submit"
            display="block"
            margin="auto"
            my="5%"
            _hover={{}}
            id="sign"
            onClick={onThanksClose}
          >
            Back to Site
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Thanks;
