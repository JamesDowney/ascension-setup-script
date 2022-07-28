import { MoonSign } from "kolmafia";
import { $class, $item, ascend, Lifestyle, Paths } from "libram";
import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
import { AscensionData } from "./AscensionForm";

interface Props {
  ascension: AscensionData;
  // ascensionPrep: {
  //   workshed: string;
  //   garden: string;
  //   eudora: string;
  // };
}
const lifestyles = new Map<string, Lifestyle>([
  ["Casual", Lifestyle.casual],
  ["Normal", Lifestyle.normal],
  ["Hardcore", Lifestyle.hardcore],
]);
const moonsigns = new Map<string, MoonSign>([
  ["Mongoose", 1],
  ["Wallaby", 2],
  ["Vole", 3],
  ["Platypus", 4],
  ["Opossum", 5],
  ["Marmot", 6],
  ["Wombat", 7],
  ["Blender", 8],
  ["Packrat", 9],
]);

const AscendButton: React.FC<Props> = ({ ascension }) => {
  const ascendButton = () => {
    ascend(
      Object.values(Paths).find((path) => path.name === ascension.path)!,
      $class`${ascension.playerClass}`,
      lifestyles.get(ascension.lifestyle)!,
      moonsigns.get(ascension.moonsign)!,
      ascension.astralDeli !== "none"
        ? $item`${ascension.astralDeli}`
        : undefined,
      ascension.astralPet !== "none" ? $item`${ascension.astralPet}` : undefined
    );
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <Center>
      <Button position="fixed" bottom={0} onClick={onOpen}>
        Ascend With This Setup
      </Button>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef.current}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Ascend
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to ascend with this configuration?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={ascendButton}>Yes</Button>
              <Button colorScheme="red" onClick={onClose} ml={3}>
                No
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Center>
  );
};

export default AscendButton;
