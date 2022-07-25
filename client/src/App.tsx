import {
  ChakraProvider,
  extendTheme,
  Flex,
  Heading,
  VStack,
} from "@chakra-ui/react";
import AscensionConfiguration from "./sections/AscensionConfiguration";

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

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Layout />
      <VStack width="fit-content" marginLeft={4} marginTop={4}>
        <AscensionConfiguration />
      </VStack>
    </ChakraProvider>
  );
}

export default App;
