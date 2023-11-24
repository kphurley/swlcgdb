import React from "react";
import _ from "lodash";

import BlastIcon from "../icons/blast_icon.svg";
import BlastIconWhite from "../icons/blast_icon_edge_border.svg";
import GunIcon from "../icons/gun_icon.svg";
import GunIconWhite from "../icons/gun_icon_edge_border.svg";
import TacticsIcon from "../icons/tactics_icon.svg";
import TacticsIconWhite from "../icons/tactics_icon_edge_border.svg";

// Given the combat_icons string from a card object,
// Split this into a series of tuples of the form
// ['UD', 0], ['BD', 0], ...
// and then parse those to generate the icon markup
export default function getIconsFromIconString(iconString) {
  const parsedIconTuples = iconString.split(",").map((str) => str.trim()).map((str) => str.split(":"));

  return (
    <>
      { parsedIconTuples[0][1] > 0 && _.times(parsedIconTuples[0][1], (idx) => <GunIcon key={`${parsedIconTuples[0][0]}-${idx}`}/>) }
      { parsedIconTuples[1][1] > 0 && _.times(parsedIconTuples[1][1], (idx) => <BlastIcon key={`${parsedIconTuples[0][0]}-${idx}`}/>) }
      { parsedIconTuples[2][1] > 0 && _.times(parsedIconTuples[2][1], (idx) => <TacticsIcon key={`${parsedIconTuples[0][0]}-${idx}`}/>) }
      { parsedIconTuples[3][1] > 0 && _.times(parsedIconTuples[3][1], (idx) => <GunIconWhite key={`${parsedIconTuples[0][0]}-${idx}`}/>) }
      { parsedIconTuples[4][1] > 0 && _.times(parsedIconTuples[4][1], (idx) => <BlastIconWhite key={`${parsedIconTuples[0][0]}-${idx}`}/>) }
      { parsedIconTuples[5][1] > 0 && _.times(parsedIconTuples[5][1], (idx) => <TacticsIconWhite key={`${parsedIconTuples[0][0]}-${idx}`}/> ) }
    </>
  )
};
