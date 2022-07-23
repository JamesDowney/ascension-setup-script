import { ChakraProvider, Flex, Heading } from "@chakra-ui/react";

const Layout = () => {
  return (
    <Flex direction="column" align="stretch" fontSize="sm">
      <Heading as="h1" size="xl" alignSelf="center">
        Ascension Setup Script
      </Heading>
    </Flex>
  );
};

function App() {
  return (
    <ChakraProvider>
      <Layout />
    </ChakraProvider>
  );
}

export default App;
