import { Tabs, Text } from "@chakra-ui/react";
import { TfiAnnouncement } from "react-icons/tfi";
import { CiStar } from "react-icons/ci";
import { CiShop } from "react-icons/ci";
import { FiMessageCircle } from "react-icons/fi";
import UserPosts from "./userPosts";

function ProfileTabs({ userId }: { userId: string }) {
  const tabInfo = [
    { icon: TfiAnnouncement, title: "Posts", value: "posts" },
    { icon: CiStar, title: "Saved Products", value: "products" },
    { icon: CiShop, title: "Order History", value: "history" },
    { icon: FiMessageCircle, title: "Messages", value: "messages" },
  ];
  return (
    <Tabs.Root
      mt={6}
      variant="plain"
      fitted
      defaultValue="posts"
      h='75vh'
      size='sm'
    >
      <Tabs.List bg='bg.muted' w="full" display="flex" justifyContent="space-between" p={1} rounded="l2" >
        {tabInfo.map((tab) => (
        <>
          <Tabs.Trigger key={tab.value} value={tab.value} fontSize='lg' _selected={{
            bg: "#2f8f57",
            color: "white",
          }}>
            <tab.icon style={{ display: "inline", fontWeight: '600px' }} />
           <Text fontSize='sm'> {tab.title}</Text>
          </Tabs.Trigger>
          <Tabs.Indicator rounded="l2" />
        </>
        ))}
      </Tabs.List>
      <Tabs.Content value="posts">
        {" "}
        <UserPosts userId={userId} />
      </Tabs.Content>
      <Tabs.Content value="products" textAlign='center' color='gray.400' mt={56}> No Saved Products Avialable </Tabs.Content>
      <Tabs.Content value="history" textAlign='center' color='gray.400' mt={56}> No Order History Avialable</Tabs.Content>
      <Tabs.Content value="messages" textAlign='center' color='gray.400' mt={56}> You haven't started any chat </Tabs.Content>
    </Tabs.Root>
  );
}

export default ProfileTabs;
