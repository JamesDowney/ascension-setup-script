import {
  Ceiling,
  Desk,
  Eudora,
  Garden,
  MoonSign,
  Nightstand,
  Workshed,
} from "kolmafia";
import {
  $class,
  $item,
  ascend,
  Lifestyle,
  Paths,
  prepareAscension,
} from "libram";
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
import { AscensionData, PreAscensionData } from "./AscensionForm";

interface Props {
  ascension: AscensionData;
  preAscension: PreAscensionData;
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
const worksheds = new Map<string | undefined, Workshed | undefined>([
  [undefined, undefined],
  ["warbear LP-ROM burner", "warbear LP-ROM burner"],
  ["warbear jackhammer drill press", "warbear jackhammer drill press"],
  ["warbear induction oven", "warbear induction oven"],
  ["warbear high-efficiency still", "warbear high-efficiency still"],
  ["warbear chemistry lab", "warbear chemistry lab"],
  ["warbear auto-anvil", "warbear auto-anvil"],
  ["spinning wheel", "spinning wheel"],
  ["snow machine", "snow machine"],
  ["Little Geneticist DNA-Splicing Lab", "Little Geneticist DNA-Splicing Lab"],
  ["portable Mayo Clinic", "portable Mayo Clinic"],
  ["Asdon Martin keyfob", "Asdon Martin keyfob"],
  ["diabolic pizza cube", "diabolic pizza cube"],
  ["cold medicine cabinet", "cold medicine cabinet"],
]);
const gardens = new Map<string | undefined, Garden | undefined>([
  ["packet of pumpkin seeds", "packet of pumpkin seeds"],
  ["Peppermint Pip Packet", "Peppermint Pip Packet"],
  ["packet of dragon's teeth", "packet of dragon's teeth"],
  ["packet of beer seeds", "packet of beer seeds"],
  ["packet of winter seeds", "packet of winter seeds"],
  ["packet of thanksgarden seeds", "packet of thanksgarden seeds"],
  ["packet of tall grass seeds", "packet of tall grass seeds"],
  ["packet of mushroom spores", "packet of mushroom spores"],
]);
const eudorae = new Map<string | undefined, Eudora | undefined>([
  ["My Own Pen Pal kit", "My Own Pen Pal kit"],
  [
    "GameInformPowerDailyPro subscription card",
    "GameInformPowerDailyPro subscription card",
  ],
  ["Xi Receiver Unit", "Xi Receiver Unit"],
  ["New-You Club Membership Form", "New-You Club Membership Form"],
  ["Our Daily Candles™ order form", "Our Daily Candles™ order form"],
]);
const desks = new Map<string | undefined, Desk | undefined>([
  ["fancy stationery set", "fancy stationery set"],
  ["Swiss piggy bank", "Swiss piggy bank"],
  ["continental juice bar", "continental juice bar"],
]);
const ceilings = new Map<string | undefined, Ceiling | undefined>([
  ["antler chandelier", "antler chandelier"],
  ["ceiling fan", "ceiling fan"],
  ["artificial skylight", "artificial skylight"],
]);
const nightstands = new Map<string | undefined, Nightstand | undefined>([
  ["foreign language tapes", "foreign language tapes"],
  ["bowl of potpourri", "bowl of potpourri"],
  ["electric muscle stimulator", "electric muscle stimulator"],
]);

const AscendButton: React.FC<Props> = ({ ascension, preAscension }) => {
  const ascendButton = () => {
    prepareAscension({
      workshed: worksheds.get(preAscension.workshed),
      garden: gardens.get(preAscension.garden),
      eudora: eudorae.get(preAscension.eudora),
      chateau: {
        desk: desks.get(preAscension.desk),
        ceiling: ceilings.get(preAscension.ceiling),
        nightstand: nightstands.get(preAscension.nightstand),
      },
    });
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
