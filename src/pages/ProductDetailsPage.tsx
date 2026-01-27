import {
  Box,
  Grid,
  GridItem,
  Image,
  HStack,
  VStack,
  Text,
  Button,
  Heading,
  Spinner,
  Alert,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../hooks/services/supabase";
import NavBar from "../components/common/navbar";
import Footer from "../components/common/footer";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  user_id: string;
  seller_id: string;
}

function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const navigate = useNavigate()


  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setError("Unable to load product");
      } else {
        setProduct(data);
        setActiveImage(data.images?.[0] ?? null);
      }

      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Box mt="120px" textAlign="center">
        <Spinner size="lg" />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Alert.Root status="error" mt="120px">
        <Alert.Indicator />
        {error || "Product not found"}
      </Alert.Root>
    );
  }
  
  function addToCart(product: Product) {
    const existing = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
  
    const alreadyInCart = existing.find(
      (item: any) => item.id === product.id
    );
  
    if (alreadyInCart) return;
  
    localStorage.setItem(
      "cart",
      JSON.stringify([...existing, product])
    );
  }


  return (
    <>
      <NavBar />
      
      <Box maxW="1200px" mx="auto" mt="80px" mb='10' px={4}>
        <Grid templateColumns={{ base: "1fr", md: "1.2fr 1fr" }} gap={8}>
          {/* LEFT – IMAGES */}
          <GridItem>
            <Image
              src={activeImage ?? ""}
              alt={product.title}
              borderRadius="md"
              w="100%"
              h="420px"
              objectFit="cover"
            />
  
            {product.images?.length > 1 && (
              <HStack mt={3} gap={3}>
                {product.images.map((img) => (
                  <Image
                    key={img}
                    src={img}
                    boxSize="70px"
                    borderRadius="md"
                    objectFit="cover"
                    cursor="pointer"
                    border={
                      activeImage === img
                        ? "2px solid #2f8f57"
                        : "1px solid #e2e8f0"
                    }
                    onClick={() => setActiveImage(img)}
                  />
                ))}
              </HStack>
            )}
          </GridItem>
  
          {/* RIGHT – DETAILS */}
          <GridItem>
            <VStack align="start" gap={4}>
              <Heading size="lg">{product.title}</Heading>
  
              <Text fontSize="xl" fontWeight="bold" color="green.600">
                ₦{product.price.toLocaleString()}
              </Text>
  
              <Text fontSize="sm" color="gray.500">
                Category: {product.category}
              </Text>
  
              <Text color="gray.700">{product.description}</Text>
  
              {/*<Button
                mt={4}
                size="lg"
                bg="#2f8f57"
                color="white"
                _hover={{ bg: "#287a4b" }}
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </Button>
              
              <Button
                 variant="outline"
                 onClick={() => navigate(`/messages/${product.seller_id}`)}
               >
                 Message Seller
               </Button>*/}
              
              <HStack mt={4} gap={3}>
                <Button
                  mt={4}
                  size="lg"
                  bg="#2f8f57"
                  color="white"
                  _hover={{ bg: "#287a4b" }}
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </Button>
              
                <Button
                  variant="outline"
                  onClick={() => navigate(`/messages/${product.seller_id}`)}
                >
                  Message Seller
                </Button>
              </HStack>
  
             
            </VStack>
          </GridItem>
        </Grid>
      </Box>
      
      <Footer/>
    </>
   
  );
}

export default ProductDetailsPage