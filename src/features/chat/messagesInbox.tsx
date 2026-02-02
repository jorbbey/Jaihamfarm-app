import { Box, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../../hooks/services/supabase";
import { useUser } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

function MessagesInbox() {
  const { user } = useUser();
  const [conversations, setConversations] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    supabase
      .from("conversations")
      .select(`
        id,
        last_message_at,
        buyer_id,
        seller_id,
        product:products ( title )
      `)
      .order("last_message_at", { ascending: false })
      .then(({ data }) => setConversations(data || []));
  }, [user]);

  return (
    <Box maxW="600px" mx="auto" mt={10}>
      <VStack align="stretch" gap={3}>
        {conversations.map((c) => (
          <Box
            key={c.id}
            p={4}
            borderWidth="1px"
            borderRadius="md"
            cursor="pointer"
            onClick={() => navigate(`/messages/${c.id}`)}
          >
            <Text fontWeight="bold">
              {c.product?.title ?? "General Conversation"}
            </Text>
            <Text fontSize="sm" color="gray.500">
              Tap to open chat
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

export default MessagesInbox