import _ from "lodash";

export default function getCardImageUrl(cardData) {
  const BASE_IMAGE_URL = "http://www.cardgamedb.com/forums/uploads/sw";

  /*
    Starting with the set “darkness and light”, the images are named by "set number"
      (ffg_SWC<set-number>_<block>-<block_number>.png)
    Prior to that, they’re named like
      (ffg_<card-name-kebab-case>-<set-name-kebab-case>-<block>-<block_number>.png)
  */

  if(cardData.set.release_order >= 15) {
    return `${BASE_IMAGE_URL}/ffg_SWC${cardData.set.release_order}_${cardData.block}-${cardData.block_number}.png`;
  } else {
    return `${BASE_IMAGE_URL}/ffg_${_.kebabCase(cardData.name)}-${_.kebabCase(cardData.set.name)}-${cardData.block}-${cardData.block_number}.png`;
  }
}
