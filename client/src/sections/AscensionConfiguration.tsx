import { Class, MoonSign } from "kolmafia";
import { $class, Lifestyle, Path, Paths } from "libram";
import React, { useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import AscendButton from "./AscendButton";
import ClassSelector from "./Basic Selectors/ClassSelector";
import LifestyleSelector from "./Basic Selectors/LifestyleSelector";
import MoonsignSelector from "./Basic Selectors/MoonsignSelector";
import PathSelector from "./Basic Selectors/PathSelector";
import EudoraSelector from "./Detailed Selectors/EudoraSelector";
import GardenSelector from "./Detailed Selectors/GardenSelector";
import WorkshedSelector from "./Detailed Selectors/WorkshedSelector";

const AscensionConfiguration = () => {
  const [selectedLifestyle = Lifestyle.casual, setSelectedLifestyle] =
    useState<Lifestyle>();
  const [selectedPath = Paths.Unrestricted, setSelectedPath] = useState<Path>();
  const [selectedClass = $class`Seal Clubber`, setSelectedClass] =
    useState<Class>();
  const [selectedMoonsign = 1, setSelectedMoonsign] = useState<MoonSign>();

  // Having an issue with selector values not functioning correctly
  // <h2> tags are for diagnostic purposes
  return (
    <>
      <Box>
        <Heading size="md" alignSelf="flex-start" marginBottom={4}>
          Basic Options:
        </Heading>
        <LifestyleSelector parentCallback={setSelectedLifestyle} />
        <h2>Lifestyle: {selectedLifestyle}</h2>
        <PathSelector
          lifestyle={selectedLifestyle}
          parentCallback={setSelectedPath}
        />
        <h2>Path: {selectedPath.name}</h2>
        <ClassSelector path={selectedPath} parentCallback={setSelectedClass} />
        <h2>Class: {selectedClass.identifierString}</h2>
        <MoonsignSelector parentCallback={setSelectedMoonsign} />
        <h2>Moonsign: {selectedMoonsign}</h2>
        <Heading
          size="md"
          alignSelf="flex-start"
          marginBottom={4}
          marginTop={8}
        >
          Detailed Options:
        </Heading>
        <WorkshedSelector />
        <GardenSelector />
        <EudoraSelector />
      </Box>
      <AscendButton
        lifestyle={selectedLifestyle}
        path={selectedPath}
        playerClass={selectedClass}
        moonsign={selectedMoonsign}
      />
    </>
  );
};

export default AscensionConfiguration;
