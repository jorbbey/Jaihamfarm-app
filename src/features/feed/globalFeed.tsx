import {
  Avatar,
  Box,
  Flex,
  Image,
  Text,
  VStack,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { IoMdHeartEmpty } from "react-icons/io";
import { FiMessageCircle } from "react-icons/fi";
import { GoShareAndroid } from "react-icons/go";
import { useFeed } from "../../hooks/useFeed";
import { formatDistanceToNow } from "date-fns";

export default function GlobalFeed() {
  const { posts, loading } = useFeed();

  if (loading) return null;

  return (
    <Box
      gap={4}
      width="70%"
      mx="auto"
      pt="60px"
      minH="100vh"
      display="flex"
      flexDirection="column"
      px={10}
    >
      {posts.map((post) => (
        <Box
          key={post.id}
          border="1px solid"
          borderColor="gray.200"
          p={6}
          rounded="md"
        >
          <HStack gap={3} mb={2}>
            <Avatar.Root size="lg" ml={4}>
              <Avatar.Fallback name={post.profiles?.full_name} />
              <Avatar.Image src={post.profiles?.avatar_url ?? undefined} />
            </Avatar.Root>
            <VStack align="start" gap={0}>
              <Text fontSize="xs" fontWeight="black">
                {post.profiles?.full_name}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {formatDistanceToNow(new Date(post.created_at), {
                  addSuffix: true,
                })}
              </Text>
            </VStack>
          </HStack>

          <Text my={3} fontSize='sm'>{post.content}</Text>

          {post.media_urls?.map((url: string) => (
            <Image key={url} src={url} rounded="md" mt={2} />
          ))}
          <Flex w="100%" justify="space-between" mt={4}>
            <HStack textAlign="left">
              <IconButton aria-label="Like" variant="ghost" size="xs">
                <IoMdHeartEmpty />
              </IconButton>
              <Text fontSize="xs">{post.likes?.[0]?.count ?? 0}</Text>
            </HStack>

            <HStack>
              <IconButton aria-label="Comment" variant="ghost" size="xs">
                <FiMessageCircle />
              </IconButton>
              <Text fontSize="xs">{post.comments?.[0]?.count ?? 0}</Text>
            </HStack>

            <HStack>
              <IconButton aria-label="Share" variant="ghost" size="xs">
                <GoShareAndroid />
              </IconButton>
              <Text fontSize="xs">{post.shared?.[0]?.count ?? 0}</Text>
            </HStack>
          </Flex>
        </Box>
      ))}
    </Box>
  );
}
