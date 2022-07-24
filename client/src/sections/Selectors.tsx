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
const classNumbers = new Map<string, number>([
  ["Accordion Thief", 6],
  ["Avatar of Boris", 11],
  ["Avatar of Jarlsberg", 14],
  ["Avatar of Sneaky Pete", 15],
  ["Beanslinger", 19],
  ["Cow Puncher", 18],
  ["Disco Bandit", 5],
  ["Ed the Undying", 17],
  ["Gelatinous Noob", 23],
  ["Grey Goo", 27],
  ["Pastamancer", 3],
  ["Plumber", 25],
  ["Sauceror", 4],
  ["Seal Clubber", 1],
  ["Snake Oiler", 20],
  ["Turtle Tamer", 2],
  ["Vampyre", 24],
  ["Zombie Master", 12],
]);
const Selectors = () => {
  const [selectedPath = "0", setSelectedPath] = useState<string>();
  const [selectedClass = "1", setSelectedClass] = useState<string>();
  const [selectedSign = "1", setSelectedSign] = useState<string>();

  const selectPath = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedPath(value);
    event.preventDefault();
  };

  const selectClass = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedClass(value);
    event.preventDefault();
  };

  const selectSign = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedSign(value);
    event.preventDefault();
  };

  return (
    <VStack width="fit-content" marginLeft={4} marginTop={4}>
      <Select onChange={selectPath} value={selectedPath}>
        {paths.map((path) => {
          return (
            <option value={path.id.toString()} key={path.id.toString()}>
              {path.name}
            </option>
          );
        })}
      </Select>
      <Select onChange={selectClass} value={selectedClass}>
        {paths
          .find((path) => path.id === parseInt(selectedPath))
          ?.classes.map((availableClass) => {
            return (
              <option
                value={classNumbers
                  .get(availableClass.identifierString)
                  ?.toString()}
                key={classNumbers
                  .get(availableClass.identifierString)
                  ?.toString()}
              >
                {availableClass.identifierString}
              </option>
            );
          })}
      </Select>
      <Select onChange={selectSign} value={selectedSign}>
        {moonsigns.map((sign) => {
          return (
            <option value={sign[0].toString()} key={sign[0].toString()}>
              {sign[1]}
            </option>
          );
        })}
      </Select>
    </VStack>
  );
};

export default Selectors;
