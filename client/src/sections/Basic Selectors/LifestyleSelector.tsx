import { Lifestyle } from "libram";
import { useState } from "react";
import { Box, Select } from "@chakra-ui/react";
import Line from "../../components/Line";

interface Props {
  parentCallback?: (newType: Lifestyle) => void;
}

const LifestyleSelector: React.FC<Props> = ({ parentCallback }) => {
  const [selectedLifestyle = Lifestyle.casual, setSelectedLifestyle] =
    useState<Lifestyle>();

  const selectLifestyle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value =
      event.target.value === "1"
        ? Lifestyle.casual
        : event.target.value === "2"
        ? Lifestyle.normal
        : Lifestyle.hardcore;
    setSelectedLifestyle(value);
    event.preventDefault();
    parentCallback?.(value);
  };

  return (
    <Box alignSelf="stretch" alignContent="flex-start">
      <Line>Lifestyle:</Line>
      <Select onChange={selectLifestyle} value={selectedLifestyle}>
        <option value="1" key="1">
          Casual
        </option>
        <option value="2" key="2">
          Normal
        </option>
        <option value="3" key="3">
          Hardcore
        </option>
      </Select>
    </Box>
  );
};

export default LifestyleSelector;
