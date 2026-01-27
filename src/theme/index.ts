

import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          primary50: { value: "#e6f4ea" },
          primary100: { value: "#c1e4cd" },
          primary200: { value: "#9bd3b0" },
          primary300: { value: "#74c293" },
          primary400: { value: "#4eb176" },
          primary500: { value: "#2f8f57" }, // primary green
          primary600: {value: "#247044"},
          primary700: { value: "#195131" },
          primary800: {value: "#0f331e"},
          primary900: { value: "#05150c" },
        },
    }
  }
  },
});

const system = createSystem(defaultConfig, config)
export default system;
