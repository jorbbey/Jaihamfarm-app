import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import type { Profile } from "../../hooks/useProfile";
import { GiLindenLeaf } from "react-icons/gi";
// import { TbLeaf } from "react-icons/tb";
import { CiEdit } from "react-icons/ci";
import { FiMessageCircle } from "react-icons/fi";

type Props = {
  profile: Profile;
};

function ProfileHeader({ profile }: Props) {
  const navigate = useNavigate();
  return (
    <Flex
      gap={6}
      align="center"
      py={6}
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      {/* Avatar */}
      <Avatar.Root size="2xl">
        <Avatar.Fallback name={profile.full_name ?? undefined} />
        <Avatar.Image src={profile.avatar_url ?? undefined} />
      </Avatar.Root>

      {/* Main Info */}
      <Box flex="1">
        <HStack gap={3}>
          <Heading size="md">{profile.full_name ?? "Unnamed User"}</Heading>

          <Badge
            colorScheme="green"
            rounded="full"
            px={2}
            color='#2f8f57'
          >
          {profile.role}  <GiLindenLeaf  /> 
          </Badge>
        </HStack>

        <Text color="gray.500" fontSize="sm">
          @{profile.full_name?.toLowerCase().replace(/\s+/g, "_") ?? "user"}
        </Text>

        {profile.bio && (
          <Text mt={2} fontSize="sm" color="gray.700">
            {profile.bio}
          </Text>
        )}

        {profile.location && (
          <Text fontSize="sm" color="gray.500">
            📍 {profile.location}
          </Text>
        )}

        {/* Stats (placeholder for now) */}
        <HStack gap={6} mt={1}>
          <Text fontSize="sm">
            <strong>0</strong> Followers
          </Text>
          <Text fontSize="sm">
            <strong>0</strong> Following
          </Text>
        </HStack>
      </Box>

      {/* Actions */}
      <HStack>
        <Button variant="outline"  size='xs' onClick={()=> navigate("/profile/edit")}>
          <CiEdit style={{ display: "inline", marginRight:'8px' }} /> Edit Profile
        </Button>
        <Button variant="outline" size='xs' bg='#2f8f57' color='white' _hover={{ bg: '#276746' }}>
          < FiMessageCircle style={{ display: "inline", marginRight:'8px' }} /> Message
        </Button>
      </HStack>
    </Flex>
  );
}

export default ProfileHeader;
