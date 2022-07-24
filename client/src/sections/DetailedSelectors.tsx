import { getWorkshed, inHardcore } from "kolmafia";
import { $items, get, have } from "libram";
import React, { useState } from "react";
import { Heading, Select } from "@chakra-ui/react";
import Line from "../components/Line";

const canSwapWorkshed = get("_workshedItemUsed");
const hardcore = inHardcore();
const myWorkshed = getWorkshed();
const worksheds = $items`none, warbear LP-ROM burner, warbear jackhammer drill press, warbear induction oven, warbear high-efficiency still, warbear chemistry lab, warbear auto-anvil, spinning wheel, snow machine, Little Geneticist DNA-Splicing Lab, portable Mayo Clinic, Asdon Martin keyfob, diabolic pizza cube, cold medicine cabinet`;

const DetailedSelectors = () => {
  const [selectedWorkshed = myWorkshed.name, setSelectedWorkshed] =
    useState<string>();

  const selectWorkshed = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedWorkshed(value);
    event.preventDefault();
  };

  return (
    <>
      <Heading size="md" alignSelf="flex-start">
        Detailed Options:
      </Heading>
      <Line alignSelf="flex-start">Workshed:</Line>
      <Select
        disabled={!canSwapWorkshed || hardcore}
        onChange={selectWorkshed}
        value={selectedWorkshed}
      >
        <option
          value={myWorkshed.name?.toString()}
          key={myWorkshed.name?.toString()}
        >
          {myWorkshed.identifierString}
        </option>
        {worksheds
          .filter((workshed) => have(workshed))
          .map((ownedWorkshed) => {
            return (
              <option
                value={ownedWorkshed.name?.toString()}
                key={ownedWorkshed.name?.toString()}
              >
                {ownedWorkshed.identifierString}
              </option>
            );
          })}
      </Select>
    </>
  );
};

export default DetailedSelectors;
