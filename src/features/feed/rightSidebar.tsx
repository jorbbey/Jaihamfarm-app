import { Box, Button, VStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { MdOutlineAdd, MdOutlineRemove } from "react-icons/md";
import CreatePost from "./createPost";

function RightSidebar({ onPostCreated }: { onPostCreated?: () => void }) {
  const [showCreatePost, setShowCreatePost] = useState(false);
  console.log(onPostCreated)
  return (
    <Box
      right={0}
      position="sticky"
      top="60px"
      h="calc(100vh - 60px)"
      w="380px"
      p={4}
      bg="white"
      borderLeft="1px solid"
      borderColor="gray.100"
      overflowY="auto" 
    >
      <VStack gap={6} align="stretch" pt="15px">
        <Button
          colorScheme={showCreatePost ? "red" : "green"}
          bg={showCreatePost ? "red.500" : "#2f8f57"}
          color="white"
          onClick={() => setShowCreatePost(!showCreatePost)}
        >
          {showCreatePost ? <MdOutlineRemove /> : <MdOutlineAdd />}

          {showCreatePost ? "Cancel Post" : "Create New Post"}
        </Button>

        {showCreatePost && <CreatePost />}

        <Box border="1px solid" borderColor="gray.200" p={4} rounded="md">
          <Text fontSize="sm" fontWeight="black" mb={2}>
            Trending Products
          </Text>
          <Text fontSize="xs" color="gray.500">
            No current trending products
          </Text>
        </Box>

        <Box border="1px solid" borderColor="gray.200" p={4} rounded="md">
          <Text fontSize="sm" fontWeight="black" mb={2}>
            Suggested Growers
          </Text>
          <Text fontSize="xs" color="gray.500">
            No current suggested growers
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}

export default RightSidebar;
