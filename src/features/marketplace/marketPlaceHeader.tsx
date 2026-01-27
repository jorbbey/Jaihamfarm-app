import { HStack, NativeSelect, Spacer, Box} from "@chakra-ui/react";
import CreateProductModal from "./createProductModal";

export default function MarketplaceHeader({ onRefresh }: any) {
  return (
    <HStack mb={6}>
      <NativeSelect.Root size="sm" width="200px">
           <NativeSelect.Field placeholder="Newest">
             <option>Newest</option>
             <option>Price: Low to High</option>
             <option>Price: High to Low</option>
           </NativeSelect.Field>
           <NativeSelect.Indicator />
         </NativeSelect.Root>

      <Spacer />

<CreateProductModal onCreated={onRefresh} />
    </HStack>
  );
}
