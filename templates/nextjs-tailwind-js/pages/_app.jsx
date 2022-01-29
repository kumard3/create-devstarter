import "../styles/globals.css";
import NavComponent from "../components/NavComponent";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavComponent />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
