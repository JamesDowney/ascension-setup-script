import { Lifestyle, Path, Paths } from "libram";
import React, { useState } from "react";
import { Box, Select } from "@chakra-ui/react";
import Line from "../../components/Line";

interface Props {
  lifestyle: Lifestyle;
  parentCallback?: (newType: Path | undefined) => void;
}

const paths = Object.values(Paths);

const PathSelector: React.FC<Props> = ({ lifestyle, parentCallback }) => {
  const [selectedPath = Paths.Unrestricted, setSelectedPath] = useState<Path>();

  const selectPath = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = paths.find((path) => path.name === event.target.value);
    setSelectedPath(value);
    event.preventDefault();
    parentCallback?.(value);
  };

  return (
    <Box alignSelf="stretch" alignContent="flex-start">
      <Line>Path:</Line>
      <Select
        value={
          (lifestyle !== Lifestyle.casual ? selectedPath : Paths.Unrestricted)
            .name
        }
        disabled={lifestyle === Lifestyle.casual}
        onChange={selectPath}
      >
        {paths.map((path) => {
          return (
            <option value={path.name} key={path.id.toString()}>
              {path.name}
            </option>
          );
        })}
      </Select>
    </Box>
  );
};

export default PathSelector;
