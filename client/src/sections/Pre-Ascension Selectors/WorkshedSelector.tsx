import { getWorkshed } from "kolmafia";
import { get, $items, have, Path } from "libram";
import { ChangeEvent, useState } from "react";
import { Box, Select } from "@chakra-ui/react";
import Line from "../../components/Line";

const canSwapWorkshed = !get("_workshedItemUsed");
const myWorkshed = getWorkshed();
const worksheds = $items`warbear LP-ROM burner, warbear jackhammer drill press, warbear induction oven, warbear high-efficiency still, warbear chemistry lab, warbear auto-anvil, spinning wheel, snow machine, Little Geneticist DNA-Splicing Lab, portable Mayo Clinic, Asdon Martin keyfob, diabolic pizza cube, cold medicine cabinet`;
const availableWorksheds = worksheds.filter((workshed) => have(workshed));

interface Props {
  path?: Path;
  parentCallback?: (newType: string | undefined) => void;
}

const WorkshedSelector: React.FC<Props> = ({ parentCallback }) => {
  const [selectedWorkshed = myWorkshed.identifierString, setSelectedWorkshed] =
    useState<string>();

  const selectWorkshed = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedWorkshed(value);
    parentCallback?.(value);
  };

  return (
    <Box alignSelf="stretch" alignContent="flex-start">
      <Line>Workshed:</Line>
      <Select
        disabled={canSwapWorkshed || availableWorksheds.length === 0}
        onChange={selectWorkshed}
        value={selectedWorkshed}
      >
        <option
          value={myWorkshed.identifierNumber}
          key={myWorkshed.identifierNumber}
        >
          {myWorkshed.identifierString}
        </option>
        {availableWorksheds.map((ownedWorkshed) => {
          return (
            <option
              value={ownedWorkshed.identifierNumber}
              key={ownedWorkshed.identifierNumber}
            >
              {ownedWorkshed.identifierString}
            </option>
          );
        })}
      </Select>
    </Box>
  );
};

export default WorkshedSelector;
