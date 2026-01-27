import { useEffect, useState } from "react";
import { supabase } from "./services/supabase";

export function useMarketplace() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  async function fetchProducts() {
    setLoading(true);

    const { data } = await supabase
      .from("products")
      .select(`
        *,
        profiles (
          full_name,
          avatar_url
        )
      `)
      .order("created_at", { ascending: false });

    setProducts(data ?? []);
    setLoading(false);
  }
  
  useEffect(() => {
    fetchProducts();
  }, []);


  return { products, loading, refetch: fetchProducts };
}
