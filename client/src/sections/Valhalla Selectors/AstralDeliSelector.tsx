import { Item } from "kolmafia";
import { $item, $items } from "libram";
import { useState, ChangeEvent } from "react";
import { Box, Select } from "@chakra-ui/react";
import Line from "../../components/Line";

interface Props {
  parentCallback: (newType: Item | undefined) => void;
}

const astralDeliItems = $items`none, astral hot dog dinner, astral six-pack, [10882]carton of astral energy drinks`;

const AstralDeliSelector: React.FC<Props> = ({ parentCallback }) => {
  const [selectedAstralDeli = $item`none`, setSelectedAstralDeli] =
    useState<Item>();

  const selectAstralDeli = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = $item`${event.target.value}`;
    setSelectedAstralDeli(value);
    parentCallback?.(value);
  };

  return (
    <Box alignSelf="stretch" alignContent="flex-start">
      <Line>Astral Deli:</Line>
      <Select
        onChange={selectAstralDeli}
        value={selectedAstralDeli.identifierString}
      >
        {astralDeliItems.map((deliItem) => {
          return (
            <option
              value={deliItem.identifierString}
              key={deliItem.identifierString}
            >
              {deliItem.identifierString ===
              "[10882]carton of astral energy drinks"
                ? "carton of astral energy drinks"
                : deliItem.identifierString}
            </option>
          );
        })}
      </Select>
    </Box>
  );
};

export default AstralDeliSelector;
