import {
  Box,
  Button,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return <Text mt={20} textAlign="center">Your cart is empty</Text>;
  }

  return (
    <Box maxW="900px" mx="auto" mt={20} px={4}>
      <VStack gap={4} align="stretch">
        {cart.map((product) => (
          <HStack
            key={product.id}
            borderWidth="1px"
            borderRadius="md"
            p={3}
            justify="space-between"
          >
            <HStack>
              <Image
                src={product.images?.[0]}
                boxSize="80px"
                objectFit="cover"
                borderRadius="md"
              />
              <Box>
                <Text fontWeight="bold">{product.title}</Text>
                <Text color="green.600">
                  ₦{product.price.toLocaleString()}
                </Text>
              </Box>
            </HStack>

            <HStack>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  navigate(`/messages/${product.seller_id}`)
                }
              >
                Message Seller
              </Button>

              <Button
                size="sm"
                colorScheme="red"
                variant="ghost"
                onClick={() => removeFromCart(product.id)}
              >
                Remove
              </Button>
            </HStack>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}
