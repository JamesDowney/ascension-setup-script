import { Item } from "kolmafia";
import { Path, $item, $items } from "libram";
import { useState, ChangeEvent } from "react";
import { Box, Select } from "@chakra-ui/react";
import Line from "../../components/Line";

interface Props {
  path?: Path;
  parentCallback?: (newType: Item | undefined) => void;
}

const astralPetItems = $items`none, astral shield, astral chapeau, astral bracer, astral longbow, astral shorts, astral mace, astral trousers, astral ring, astral statuette, astral pistol, astral mask, astral pet sweater, astral shirt, astral belt`;

const AstralPetSelector: React.FC<Props> = ({ parentCallback }) => {
  const [selectedAstralPet = $item`none`, setSelectedAstralPet] =
    useState<Item>();

  const selectAstralPet = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = $item`${event.target.value}`;
    setSelectedAstralPet(value);
    parentCallback?.(value);
  };

  return (
    <Box alignSelf="stretch" alignContent="flex-start">
      <Line>Astral Pet:</Line>
      <Select
        onChange={selectAstralPet}
        value={selectedAstralPet.identifierString}
      >
        {astralPetItems.map((petItem) => {
          return (
            <option
              value={petItem.identifierString}
              key={petItem.identifierString}
            >
              {petItem.identifierString}
            </option>
          );
        })}
      </Select>
    </Box>
  );
};

export default AstralPetSelector;
