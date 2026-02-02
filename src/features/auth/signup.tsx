import {
  Button,
  Heading,
  Input,
  NativeSelect,
  Stack,
  Text,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { signUp } from "./auth.service";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./authLayout";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"farmer" | "supplier">("farmer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    const { error } = await signUp(email, password, fullName, role);
    if (error) alert(error.message);
    navigate("/profile");
  };

  return (
    <AuthLayout>
      <Stack gap={4}>
        <Box>
          <Heading textAlign="center">Welcome to Jaiham Farm</Heading>
          <Text textAlign="center" color="gray.500" fontSize=''>
            Cultivating connections, growing futures.
          </Text>
        </Box>
        <Heading textAlign='center'>Create an Account</Heading>

        <Input
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <NativeSelect.Root size="sm" >
          <NativeSelect.Field
            placeholder="Select option"
            value={role}
            onChange={(e) => setRole(e.currentTarget.value as any)}
          >
            <option value="farmer">Farmer</option>
            <option value="supplier">Supplier</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Text color="gray.500" fontSize="xs" textAlign="right">
          {" "}
          Forgot Password ? {" "}
        </Text>

        <Button bg="#2f8f57" onClick={handleSignup} loading loadingText="Signing Up">
          Sign Up
        </Button>
        <Button variant="outline" loading loadingText="Signing In" onClick={() => navigate("/login")} >
          Sign in
        </Button>
      </Stack>
    </AuthLayout>
  );
}

export default Signup;
