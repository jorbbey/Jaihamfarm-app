import { SimpleGrid, Spinner } from "@chakra-ui/react";
import { useMarketplace } from "../../hooks/useMarketPlace";
import ProductCard from "./productCard";

function ProductGrid() {
  const { products, loading } = useMarketplace();

  if (loading) return <Spinner />;

  return (
    <SimpleGrid columns={[1, 2, 3]} gap={6} py={2}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </SimpleGrid>
  );
}

export default ProductGrid