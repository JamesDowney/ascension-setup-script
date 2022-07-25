import { Item, eudoraItem } from "kolmafia";
import { $item, have, Path } from "libram";
import { ChangeEvent, useState } from "react";
import { Box, Select } from "@chakra-ui/react";
import Line from "../../components/Line";

const eudoras = new Map<string, Item>([
  ["Pen Pal", $item`My Own Pen Pal kit`],
  [
    "GameInformPowerDailyPro Magazine",
    $item`GameInformPowerDailyPro subscription card`,
  ],
  ["Xi Receiver Unit", $item`Xi Receiver Unit`],
  ["New-You Club", $item`New-You Club Membership Form`],
  ["Our Daily Candles", $item`Our Daily Candles™ order form`],
]);
const availableEudoras = Array.from(eudoras.values()).filter((correspondence) =>
  have(correspondence)
);
const myEudora = eudoraItem();

interface Props {
  path?: Path;
  parentCallback?: (newType: Item | undefined) => void;
}

const EudoraSelector: React.FC<Props> = ({ parentCallback }) => {
  const [selectedEudora = myEudora, setSelectedEudora] = useState<Item>();

  const selectEudora = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = $item`${event.target.value}`;
    setSelectedEudora(value);
    parentCallback?.(value);
  };

  return (
    <Box
      alignSelf="stretch"
      alignContent="flex-start"
      hidden={myEudora === $item`none` && availableEudoras.length === 0}
    >
      <Line>Correspondence:</Line>
      <Select
        disabled={availableEudoras.length === 0}
        onChange={selectEudora}
        value={selectedEudora.identifierString}
      >
        <option
          value={myEudora.identifierString}
          key={myEudora.identifierString}
          selected
        >
          {myEudora.identifierString}
        </option>
        {availableEudoras.map((ownedEudora) => {
          return (
            <option
              value={ownedEudora.identifierString}
              key={ownedEudora.identifierString}
            >
              {ownedEudora.identifierString}
            </option>
          );
        })}
      </Select>
    </Box>
  );
};

export default EudoraSelector;
