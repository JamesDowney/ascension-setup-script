import {
  Class,
  Item,
  MoonSign,
  eudoraItem,
  getWorkshed,
  myGardenType,
} from "kolmafia";
import { $class, $item, Lifestyle, Path, Paths } from "libram";
import React, { useState } from "react";
import { Box, Center, Heading } from "@chakra-ui/react";

import Line from "../components/Line";
import AscendButton from "./AscendButton";
import EudoraSelector from "./Pre-Ascension Selectors/EudoraSelector";
import GardenSelector, {
  gardens,
} from "./Pre-Ascension Selectors/GardenSelector";
import WorkshedSelector from "./Pre-Ascension Selectors/WorkshedSelector";
import AstralDeliSelector from "./Valhalla Selectors/AstralDeliSelector";
import AstralPetSelector from "./Valhalla Selectors/AstralPetSelector";
import ClassSelector from "./Valhalla Selectors/ClassSelector";
import LifestyleSelector from "./Valhalla Selectors/LifestyleSelector";
import MoonsignSelector from "./Valhalla Selectors/MoonsignSelector";
import PathSelector from "./Valhalla Selectors/PathSelector";

const AscensionConfiguration = () => {
  const [selectedLifestyle = Lifestyle.casual, setSelectedLifestyle] =
    useState<Lifestyle>();
  const [selectedPath = Paths.Unrestricted, setSelectedPath] = useState<Path>();
  const [selectedClass = $class`Seal Clubber`, setSelectedClass] =
    useState<Class>();
  const [selectedMoonsign = 1, setSelectedMoonsign] = useState<MoonSign>();
  const [selectedAstralDeli = $item`none`, setSelectedAstralDeli] =
    useState<Item>();
  const [selectedAstralPet = $item`none`, setSelectedAstralPet] =
    useState<Item>();

  const [
    selectedWorkshed = getWorkshed().identifierString,
    setSelectedWorkshed,
  ] = useState<string>();
  const [
    selectedGarden = gardens.get(myGardenType())?.identifierString ?? "none",
    setSelectedGarden,
  ] = useState<string>();
  const [selectedEudora = eudoraItem(), setSelectedEudora] = useState<Item>();

  // Having an issue with selector values not functioning correctly
  // <h2> tags are for diagnostic purposes
  return (
    <>
      <Box marginLeft={8} alignSelf="flex-start" width="fit-content">
        <Heading size="md" alignSelf="flex-start" marginBottom={4}>
          Valhalla:
        </Heading>
        <LifestyleSelector parentCallback={setSelectedLifestyle} />
        <Line fontSize={8}>Lifestyle: {selectedLifestyle}</Line>
        <PathSelector
          lifestyle={selectedLifestyle}
          parentCallback={setSelectedPath}
        />
        <Line fontSize={8}>Path: {selectedPath.name}</Line>
        <ClassSelector path={selectedPath} parentCallback={setSelectedClass} />
        <Line fontSize={8}>Class: {selectedClass.identifierString}</Line>
        <MoonsignSelector parentCallback={setSelectedMoonsign} />
        <Line fontSize={8}>Moonsign: {selectedMoonsign}</Line>
        <AstralDeliSelector parentCallback={setSelectedAstralDeli} />
        <Line fontSize={8}>
          Astral Deli: {selectedAstralDeli.identifierString}
        </Line>
        <AstralPetSelector parentCallback={setSelectedAstralPet} />
        <Line fontSize={8}>
          Astral Pet: {selectedAstralPet.identifierString}
        </Line>
        <Heading
          size="md"
          alignSelf="flex-start"
          marginBottom={4}
          marginTop={8}
        >
          Pre-Ascension:
        </Heading>
        <WorkshedSelector parentCallback={setSelectedWorkshed} />
        <GardenSelector parentCallback={setSelectedGarden} />
        <EudoraSelector parentCallback={setSelectedEudora} />
        <Line fontSize={8}>
          Correspondence: {selectedEudora.identifierString}
        </Line>
      </Box>
      <Center>
        <AscendButton
          ascension={{
            lifestyle: selectedLifestyle,
            path: selectedPath,
            playerClass: selectedClass,
            moonsign: selectedMoonsign,
            astralDeliItem: selectedAstralDeli,
            astralPetItem: selectedAstralPet,
          }}
          ascensionPrep={{
            workshed: selectedWorkshed,
            garden: selectedGarden,
            eudora: selectedEudora.identifierString,
          }}
        />
      </Center>
    </>
  );
};

export default AscensionConfiguration;
