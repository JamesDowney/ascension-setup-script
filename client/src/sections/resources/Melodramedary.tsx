import { floor } from "lodash";
import Line from "../../components/Line";
import Tile from "../../components/Tile";
import { useMyAscensions, useMyLevel } from "../../hooks/useCall";
import useGet from "../../hooks/useGet";
import useHave from "../../hooks/useHave";
import { $familiar, $item } from "../../util/makeValue";

/**
 * Class used to store spit targets. Unless otherwise specified, all params are strings.
 * @param item The item targeted
 * @param monster The monster in question
 * @param zone The zone you'll find the monster in
 * @param level The level this spit target becomes feasible (number)
 * @param access A way to pass in a custom condition for accessibility (boolean)
 */

class spitTarget {
  item: string;
  monster: string;
  zone: string;
  level: number;
  access: boolean;
  spitQuality: number;

  constructor(
    item: string,
    monster: string,
    zone: string,
    level: number,
    access?: boolean,
    spitQuality?: number
  ) {
    this.item = item;
    this.monster = monster;
    this.zone = zone;
    this.level = level;
    this.access = access ?? true;
    this.spitQuality = spitQuality ?? 4;
  }

  // Instead of crazy canAdv type stuff, this just shows spits if you are at a level higher than the level the spit would become accessible and combines that with an access parameter that has been passed in.
  accessible(userLevel: number): boolean {
    return this.access && userLevel > this.level;
  }

  // Returns a string formatted to appear in <Line> statements
  formatString(): string {
    let output: string = " • " + this.item + " via " + this.monster;
    return output;
  }

  // Small note regarding this class; yes, it's sparse, I know. I mostly like it
  //   as an example of how to do formatting within your recommendations, and think
  //   when we get to the point we can do tooltips within YORICK this construction
  //   will make it -much- easier to develop tooltips.
}

/**
 * Summarizes turns til a spit, and gives advice on what to spit based on what is accessible.
 * @returns A tile describing the Melodramedary
 */

const Melodramedary = () => {
  const haveDrinkingHelmet = useHave($item`dromedary drinking helmet`);
  const spitProgress = useGet("camelSpit") ?? 0;
  const userLevel = useMyLevel() ?? 0; // used for quest-specific recommendations
  const ascensionNumber = useMyAscensions() ?? 1;
  const hitsMonster = ascensionNumber % 2 === 0 ? "Camel's Toe" : "Skinflute";
  const nostalgiaUses = useGet("_feelNostalgicUsed");

  // I wanted to create these upfront to make the spit target declaration a little cleaner. Also, I feel like we may eventually have a central source of truth for the questy stuff, so I wanted to be able to swap out easily.
  const bowlingRequirements = !(useGet("hiddenBowlingAlleyProgress") > 4);
  const gsbRequirements = !(useGet("warProgress") === "finished");
  const starKeyRequirements =
    useGet("questL10Garbage") in ["step10", "finished"];
  const gunpowderRequirements =
    useGet("sidequestLighthouseCompleted") === "none" && gsbRequirements;
  const evilEyeRequirements = !(useGet("cyrptNookEvilness") < 35);
  const mojoFilterRequirements = useGet("desertExploration") > 0;

  // Remove tile if the user does not have a camel.
  if (!useHave($familiar`Melodramedary`)) {
    return <></>;
  }

  // This long statement attempts to build out recommendations. Here are the rankings I used.
  //   - #1: Bowling Balls (4 turns, if you need 4 balls)
  //   - #2: GSBs (3.6 turns)
  //   - #3: Star Key (~3 turns, hard to value!)
  //   - #4: Barrels of Gunpowder (2 turns, saves 2 backups as a nostalgia-spit)
  //   - #5: Evil Eyes (2-ish turns, hard to value!)
  //   - #6: Mojo Filters (Very good in unrestricted paths in CMC meta, likely 2.5-3 turns but 1 in standard, if even that)

  const allSpitTargets = [
    new spitTarget(
      "Bowling Balls",
      "Pygmy Bowlers",
      "The Hidden Bowling Alley",
      11,
      bowlingRequirements
    ),
    new spitTarget(
      "Green Smoke Bombs",
      "Green Ops Soldier",
      "The Battlefield",
      12,
      gsbRequirements
    ),
    new spitTarget(
      "8 stars + 8 lines",
      hitsMonster,
      "The Hole in the Sky",
      10,
      starKeyRequirements
    ),
    new spitTarget(
      "Barrels of Gunpowder",
      "Lobsterfrogman",
      "Sonofa Beach",
      12,
      gunpowderRequirements,
      2
    ),
    new spitTarget(
      "Evil Eyes",
      "All non-partying Skeletons",
      "The Defiled Nook",
      7,
      evilEyeRequirements,
      2
    ),
    new spitTarget(
      "Mojo Filters",
      "A Swarm of Scarab Beatles",
      "The Oasis",
      11,
      mojoFilterRequirements
    ),
  ];

  // We will only display the top 3 recommendations; iterate through the list and stop when recs are full

  let recommendations: spitTarget[] = [];
  for (const target of allSpitTargets) {
    if (recommendations.length === 3) {
      break; // This only populates 3. There's probably a better way to do this?
    }
    if (target.accessible(userLevel)) {
      recommendations.push(target);
    }
  }

  // My to-do list on this tile:
  //   -- Add a nostalgia reminder
  //   -- Figure out what to suggest if no spits accessible
  //   -- Add a "equip your camel helmet, if you have it" reminder
  //   -- Figure out how to add tooltips; then, pass both .formatString and .toolTip via spitTarget

  return (
    <Tile
      header="Melodramedary"
      imageUrl="/images/otherimages/Camelfam_left.gif"
    >
      {spitProgress < 100 && (
        <Line>Current spit progress: {spitProgress}%</Line>
      )}
      {spitProgress < 100 && haveDrinkingHelmet && (
        <Line>
          {floor((100 - spitProgress) / 4.5, 0)} combats until your next spit.
        </Line>
      )}
      {spitProgress < 100 && haveDrinkingHelmet && (
        <Line>
          {floor((100 - spitProgress) / 3, 0)} combats until your next spit.
        </Line>
      )}
      {spitProgress === 100 && (
        <Line>
          <b>READY TO SPIT!</b> Some possible targets:
        </Line>
      )}
      {spitProgress === 100 && recommendations.length > 0 && (
        <Line>{recommendations[0].formatString()}</Line>
      )}
      {spitProgress === 100 && recommendations.length > 1 && (
        <Line>{recommendations[1].formatString()}</Line>
      )}
      {spitProgress === 100 && recommendations.length > 2 && (
        <Line>{recommendations[2].formatString()}</Line>
      )}
      {spitProgress === 100 && nostalgiaUses < 3 && (
        <Line>
          {3 - nostalgiaUses} uses of "Feel Nostalgic" left. Consider using it!
        </Line>
      )}
    </Tile>
  );
};

export default Melodramedary;
