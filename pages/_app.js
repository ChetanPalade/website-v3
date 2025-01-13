import { ChakraProvider } from "@chakra-ui/react";
import "@/styles/globals.css";
import { StoreContext } from "@/context/StoreContext";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <StoreContext>
        <Component {...pageProps} />
      </StoreContext>
    </ChakraProvider>
  );
}
