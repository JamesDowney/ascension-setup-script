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
  ButtonProps,
  useDisclosure,
} from "@chakra-ui/react";

interface AscendButtonProps extends ButtonProps {
  path: Path;
  playerClass: Class;
  lifestyle: Lifestyle;
  moonsign: MoonSign;
  astraldeli?: Item;
  astralpet?: Item;
  // workshed?: string;
  // garden?: string;
  // eudora?: string;
  // chateau?: [string?, string?, string?];
}

const AscendButton: React.FC<AscendButtonProps> = ({
  path,
  playerClass,
  lifestyle,
  moonsign,
  astraldeli,
  astralpet,
}) => {
  const ascendButton = () => {
    ascend(path, playerClass, lifestyle, moonsign, astraldeli, astralpet);
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
