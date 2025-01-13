import { Box, useRadio } from '@chakra-ui/react';

const RadioCard = (props) => {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="30px"
        boxShadow="md"
        bg="white"
        _checked={{
          bg: '#AD6A4D',
          color: 'white',
          borderColor: '#AD6A4D',
        }}
        textAlign="center"
        px={{ md: 5, base: 1 }}
        py={{ md: 3, base: 2 }}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default RadioCard;
