import {
  Box,
  Flex,
  Image,
  HStack,
  InputGroup,
  Input,
  Avatar,
  Menu,
  Portal,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { CiShop } from "react-icons/ci";
import { LuSearch } from "react-icons/lu";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useProfile } from "../../hooks/useProfile";
import { logout } from "../../features/auth/auth.service";
import logo from "../../assets/JaihamFarm-cropped.png";

function NavBar() {
  const { profile } = useProfile();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/login"); 
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Flex
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={100}
      bg="white"
      shadow="sm"
      justify="space-around"
      align="center"
      py={2}
      px={6}
      h="60px"
    >
      <HStack w="15%" fontSize="sm" gap={4}>
        <Link to="/feed">
          <FiHome style={{ display: "inline", marginRight: "2px" }} /> Feed
        </Link>
        <Link to="/marketplace">
          <CiShop
            style={{
              display: "inline",
              marginRight: "2px",
              fontSize: "17px",
              fontWeight: "bold",
            }}
          />{" "}
          Marketplace
        </Link>
      </HStack>

      <Box w="50%" pl={40}>
        <Image src={logo} alt="Jaiham Farm Logo" mx="auto" h="50px" />
      </Box>

      <InputGroup startElement={<LuSearch />} w="20%">
        <Input placeholder="Search products, posts, users" />
      </InputGroup>

      <HStack>
        <IoIosNotificationsOutline fontSize="25px" />
        <AiOutlineShoppingCart fontSize="23px" />

        <Menu.Root positioning={{ placement: "left-end" }}>
          <Menu.Trigger rounded="full" focusRing="none">
            <Avatar.Root size="lg" ml={4}>
              <Avatar.Fallback name={profile?.full_name ?? undefined}  />
              <Avatar.Image src={profile?.avatar_url ?? undefined} />
            </Avatar.Root>
          </Menu.Trigger>

          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="profile" onClick={() => navigate("/profile")}>
                  Profile
                </Menu.Item>
                <Menu.Item value="messages" onClick={() => navigate("/messages")}>
                  Messages
                </Menu.Item>
                <Menu.Item value="settings">Settings</Menu.Item>
                <Menu.Item value="logout" onClick={handleLogout}>
                  Logout
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </HStack>
    </Flex>
  );
}

export default NavBar;
