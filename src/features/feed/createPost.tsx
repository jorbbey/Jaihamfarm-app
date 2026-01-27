"use client";

import {
  Box,
  Button,
  Textarea,
  VStack,
  FileUpload,
  Icon,
  Text,
  useFileUploadContext,
} from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";
import { supabase } from "../../hooks/services/supabase";
import { useUser } from "../../hooks/useUser";
import { useEffect, useState } from "react";

function DropzoneSync({
  onFilesSelect,
}: {
  onFilesSelect: (files: File[]) => void;
}) {
  const fileUpload = useFileUploadContext();

  useEffect(() => {
    onFilesSelect(fileUpload.acceptedFiles ?? []);
  }, [fileUpload.acceptedFiles, onFilesSelect]);

  return null;
}

export default function CreatePost() {
  const { user } = useUser();
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!user || !content.trim()) return;

    setLoading(true);

    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const filePath = `${user.id}/${Date.now()}-${image.name}`;

        const { error } = await supabase.storage
          .from("post-media")
          .upload(filePath, image);

        if (error) return null;

        const { data } = supabase.storage
          .from("post-media")
          .getPublicUrl(filePath);

        return data.publicUrl;
      })
    );

    await supabase.from("posts").insert({
      user_id: user.id,
      content,
      media_urls: imageUrls.filter(Boolean),
    });

    setContent("");
    setImages([]);
    setLoading(false);
  };

  return (
    <Box border="1px solid" borderColor="gray.200" p={4} rounded="md">
      <VStack gap={3} align="stretch">
        <Textarea
          placeholder="Share something with the community..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <FileUpload.Root
          accept={{ "image/*": [] }}
          maxFiles={10}
        >
          <FileUpload.HiddenInput />

          <FileUpload.Dropzone w='full'>
            <Icon boxSize={6} color="gray.500">
              <LuUpload />
            </Icon>

            <FileUpload.DropzoneContent>
              <Box fontWeight="medium">Drag & drop images</Box>
              <Box fontSize="sm" color="gray.500">
                <Text fontSize="xs">png, jpg — up to 10 images (5MB each)</Text>
              </Box>
            </FileUpload.DropzoneContent>
          </FileUpload.Dropzone>

          <FileUpload.List />

          {/* Sync dropzone → React state */}
          <DropzoneSync onFilesSelect={setImages} />
        </FileUpload.Root>

        <Button
          bg="#2f8f57"
          color="white"
          onClick={handleSubmit}
          loading={loading}
          w="full"
        >
          Post
        </Button>
      </VStack>
    </Box>
  );
}
