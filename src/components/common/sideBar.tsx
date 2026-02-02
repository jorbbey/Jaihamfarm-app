import { VStack, Box, HStack, Text, Icon } from "@chakra-ui/react";
import { TiHomeOutline } from "react-icons/ti";
import { LuSearch, LuSettings, LuBadgeHelp } from "react-icons/lu";
import { BsShop } from "react-icons/bs";
import { PiFarm } from "react-icons/pi";
import { IoMdHeartEmpty } from "react-icons/io";
import { FiMessageSquare } from "react-icons/fi";
import { Link } from "react-router-dom";

const items = [
  { icon: TiHomeOutline, label: "Home", link:"/" },
  { icon: LuSearch, label: "Discover", link:"/feed" },
  { icon: BsShop, label: "Market", link:"/marketplace" },
  { icon: PiFarm, label: "My Farm", link:"/my-farm" },
  { icon: IoMdHeartEmpty, label: "Saved Products",  link:"/saved-products" },
  { icon: FiMessageSquare, label: "Messages",   link:"/messages"  },
];

function Sidebar({width}: {width?: string}) {
  return (
    <Box
      position="sticky"
      left={0}
      top={"60px"}
      h="calc(100vh - 60px)"
      overflowY="auto"
      w={width || "220px"}
      p={4}
      borderRight="1px solid"
      borderColor="gray.100"
      bg="white"
      display="flex"
      flexDirection="column"
      fontSize='sm'
    >
      <VStack align="stretch" gap={1} flex={1}>
        {items.map((item) => (
          <Link to={item.link} key={item.label} style={{ textDecoration: 'none', color: 'inherit' }}>
            <HStack
              key={item.label}
              p={3}
              borderRadius="md"
              transition="0.2s"
              _hover={{ bg: "gray.100", cursor: "pointer" }}
            >
              <Icon as={item.icon} fontSize="sm" />
              <Text fontWeight="medium" fontSize='sm'>{item.label}</Text>
            </HStack>
          </Link>
        
        ))}
      </VStack>

      {/* Bottom Section */}
      <VStack
        align="stretch"
        gap={1}
        borderTop="1px solid"
        borderColor="gray.100"
        pt={4}
        fontSize='sm'
      >
        <HStack
          p={3}
          borderRadius="md"
          _hover={{ bg: "gray.100", cursor: "pointer" }}
        >
          <Icon as={LuSettings} fontSize="md" />
          <Text>Settings</Text>
        </HStack>
        <HStack
          p={3}
          borderRadius="md"
          _hover={{ bg: "gray.100", cursor: "pointer" }}
        >
          <Icon as={LuBadgeHelp} fontSize="md" />
          <Text>Help</Text>
        </HStack>
      </VStack>
    </Box>
  );
}

export default Sidebar;
