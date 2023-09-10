import { Center, Spinner } from '@chakra-ui/react';

const ChakraSpinner = () => {
  return (
    <div className="is-loading">
      <div className="container">
        <Center height={'50vh'}>
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="devlinks.--ac-cl-1" size="xl" />
        </Center>
      </div>
    </div>
  );
};

export default ChakraSpinner;
