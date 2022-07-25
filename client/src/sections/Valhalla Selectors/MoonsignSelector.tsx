import { MoonSign } from "kolmafia";
import { useState } from "react";
import { Box, Select } from "@chakra-ui/react";
import Line from "../../components/Line";

const moonsigns = [
  [1, "The Mongoose"],
  [2, "The Wallaby"],
  [3, "The Vole"],
  [4, "The Platypus"],
  [5, "The Opossum"],
  [6, "The Marmot"],
  [7, "The Wombat"],
  [8, "The Blender"],
  [9, "The Packrat"],
];

interface Props {
  parentCallback?: (newType: MoonSign | undefined) => void;
}

const MoonsignSelector: React.FC<Props> = ({ parentCallback }) => {
  const [selectedSign = "1", setSelectedSign] = useState<MoonSign>();

  const selectSign = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value);
    setSelectedSign(value);
    parentCallback?.(value);
  };
  return (
    <Box alignSelf="stretch" alignContent="flex-start">
      <Line>Moonsign:</Line>
      <Select onChange={selectSign} value={selectedSign}>
        {moonsigns.map((sign) => {
          return (
            <option value={sign[0].toString()} key={sign[0].toString()}>
              {sign[1]}
            </option>
          );
        })}
      </Select>
    </Box>
  );
};

export default MoonsignSelector;
