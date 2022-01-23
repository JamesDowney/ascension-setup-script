import React from "react";
import { InfoIcon, IconProps } from "@chakra-ui/icons";
import {
  Text,
  HStack,
  VStack,
  Image,
  Icon,
  Tooltip,
  TooltipProps,
  ComponentWithAs,
} from "@chakra-ui/react";

interface AdviceProps {
  text: string;
  icon?: ComponentWithAs<"svg", IconProps>;
}

const AdviceTip: React.FC<TooltipProps> = ({ ...props }) => (
  <Tooltip
    bg="white"
    color="gray.600"
    border="1px"
    borderColor="gray.400"
    shadow="xs"
    rounded="md"
    hasArrow
    arrowSize={10}
    arrowShadowColor="gray" // NOTE: The "gray.400" style colors don't work in this field.
    ml="5"
    mr="5"
    p="3"
    /*Anything defined prior to {...props} is overriden by anything passed in*/
    {...props}
  />
);

/**
 * A tooltip with a skull that states whatever text you want at the player.
 * @param text The text you want displayed in this tooltip.
 * @param icon (optional) Defaults to a ? info icon. Can be any icon within chakra-ui/icon.
 * @returns A React.FC Tooltip object where the displayed icon generates the tooltip on hoverover.
 */
export const AdviceTooltip: React.FC<AdviceProps> = ({ text, icon }) => {
  const toolTip = [
    <HStack px={2}>
      <Image
        src={"images/itemimages/yorick.gif"}
        alt={"Yorick, the Skeleton"}
        boxSize="30px"
        fit="contain"
      />
      <VStack align="stretch" spacing={0.3}>
        <HStack>
          <Text bg="gray.200" p="4" rounded="md" fontSize={"12"}>
            {text}
          </Text>
        </HStack>
      </VStack>
    </HStack>,
  ];

  return (
    <AdviceTip label={toolTip}>
      <Icon as={icon ? icon : InfoIcon} color="gray.500" h={3.5} w={3.5} />
    </AdviceTip>
  );
};

// EVERYTHING BELOW THIS IS A WORK-IN-PROGRESS
//   End goal is a tooltip that displays actual effect info on hoverover for a skill/effect.
//   Currently styled as blue because that's how effects are spawned in the game.

const EffectTip: React.FC<TooltipProps> = ({ ...props }) => (
  <Tooltip
    bg="white"
    color="blue.500"
    border="1px"
    borderColor="lightskyblue"
    rounded="md"
    shadow="none"
    hasArrow
    arrowSize={10}
    arrowShadowColor="lightskyblue"
    ml="2"
    mr="2"
    p="2"
    isOpen //remove later
    /*Anything defined prior to {...props} is overriden by anything passed in*/
    {...props}
  />
);

interface EffectSummaryProps {
  effectName: string;
  text: string;
}

export const EffectTooltip: React.FC<EffectSummaryProps> = ({
  effectName,
  text,
}) => {
  return (
    <EffectTip label={text}>
      <Text
        as="span"
        fontWeight="bold"
        color="gray.500"
        decoration={"underline dotted lightsteelblue"}
      >
        {effectName}
      </Text>
    </EffectTip>
  );
};
