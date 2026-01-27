import { useState } from "react";
import {
  Button,
  Input,
  FileUpload,
  Textarea,
  Stack,
  Field,
  NativeSelect,
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi";
import { supabase } from "../../hooks/services/supabase";
import { useUser } from "../../hooks/useUser";
import { useProfile } from "../../hooks/useProfile";
import type { FileChangeDetails } from "@chakra-ui/react";

const CATEGORIES = [
  "Grains",
  "Vegetables",
  "Fruits",
  "Livestock",
  "Seeds",
  "Fertilizers",
  "Tools",
];

function CreateProductModal({ onCreated }: { onCreated: () => void }) {
  const { user } = useUser();
  const { profile } = useProfile();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  // const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  if (!profile || profile.role !== "supplier") return null;

  async function uploadProductImages(): Promise<string[]> {
    if (!user || imageFiles.length === 0) return [];

    const uploadedUrls: string[] = [];

    for (const file of imageFiles) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}-${Math.random()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error } = await supabase.storage
        .from("products-media")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("Image upload error:", error);
        continue;
      }

      const { data } = supabase.storage
        .from("products-media")
        .getPublicUrl(filePath);

      uploadedUrls.push(data.publicUrl);
    }

    return uploadedUrls;
  }

  async function handleCreate() {
    if (!user) return;

    setLoading(true);

    const imageUrls = await uploadProductImages();

    const { error } = await supabase.from("products").insert({
      seller_id: user.id,
      title,
      description,
      price: parseFloat(price),
      category,
      images: imageUrls,
      available: true,
    });

    setLoading(false);

    if (!error) {
      setOpen(false);
      onCreated();

      // Reset form
      setTitle("");
      setPrice("");
      setDescription("");
      setCategory("");
      setImageFiles([]);
    } else {
      console.error("Create product error:", error);
    }
  }

  return (
    <DialogRoot
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      size="lg"
      placement="center"
      motionPreset="scale"
    >
      <DialogTrigger asChild>
        <Button colorPalette="green">Add Product</Button>
      </DialogTrigger>

      <DialogContent maxH="85vh" overflowY="auto">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>

        <DialogBody>
          <Stack gap="4">
            <Field.Root>
              <Field.Label>Title</Field.Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Product name"
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Price</Field.Label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Category</Field.Label>
              <NativeSelect.Root size="sm" width="200px">
                <NativeSelect.Field
                  placeholder="Select category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Field.Root>

            <Field.Root>
              <Field.Label>Description</Field.Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your product..."
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Product Images</Field.Label>

              <FileUpload.Root
                maxFiles={5}
                accept={["image/*"]}
                onFileChange={(details: FileChangeDetails) =>
                  setImageFiles(details.files)
                }
              >
                <FileUpload.HiddenInput />

                <FileUpload.Trigger asChild>
                  <Button variant="outline" size="sm">
                    <HiUpload />
                    Upload images
                  </Button>
                </FileUpload.Trigger>

                <FileUpload.List showSize clearable />
              </FileUpload.Root>
            </Field.Root>
          </Stack>
        </DialogBody>

        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button loading={loading} onClick={handleCreate} colorPalette="green">
            Create
          </Button>
        </DialogFooter>

        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}

export default CreateProductModal;
