import { Item, myGardenType } from "kolmafia";
import { $item, have } from "libram";
import { ChangeEvent, useState } from "react";
import { Box, Select } from "@chakra-ui/react";
import Line from "../../components/Line";

const gardens = new Map<string, Item>([
  ["pumpkin", $item`packet of pumpkin seeds`],
  ["peppermint", $item`Peppermint Pip Packet`],
  ["skeleton", $item`packet of dragon's teeth`],
  ["beer", $item`packet of beer seeds`],
  ["winter", $item`packet of winter seeds`],
  ["thanksgarden", $item`packet of thanksgarden seeds`],
  ["grass", $item`packet of tall grass seeds`],
  ["mushroom", $item`packet of mushroom spores`],
]);
const availableGardens = Array.from(gardens.values()).filter((garden) =>
  have(garden)
);
const myGarden = gardens.get(myGardenType()) ?? $item`none`;
const GardenSelector = () => {
  const [selectedGarden = myGarden.identifierString, setSelectedGarden] =
    useState<string>();

  const selectGarden = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedGarden(value);
    event.preventDefault();
  };

  return (
    <Box
      alignSelf="stretch"
      alignContent="flex-start"
      hidden={myGarden === $item`none` && availableGardens.length === 0}
    >
      <Line>Garden:</Line>
      <Select
        disabled={availableGardens.length === 0}
        onChange={selectGarden}
        value={selectedGarden}
      >
        <option
          value={myGarden.identifierString}
          key={myGarden.identifierString}
        >
          {myGarden.identifierString}
        </option>
        {availableGardens.map((ownedGarden) => {
          return (
            <option
              value={ownedGarden.identifierString}
              key={ownedGarden.identifierString}
            >
              {ownedGarden.identifierString}
            </option>
          );
        })}
      </Select>
    </Box>
  );
};

export default GardenSelector;
