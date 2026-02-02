import { useEffect, useState } from "react";
import {
  Box,
  Button,
  HStack,
  Input,
  VStack,
  Text,
  Flex
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { supabase } from "../hooks/services/supabase";
import { useUser } from "../hooks/useUser";
import NavBar from "../components/common/navbar";
import Footer from "../components/common/footer";
import Sidebar from "../components/common/sideBar";

type Message = {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
};

export default function ChatPage() {
  const { id: conversationId } = useParams();
  const { user } = useUser();

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  /* ----------------------------------------
     1. FETCH EXISTING MESSAGES
  -----------------------------------------*/
  useEffect(() => {
    if (!conversationId) return;

    async function fetchMessages() {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (!error && data) {
        setMessages(data);
      }

      setLoading(false);
    }

    fetchMessages();
  }, [conversationId]);

  /* ----------------------------------------
     2. REALTIME SUBSCRIPTION
  -----------------------------------------*/
  useEffect(() => {
    if (!conversationId) return;

    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  /* ----------------------------------------
     3. SEND MESSAGE
  -----------------------------------------*/
  async function sendMessage() {
    if (!text.trim() || !user) return;

    const newMessage = {
      conversation_id: conversationId,
      sender_id: user.id,
      content: text,
    };

    setText("");

    const { error } = await supabase.from("messages").insert(newMessage);

    if (error) {
      console.error("Send message error:", error);
    }
  }

  return (
    <>
      <NavBar />
      <Flex>
        <Sidebar width='220px' />
        <Box w="70%" mx="auto" mt={28} mb={10} px={4}>
          <VStack gap={4} align="stretch">
            {/* Messages */}
            <Box
              borderWidth="1px"
              borderRadius="md"
              p={4}
              h="60vh"
              overflowY="auto"
            >
              {loading && <Text>Loading messages...</Text>}
    
              {messages.map((msg) => (
                <Box
                  key={msg.id}
                  alignSelf={
                    msg.sender_id === user?.id ? "flex-end" : "flex-start"
                  }
                  bg={msg.sender_id === user?.id ? "gray.100" : "gray.100"}
                  px={3}
                  py={2}
                  borderRadius="md"
                  maxW="70%"
                  mb={2}
                  fontSize='xs'
                >
                  <Text>{msg.content}</Text>
                </Box>
              ))}
            </Box>
    
            {/* Input */}
            <HStack>
              <Input
                placeholder="Type a message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <Button colorPalette="green" onClick={sendMessage}>
                Send
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Flex>

      
      <Footer />
    </>

  );
}
