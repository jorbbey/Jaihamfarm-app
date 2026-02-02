import { supabase } from "./services/supabase";

export async function getOrCreateConversation({
  buyerId,
  sellerId,
  productId,
}: {
  buyerId: string;
  sellerId: string;
  productId?: string;
}): Promise<string> {
  const { data: existing } = await supabase
    .from("conversations")
    .select("id")
    .eq("buyer_id", buyerId)
    .eq("seller_id", sellerId)
    .eq("product_id", productId)
    .maybeSingle();

  if (existing?.id) return existing.id;

  const { data, error } = await supabase
    .from("conversations")
    .insert({
      buyer_id: buyerId,
      seller_id: sellerId,
      product_id: productId,
    })
    .select("id")
    .single();

  if (error) {
    console.log("Conversation creation error: ", error); 
    throw error; }
  return data.id;
}
