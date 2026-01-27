import { Box, Flex, Image } from "@chakra-ui/react";
import type { ReactNode } from "react";
import logo from "../../assets/JaihamFarm-leaf.png";

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box w="full" maxW="420px" bg="white" p={8} rounded="lg" boxShadow="lg">

          <Image src={logo} alt="Jaiham Farm Logo" mx="auto" w='50px' h='50px' mb='6' />
  
        {children}
      </Box>
    </Flex>
  );
}

export default AuthLayout;
