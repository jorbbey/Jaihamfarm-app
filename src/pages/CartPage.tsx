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
import { useUser } from "../hooks/useUser";
import { getOrCreateConversation } from "../hooks/useConversation";

export default function CartPage({ item }: { item: any }) {
  const { cart, removeFromCart } = useCart();
  const { user } = useUser()
  const navigate = useNavigate();

  if (cart.length === 0) {
    return <Text mt={20} textAlign="center">Your cart is empty</Text>;
  }
  
  async function handleMessageSeller() {
     if (!user) return;
 
     const conversationId = await getOrCreateConversation({
       buyerId: user.id,
       sellerId: item.seller_id,
       productId: item.product_id,
     });
 
     navigate(`/messages/${conversationId}`);
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
                onClick={handleMessageSeller}
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
