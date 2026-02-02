import { Flex } from "@chakra-ui/react";
import Sidebar from "../components/common/sideBar";
// import FeedSection from "../features/feed/feedSection";
import GlobalFeed from "../features/feed/globalFeed";
import RightSidebar from "../features/feed/rightSidebar";
import NavBar from "../components/common/navbar";
import Footer from "../components/common/footer";
// import { useFeed } from "../hooks/useFeed";

export default function FeedPage() {
  // const { refetch } = useFeed();

  return (
    <>
      <NavBar />
      <Flex>
        <Sidebar width='800px' />
        <Flex justify="space-between" align="flex-start"  my={8} px={6}>
          <GlobalFeed />
          {/*<RightSidebar onPostCreated={refetch} />*/}
           <RightSidebar />
        </Flex>
      </Flex>
<Footer />
    </>
  );
}
