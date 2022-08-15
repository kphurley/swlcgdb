/*
  Separate traits into a joined string ending in periods, removing "Unique"
*/

export function formatCardTraits(traitsText) {
  return traitsText
          .split("-")
          .filter((trait) => trait !== "Unique")
          .map((trait) => `${trait}.`)
          .join(" ");
}
