import {
  Box,
  Checkbox,
  CheckboxGroup,
  Fieldset,
  For,
  Heading,
  Slider,
  Text,
  Accordion,
  Flex,
} from "@chakra-ui/react";
import { FaAngleDown } from "react-icons/fa6";

function FiltersSidebar() {
  return (
    <Box
      p={4}
      borderRadius="md"
      color="black"
      right={0}
      position="sticky"
      top="60px"
      h="calc(100vh - 60px)"
      borderRight="1px solid"
      borderColor="gray.100"
      overflowY="auto"
    >
      <Heading size="sm" mb={4}>
        Filters
      </Heading>

      <Accordion.Root multiple collapsible defaultValue={["category"]} >
        {/* CATEGORY */}
        <Accordion.Item value="category">
          <Accordion.ItemTrigger>
            <Flex w="full" align="center" justify="space-between">
              <Text fontSize='xs'>Category</Text>
              <FaAngleDown
              // transition="transform 0.2s"
              // _groupOpen={{ transform: "rotate(180deg)" }}
              />
            </Flex>
          </Accordion.ItemTrigger>

          <Accordion.ItemContent mt={2}>
            <Fieldset.Root>
              <CheckboxGroup>
                <Fieldset.Content mb='5'>
                  <For
                    each={[
                      "Fresh Produce",
                      "Diary & Eggs",
                      "Grains & Legumes",
                      "Farm Equipments",
                      "Seeds & Saplings",
                      "Livestock",
                    ]}
                  >
                    {(value) => (
                      <Checkbox.Root key={value} value={value} size='xs'>
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label>{value}</Checkbox.Label>
                      </Checkbox.Root>
                    )}
                  </For>
                </Fieldset.Content>
              </CheckboxGroup>
            </Fieldset.Root>
          </Accordion.ItemContent>
        </Accordion.Item>

        {/* PRICE RANGE */}
        <Accordion.Item value="price" my='3'>
          <Accordion.ItemTrigger>
            <Flex w="full" align="center" justify="space-between">
              <Text  fontSize='xs'>Price Range</Text>
              <FaAngleDown
              // transition="transform 0.2s"
              // _groupOpen={{ transform: "rotate(180deg)" }}
              />
            </Flex>
          </Accordion.ItemTrigger>

          <Accordion.ItemContent mt={2} mb='5'>
            <Slider.Root width="90%" min={0} max={500} size='sm' colorPalette='green'>
              <Slider.ValueText />
              <Slider.Control>
                <Slider.Track>
                  <Slider.Range />
                </Slider.Track>
                <Slider.Thumbs />
              </Slider.Control>
            </Slider.Root>
          </Accordion.ItemContent>
        </Accordion.Item>

        {/* SELLER RATING */}
        <Accordion.Item value="rating">
          <Accordion.ItemTrigger>
            <Flex w="full" align="center" justify="space-between">
              <Text fontSize='xs'>Seller Rating</Text>
              <FaAngleDown fontSize='xs'
              // transition="transform 0.2s"
              // _groupOpen={{ transform: "rotate(180deg)" }}
              />
            </Flex>
          </Accordion.ItemTrigger>

          <Accordion.ItemContent mt={2}>
            <Fieldset.Root>
              <CheckboxGroup>
                <Fieldset.Content mb='5'>
                  <For
                    each={[
                      "5 Stars",
                      "4 Stars & Up",
                      "3 Stars & Up",
                      "2 Stars & Up",
                    ]}
                  >
                    {(value) => (
                      <Checkbox.Root key={value} value={value} size='xs'>
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label>{value}</Checkbox.Label>
                      </Checkbox.Root>
                    )}
                  </For>
                </Fieldset.Content>
              </CheckboxGroup>
            </Fieldset.Root>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
    </Box>
  );
}

export default FiltersSidebar;
