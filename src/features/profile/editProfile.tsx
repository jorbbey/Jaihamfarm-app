import {
  Box,
  Button,
  Field,
  Input,
  Textarea,
  VStack,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useProfile } from "../../hooks/useProfile";
import { supabase } from "../../hooks/services/supabase";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "../../components/common/navbar";
import Footer from "../../components/common/footer";

export default function EditProfile() {
  const { profile, loading } = useProfile();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<File | null>(null);

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name ?? "");
      setBio(profile.bio ?? "");
      setLocation(profile.location ?? "");
    }
  }, [profile]);

  if (loading || !profile)
    return (
      <VStack
        colorPalette="green"
        align="center"
        justify="center"
        h="100vh"
        gap={4}
      >
        <Spinner color="colorPalette.600" />
        <Text color="colorPalette.600" fontSize="lg">
          Loading Jaiham Farm User Profile...
        </Text>
      </VStack>
    );

  const handleSubmit = async () => {
    setSaving(true);
    
    let avatarUrl = profile.avatar_url;
    if (avatar) {
      const filePath = `${profile.id}/avatar.png`;

      await supabase.storage
        .from("avatars")
        .upload(filePath, avatar, { upsert: true });

      avatarUrl = supabase.storage.from("avatars").getPublicUrl(filePath)
        .data.publicUrl;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        bio,
        location,
        avatar_url: avatarUrl,
      })
      .eq("id", profile.id);

    setSaving(false);

    if (!error) {
      navigate("/profile");
    }
  };

  return (
  <>
    <NavBar />
    <Box maxW="600px" mx="auto" py={10}>
      <Heading mb={6}>Edit Profile</Heading>

      <VStack gap={4}>
        <Field.Root>
          <Field.Label>Profile Image</Field.Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files?.[0] ?? null)}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Full Name</Field.Label>
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Bio</Field.Label>
          <Textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </Field.Root>

        <Field.Root>
          <Field.Label>Location</Field.Label>
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Field.Root>

        <Button
          bg="#2f8f57"
          width="full"
          onClick={handleSubmit}
          loading={saving}
        >
          Save Changes
        </Button>
      </VStack>
    </Box>
    
    <Footer />
  </>
  );
}
