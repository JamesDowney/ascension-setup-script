import React from "react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { HStack, List, ListIcon, ListItem } from "@chakra-ui/react";
import Line from "../../components/Line";
import Tile from "../../components/Tile";
import { useGetProperty } from "../../hooks/useCall";
import useGet from "../../hooks/useGet";
import useHave from "../../hooks/useHave";
import { $skill } from "../../util/makeValue";
import { plural } from "../../util/text";

interface ChevronProps {
  usesLeft: number;
  totalUses: number;
}

/**
 * Generate fading chevrons to describe # of a resource left out of total casts
 * @returns Three <ListIcon> objects colored by availability of the resource
 * @param usesLeft How many casts/uses you have left of the resource
 * @param totalUses Total number of uses the users has
 */
const Chevrons: React.FC<ChevronProps> = ({ usesLeft, totalUses }) => {
  return (
    <HStack display="inline-flex" verticalAlign="middle" spacing={-2.5}>
      {new Array(totalUses).fill(null).map((_, index) => (
        <ChevronRightIcon // I tried a few types of icons. This was the best, for now.
          key={index}
          color={index < usesLeft ? "black" : "gray.400"}
        />
      ))}
    </HStack>
  );
};

/**
 * Summarizes availability of buffs & nostalgia; no recommendations, and Hatred is covered in banishes.
 * @returns A tile describing Emotion Chip skills (except Hatred!)
 */

const EmotionChip = () => {
  const playerIsChipped = useHave($skill`Emotionally Chipped`);
  const nostalgiaMonster = useGetProperty("lastCopyableMonster");

  // Associating skills with the # remaining of each of them.
  const emoChipSkills = {
    "Feel Envy": 3 - useGet("_feelEnvyUsed"),
    "Feel Excitement": 3 - useGet("_feelExcitementUsed"),
    "Feel Lonely": 3 - useGet("_feelLonelyUsed"),
    "Feel Nostalgic": 3 - useGet("_feelNostalgicUsed"),
    "Feel Pride": 3 - useGet("_feelPrideUsed"),
    "Feel Peaceful": 3 - useGet("_feelPeacefulUsed"),
  };

  // Turning the skills into list items w/ chevron coloring based on # left
  const listItems = Object.entries(emoChipSkills).map(function (entry) {
    const skillName = entry[0];
    const casts = entry[1];
    return (
      <ListItem pl="1">
        <ListIcon as={Chevrons} usesLeft={casts} totalUses={3} />
        {plural(casts, "cast")} of {skillName}{" "}
        {skillName === "Feel Nostalgic" ? `(${nostalgiaMonster})` : ""}
      </ListItem>
    );
  });

  // To-Do list for this tile:
  //   - Determine if we actually want Feel Lost visualized. I think not!
  //   - My lean is to not include hatred and leave it for the banish tile I'm making.
  return (
    <Tile
      header="Emotion Chip"
      imageUrl="/images/itemimages/emochip1.gif"
      hide={!playerIsChipped}
    >
      <Line>
        <List>{listItems}</List>
      </Line>
    </Tile>
  );
};

export default EmotionChip;
