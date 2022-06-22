import Navbar from "#/containers/Navbar";
import "@talisman-connect/components/talisman-connect-components.esm.css";
import "@talisman-connect/ui/talisman-connect-ui.esm.css";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}

export default App;
