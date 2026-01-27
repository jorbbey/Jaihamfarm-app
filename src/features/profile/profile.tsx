import { Box, Spinner, VStack, Text } from "@chakra-ui/react";
import { useProfile } from "../../hooks/useProfile";
import ProfileHeader from "./profileHeader";
import ProfileTabs from "./profileTabs";
import NavBar from "../../components/common/navbar";
import Footer from "../../components/common/footer";

export default function Profile() {
  const { profile, loading } = useProfile();

  if (loading)
    return (
      <VStack colorPalette="green" align="center" justify="center" h="100vh" gap={4}>
        <Spinner color="colorPalette.600" />
        <Text color="colorPalette.600" fontSize='lg'>Loading Jaiham Farm...</Text>
      </VStack>
    );
  if (!profile) return null;

  return (
    <>
      <NavBar />
      <Box maxW="1200px" w="90%" mx="auto"  pt="40px" mt={8} mb={16}>
        <ProfileHeader profile={profile} />
        <ProfileTabs userId={profile.id} />
      </Box>
      <Footer />
    </>
  );
}
