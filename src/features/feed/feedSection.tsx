// import { VStack, Spinner } from "@chakra-ui/react";
// import { useFeed } from "../../hooks/useFeed";
// import PostCard from "./postCard";

// function FeedSection() {
//   const { posts, loading } = useFeed();

//   if (loading) return <Spinner />;

//   return (
//     <VStack gap={6}>
//       {posts.map((post) => (
//         <PostCard key={post.id} post={post} />
//       ))}
//     </VStack>
//   );
// }

// export default FeedSection;