import {
  ChakraProvider,
  extendTheme,
  Flex,
  Heading,
  HStack,
} from "@chakra-ui/react";
import Selectors from "./sections/Selectors";

const theme = extendTheme({});

const Layout = () => {
  return (
    <Flex direction="column" align="stretch" fontSize="sm">
      <Heading as="h1" size="xl" marginTop={4} marginLeft={4}>
        Ascension Setup Script
      </Heading>
    </Flex>
  );
};

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Layout />
      <HStack>
        <Selectors />
      </HStack>
    </ChakraProvider>
  );
}

export default App;
