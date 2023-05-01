import { ThemeProvider } from "next-themes";
import "../styles/tailwind.css";
import { TourProvider } from "@reactour/tour";
import steps from "../components/dashboard/data/ReactTourSteps";
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <TourProvider steps={steps}>
        <Component {...pageProps} />
      </TourProvider>
    </ThemeProvider>
  );
}

export default MyApp;
