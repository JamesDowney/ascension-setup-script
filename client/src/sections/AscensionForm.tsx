import { Paths } from "libram";
import { useState } from "react";
import { FormControl, FormLabel, HStack } from "@chakra-ui/react";
import Selector from "../components/Selector";
import AscendButton from "./AscendButton";

export interface AscensionData {
  lifestyle: string;
  path: string;
  playerClass: string;
  moonsign: string;
  astralDeli: string;
  astralPet: string;
}

const lifestyles = ["Casual", "Normal", "Hardcore"];
const paths = Object.values(Paths);
const moonsigns = [
  "Mongoose",
  "Wallaby",
  "Vole",
  "Platypus",
  "Opossum",
  "Marmot",
  "Wombat",
  "Blender",
  "Packrat",
];
const deliItems = [
  "none",
  "astral hot dog dinner",
  "astral six-pack",
  "carton of astral energy drinks",
];
const petItems = [
  "none",
  " astral bludgeon",
  " astral shield",
  " astral chapeau",
  " astral bracer",
  " astral longbow",
  " astral shorts",
  " astral mace",
  " astral trousers",
  " astral ring",
  " astral statuette",
  " astral pistol",
  " astral mask",
  " astral pet sweater",
  " astral shirt",
  " astral belt",
];

const AscensionForm = () => {
  const [selectedAscensionData, setSelectedAscensiondData] =
    useState<AscensionData>({
      lifestyle: "Casual",
      path: "Unrestricted",
      playerClass: "Seal Clubber",
      moonsign: "Mongoose",
      astralDeli: "None",
      astralPet: "None",
    });

  const updateAscensionData = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAscensiondData({
      ...selectedAscensionData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <HStack>
        <FormControl>
          <FormLabel fontSize={24} marginLeft={4}>
            Valhalla
          </FormLabel>
          <Selector
            header="Lifestyle"
            name="lifestyle"
            value={selectedAscensionData.lifestyle}
            onChange={updateAscensionData}
            optionData={lifestyles}
          />
          <Selector
            header="Path"
            name="path"
            value={selectedAscensionData.path}
            onChange={updateAscensionData}
            optionData={paths.map((path) => path.name)}
            disabled={selectedAscensionData.lifestyle === "Casual"}
          />
          <Selector
            header="Class"
            name="playerClass"
            value={selectedAscensionData.playerClass}
            onChange={updateAscensionData}
            optionData={paths
              .find((path) => path.name === selectedAscensionData.path)!
              .classes.map((playerClass) => playerClass.identifierString)}
          />
          <Selector
            header="Moonsign"
            name="moonsign"
            value={selectedAscensionData.moonsign}
            onChange={updateAscensionData}
            optionData={moonsigns}
          />
          <Selector
            header="Astral Deli"
            name="astralDeli"
            value={selectedAscensionData.astralDeli}
            onChange={updateAscensionData}
            optionData={deliItems}
          />
          <Selector
            header="Astral Pet"
            name="astralPet"
            value={selectedAscensionData.astralPet}
            onChange={updateAscensionData}
            optionData={petItems}
          />
        </FormControl>
      </HStack>
      <AscendButton ascension={selectedAscensionData} />
    </>
  );
};

export default AscensionForm;
