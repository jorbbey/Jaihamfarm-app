
import { Grid, GridItem } from "@chakra-ui/react";
import FiltersSidebar from "../features/marketplace/filtersSideBar";
import ProductGrid from "../features/marketplace/productGrid";
import MarketplaceHeader from "../features/marketplace/marketPlaceHeader";
import NavBar from "../components/common/navbar";
import Footer from "../components/common/footer";
import { useMarketplace } from "../hooks/useMarketPlace";

function MarketplacePage() {
  const { refetch } = useMarketplace();

  return (
    <>
      <NavBar />
      <Grid templateColumns="260px 1fr" gap={6} px={4}>
        <FiltersSidebar />
        <GridItem mt='20'>
          <MarketplaceHeader onRefresh={refetch} />
          <ProductGrid />
        </GridItem>
      </Grid>
      <Footer />
    </>

  );
}

export default MarketplacePage