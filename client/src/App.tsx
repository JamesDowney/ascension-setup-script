import {
  Center,
  ChakraProvider,
  extendTheme,
  Flex,
  Heading,
  HStack,
  VStack,
} from "@chakra-ui/react";
import AscendButton from "./sections/AscendButton";
import BasicSelectors from "./sections/BasicSelectors";
import DetailedSelectors from "./sections/DetailedSelectors";

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
      <HStack>
        <VStack width="fit-content" marginLeft={4} marginTop={4}>
          <BasicSelectors />
          <DetailedSelectors />
        </VStack>
      </HStack>
      <Center>
        <AscendButton />
      </Center>
    </ChakraProvider>
  );
}

export default App;
