export default function getCardImageUrl(cardData) {
  const BASE_IMAGE_URL = "https://swlcg-card-images.nyc3.digitaloceanspaces.com/cards";

  return `${BASE_IMAGE_URL}/${cardData.block}-${cardData.block_number}.jpg`;
}
