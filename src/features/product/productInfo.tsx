import {
  Box,
  Heading,
  Text,
  Badge,
  HStack,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { FiMinus, FiPlus } from "react-icons/fi";

function ProductInfo({
  qty,
  setQty,
}: {
  qty: number;
  setQty: (v: number) => void;
}) {
  return (
    <Box mb={6}>
      <Heading size="lg">Organic Heirloom Tomatoes (5 lbs)</Heading>
      <Text fontSize="xl" color="green.600" fontWeight="bold" mt={2}>
        $24.99
      </Text>

      <Badge colorScheme="green" mt={2}>
        In Stock
      </Badge>

      <HStack mt={4}>
        <IconButton
          aria-label="decrease"
          size="sm"
          onClick={() => setQty(Math.max(1, qty - 1))}
        >
          <FiMinus />
        </IconButton>
        <Text>{qty}</Text>
        <IconButton
          aria-label="increase"
          size="sm"
          onClick={() => setQty(qty + 1)}
        >
          <FiPlus />
        </IconButton>
      </HStack>

      <HStack mt={4}>
        <Button colorScheme="blue">Add to Cart</Button>
        <Button variant="outline">Ask Seller</Button>
      </HStack>

      <Text mt={4} color="gray.600">
        Our organic heirloom tomatoes are hand-picked at peak ripeness, offering
        a rich, complex flavor profile perfect for salads, sauces, or simply
        enjoyed fresh.
      </Text>
    </Box>
  );
}

export default ProductInfo;
