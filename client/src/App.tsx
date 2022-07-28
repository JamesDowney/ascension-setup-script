import { ChakraProvider, extendTheme, Flex, Heading } from "@chakra-ui/react";
import AscensionForm from "./sections/AscensionForm";

const theme = extendTheme({});

const Layout = () => {
  return (
    <Flex direction="column" fontSize="sm">
      <Heading as="h1" size="xl" marginTop={4} marginLeft={4}>
        Ascension Setup Script
      </Heading>
    </Flex>
  );
};

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Layout />
      <AscensionForm />
    </ChakraProvider>
  );
};

export default App;
