import {
  Box,
  Button,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    price: number;
    images: string[];
    profiles: string[];
    
  }
}

export default function ProductCard({ product }: ProductCardProps ) {
  return (
    <Box as={Link} to={`/marketplace/${product.id}`} borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image
        src={product.images?.[0] || "/placeholder.png"}
        alt={product.title}
        h="180px"
        w="100%"
        objectFit="cover"
      />

      <VStack p={4} align="stretch">
        <Text fontWeight="bold">{product.title}</Text>
        <Text color="green.600" fontWeight="bold">
          ₦ {product.price.toLocaleString()}
        </Text>

        <Text fontSize="sm" color="gray.500">
          {product.profiles?.full_name ?? undefined}
        </Text>

        <Button size="sm" bg='green.600'>
          View Details
        </Button>
      </VStack>
    </Box>
  );
}
