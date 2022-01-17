import { Box, Image } from "@chakra-ui/react";

interface Props {
  imageUrl?: string;
  imageAlt?: string;
}

const TileImage: React.FC<Props> = ({ imageUrl, imageAlt }) =>
  imageUrl ? (
    <Image src={imageUrl} alt={imageAlt} boxSize="30px" fit="contain" />
  ) : (
    <Box w="30px" />
  );

export default TileImage;
