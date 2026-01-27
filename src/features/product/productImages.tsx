import { Box, Image, HStack } from "@chakra-ui/react";


function ProductImages() {
  return (
    <Box mb={6}>
      <Image
        src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea"
        borderRadius="md"
        w="100%"
        h="400px"
        objectFit="cover"
      />

      <HStack mt={3} gap={3}>
        {[1, 2, 3, 4].map((i) => (
          <Image
            key={i}
            src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea"
            boxSize="70px"
            borderRadius="md"
            objectFit="cover"
            cursor="pointer"
          />
        ))}
      </HStack>
    </Box>
  );
}


export default ProductImages