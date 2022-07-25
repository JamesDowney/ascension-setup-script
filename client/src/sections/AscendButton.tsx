import { Class, Item, MoonSign } from "kolmafia";
import { ascend, Lifestyle, Path } from "libram";
import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

interface Props {
  ascension: {
    lifestyle: Lifestyle;
    path: Path;
    playerClass: Class;
    moonsign: MoonSign;
    astralDeliItem: Item;
    astralPetItem: Item;
  };
  ascensionPrep: {
    workshed: string;
    garden: string;
    eudora: string;
  };
}

const AscendButton: React.FC<Props> = ({ ascension }) => {
  const ascendButton = () => {
    // prepareAscension({
    //   workshed: ascensionPrep.workshed,
    //   garden: ascensionPrep.garden,
    //   eudora: ascensionPrep.eudora,
    // });
    ascend(
      ascension.path,
      ascension.playerClass,
      ascension.lifestyle,
      ascension.moonsign,
      ascension.astralDeliItem,
      ascension.astralPetItem
    );
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <>
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
    </>
  );
};

export default AscendButton;
