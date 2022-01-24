import Line from "../../components/Line";
import QuestTile from "../../components/QuestTile";
import { useHaveOutfit, useIsWearingOutfit } from "../../hooks/useCall";
import useFull from "../../hooks/useFull";
import useHave from "../../hooks/useHave";
import { atStep, Step, useQuestStep } from "../../hooks/useQuest";
import { inventory } from "../../util/links";
import { $effect, $item, $location } from "../../util/makeValue";
import { plural } from "../../util/text";

const Level5: React.FC = () => {
  const step = useQuestStep("questL05Goblin");
  const turnsSpent =
    useFull($location`The Outskirts of Cobb's Knob`)?.turnsSpent ?? 0;
  const haveKey = useHave($item`Knob Goblin encryption key`);
  const haveOutfit = useHaveOutfit("Knob Goblin Harem Girl Disguise");
  const havePerfume = useHave($effect`Knob Goblin Perfume`);
  const equippedOutfit = useIsWearingOutfit("Knob Goblin Harem Girl Disguise");

  return (
    <QuestTile
      header="Knob Goblin King"
      imageUrl="/images/adventureimages/cobbsknob.gif"
      minLevel={haveKey ? 5 : undefined}
      hide={step === Step.FINISHED}
    >
      {step < 1 && turnsSpent < 10 && !haveKey ? (
        <Line>
          Burn {plural(10 - turnsSpent, "turn")} of delay in the Outskirts to
          find the encryption key.
        </Line>
      ) : (
        atStep(step, [
          [Step.UNSTARTED, <Line>Visit Council to start quest.</Line>],
          [
            Step.STARTED,
            <Line>
              {haveKey
                ? "Use Cobb's Knob map to go inside."
                : "Adventure in the Outskirts to find the encryption key."}
            </Line>,
          ],
          [
            1,
            !haveOutfit ? (
              <Line>Acquire the Harem Girl Disguise.</Line>
            ) : !equippedOutfit ? (
              <Line href={inventory("Knob Goblin harem")}>
                Equip the Harem Girl Disguise.
              </Line>
            ) : !havePerfume ? (
              <Line>
                Adventure in the Harem to get the Knob Goblin Perfume effect.
              </Line>
            ) : (
              <Line>Fight the Knob Goblin King!</Line>
            ),
          ],
        ])
      )}
    </QuestTile>
  );
};

export default Level5;
