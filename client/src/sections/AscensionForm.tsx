import { Paths } from "libram";
import { useState } from "react";
import { FormControl, FormLabel, HStack } from "@chakra-ui/react";
import Selector from "../components/Selector";
import AscendButton from "./AscendButton";
import SeedInfo from "./SeedInfo";

export interface AscensionData {
  lifestyle: string;
  path: string;
  playerClass: string;
  moonsign: string;
  astralDeli: string;
  astralPet: string;
}
export interface PreAscensionData {
  workshed?: string;
  garden?: string;
  eudora?: string;
  desk?: string;
  ceiling?: string;
  nightstand?: string;
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
  "astral bludgeon",
  "astral shield",
  "astral chapeau",
  "astral bracer",
  "astral longbow",
  "astral shorts",
  "astral mace",
  "astral trousers",
  "astral ring",
  "astral statuette",
  "astral pistol",
  "astral mask",
  "astral pet sweater",
  "astral shirt",
  "astral belt",
];
const worksheds = [
  "none",
  "warbear LP-ROM burner",
  "warbear jackhammer drill press",
  "warbear induction oven",
  "warbear high-efficiency still",
  "warbear chemistry lab",
  "warbear auto-anvil",
  "spinning wheel",
  "snow machine",
  "Little Geneticist DNA-Splicing Lab",
  "portable Mayo Clinic",
  "Asdon Martin keyfob",
  "diabolic pizza cube",
  "cold medicine cabinet",
];
const gardens = [
  "none",
  "packet of pumpkin seeds",
  "Peppermint Pip Packet",
  "packet of dragon's teeth",
  "packet of beer seeds",
  "packet of winter seeds",
  "packet of thanksgarden seeds",
  "packet of tall grass seeds",
  "packet of mushroom spores",
];
const eudorae = [
  "none",
  "My Own Pen Pal kit",
  "GameInformPowerDailyPro subscription card",
  "Xi Receiver Unit",
  "New-You Club Membership Form",
  "Our Daily Candles™ order form",
];
const desks = [
  "none",
  "fancy stationery set",
  "Swiss piggy bank",
  "continental juice bar",
];
const ceilings = [
  "none",
  "antler chandelier",
  "ceiling fan",
  "artificial skylight",
];
const nightstands = [
  "none",
  "foreign language tapes",
  "bowl of potpourri",
  "electric muscle stimulator",
];

const AscensionForm = () => {
  const [selectedAscensionData, setSelectedAscensiondData] =
    useState<AscensionData>({
      lifestyle: "Casual",
      path: "Unrestricted",
      playerClass: "Seal Clubber",
      moonsign: "Mongoose",
      astralDeli: "none",
      astralPet: "none",
    });
  const [selectedPreAscensionData, setSelectedPreAscensiondData] =
    useState<PreAscensionData>({
      workshed: "none",
      garden: "none",
      eudora: "none",
      desk: "none",
      ceiling: "none",
      nightstand: "none",
    });

  const updateAscensionData = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAscensiondData({
      ...selectedAscensionData,
      [event.target.name]: event.target.value,
    });
  };
  const updatePreAscensionData = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedPreAscensiondData({
      ...selectedPreAscensionData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <HStack>
        <FormControl width="-moz-fit-content">
          <FormLabel fontSize={24} marginLeft={4} marginTop={4}>
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
          <FormLabel fontSize={24} marginLeft={4} marginTop={4}>
            Pre-Ascension
          </FormLabel>
          <Selector
            header="Workshed"
            name="workshed"
            value={selectedPreAscensionData.workshed}
            onChange={updatePreAscensionData}
            optionData={worksheds}
          />
          <Selector
            header="Garden"
            name="garden"
            value={selectedPreAscensionData.garden}
            onChange={updatePreAscensionData}
            optionData={gardens}
          />
          <Selector
            header="Eudora"
            name="eudora"
            value={selectedPreAscensionData.eudora}
            onChange={updatePreAscensionData}
            optionData={eudorae}
          />
          <Selector
            header="Desk"
            name="desk"
            value={selectedPreAscensionData.desk}
            onChange={updatePreAscensionData}
            optionData={desks}
          />
          <Selector
            header="Ceiling"
            name="ceiling"
            value={selectedPreAscensionData.ceiling}
            onChange={updatePreAscensionData}
            optionData={ceilings}
          />
          <Selector
            header="Nightstand"
            name="nightstand"
            value={selectedPreAscensionData.nightstand}
            onChange={updatePreAscensionData}
            optionData={nightstands}
          />
        </FormControl>
        <SeedInfo />
      </HStack>
      <AscendButton
        ascension={selectedAscensionData}
        preAscension={selectedPreAscensionData}
      />
    </>
  );
};

export default AscensionForm;
