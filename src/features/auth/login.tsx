import { Button, Heading, Input, Stack, Text, Box } from "@chakra-ui/react";
import { useState } from "react";
import { signIn } from "./auth.service";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./authLayout";

 function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    const { error } = await signIn(email, password);
    if (error) alert(error.message);
    navigate("/profile");
  };

  return (
    <AuthLayout>
      <Stack gap={4}>
        <Box>
          <Heading textAlign="center"> Jaiham Farm</Heading>
          <Text textAlign="center" color="gray.500" fontSize='xs'>
            Cultivating connections, growing futures.
          </Text>
        </Box>
        <Heading textAlign='center' fontSize='xs'>Sign in to your account</Heading>

        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button bg='#2f8f57' onClick={handleLogin}>
          Sign In
        </Button>

        <Button variant="outline" onClick={()=> navigate("/signup")}>Sign Up</Button>
      </Stack>
    </AuthLayout>
  );
}

export default Login;