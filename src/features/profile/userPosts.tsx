import { useEffect, useState } from "react";
import { supabase } from "../../hooks/services/supabase";
import { Box, Text, Grid, Image } from "@chakra-ui/react";

type Post = {
  id: string;
  content: string;
  media_urls: string;
  user_id: string;
  created_at: string;
};

function UserPosts({ userId }: { userId: string }) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      setPosts(data || []);
    };

    fetchPosts();
  }, [userId]);

  if (posts.length === 0) {
    return <Text textAlign='center' color='gray.400' mt={56}>No posts yet.</Text>;
  }

  return (
  <Box p={{ base: 2, md: 4 }} overflowX="auto" w="100%">
    <Grid
      templateColumns={{
        base: "repeat(auto-fill, minmax(150px, 1fr))",
        md: "repeat(auto-fill, minmax(200px, 1fr))",
        lg: "repeat(auto-fill, minmax(300px, 1fr))",
      }}
      gap={{ base: 4, md: 6 }}
      py={{ base: 4, md: 6 }}
      w="150%"
    >
      {posts.map((post) => (
        <Box key={post.id} p={4} borderWidth="1px" rounded="md">
          <Text mb={5} fontSize='sm'>{post.content}</Text>
          <Image src={post.media_urls} alt={post.id} />
        </Box>
      ))}
    </Grid>
  </Box>
   
  );
}

export default UserPosts;