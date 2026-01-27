import { VStack, Box, HStack, Text, Icon } from "@chakra-ui/react";
import { TiHomeOutline } from "react-icons/ti";
import { LuSearch, LuSettings, LuBadgeHelp } from "react-icons/lu";
import { BsShop } from "react-icons/bs";
import { PiFarm } from "react-icons/pi";
import { IoMdHeartEmpty } from "react-icons/io";
import { FiMessageSquare } from "react-icons/fi";

const items = [
  { icon: TiHomeOutline, label: "Home" },
  { icon: LuSearch, label: "Discover" },
  { icon: BsShop, label: "Market" },
  { icon: PiFarm, label: "My Farm" },
  { icon: IoMdHeartEmpty, label: "Saved Products" },
  { icon: FiMessageSquare, label: "Messages" },
];

function Sidebar() {
  return (
    <Box
      position="sticky"
      left={0}
      top={"60px"}
      h="calc(100vh - 60px)"
      overflowY="auto"
      w="800px"
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
          <HStack
            key={item.label}
            p={3}
            borderRadius="md"
            transition="0.2s"
            _hover={{ bg: "gray.100", cursor: "pointer" }}
          >
            <Icon as={item.icon} fontSize="md" />
            <Text fontWeight="medium">{item.label}</Text>
          </HStack>
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
