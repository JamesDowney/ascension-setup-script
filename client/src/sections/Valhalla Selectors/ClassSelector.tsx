import { Class } from "kolmafia";
import { $class, Path } from "libram";
import { useState } from "react";
import { Box, Select } from "@chakra-ui/react";
import Line from "../../components/Line";

interface Props {
  path: Path;
  parentCallback?: (newType: Class | undefined) => void;
}

const ClassSelector: React.FC<Props> = ({ path, parentCallback }) => {
  const [selectedClass = $class`Seal Clubber`, setSelectedClass] =
    useState<Class>();

  const selectClass = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = $class`${event.target.value}`;
    setSelectedClass(value);
    parentCallback?.(value);
  };

  return (
    <Box alignSelf="stretch" alignContent="flex-start">
      <Line>Class:</Line>
      <Select
        disabled={path.classes.length === 1}
        value={selectedClass.identifierString}
        onChange={selectClass}
      >
        {path.classes.map((pathClass) => {
          return (
            <option
              value={pathClass.identifierString}
              key={pathClass.identifierString}
            >
              {pathClass.identifierString}
            </option>
          );
        })}
      </Select>
    </Box>
  );
};

export default ClassSelector;
