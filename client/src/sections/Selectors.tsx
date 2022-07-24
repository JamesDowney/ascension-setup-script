import { Paths } from "libram";
import React, { useState } from "react";
import { Select, VStack } from "@chakra-ui/react";

const paths = Object.values(Paths);
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

const Selectors = () => {
  const [selectedPath = 0, setSelectedPath] = useState<number>();
  const [selectedClass = 1, setSelectedClass] = useState<number>();
  const [selectedSign = 1, setSelectedSign] = useState<number>();

  const selectPath = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value);
    setSelectedPath(value);
    event.preventDefault();
  };

  const selectClass = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value);
    setSelectedClass(value);
    event.preventDefault();
  };

  const selectSign = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value);
    setSelectedSign(value);
    event.preventDefault();
  };

  return (
    <VStack width="fit-content" marginLeft={4} marginTop={4}>
      <Select onChange={selectPath} value={selectedPath}>
        {paths.map((path) => {
          return (
            <option value={path.id.toString()} key={path.id}>
              {path.name}
            </option>
          );
        })}
      </Select>
      <Select onChange={selectClass} value={selectedClass}>
        {paths
          .find((path) => path.id === selectedPath)
          ?.classes.map((availableClass) => {
            return (
              <option
                value={availableClass.identifierNumber}
                key={availableClass.identifierNumber}
              >
                {availableClass.identifierString}
              </option>
            );
          })}
      </Select>
      <Select onChange={selectSign} value={selectedSign}>
        {moonsigns.map((sign) => {
          return (
            <option value={sign[0]} key={sign[0]}>
              {sign[1]}
            </option>
          );
        })}
      </Select>
    </VStack>
  );
};

export default Selectors;
