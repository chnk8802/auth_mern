import "@/styles/App.css";
import { AppRoutes } from "@/app/routes/index";
import { AuthLoader } from "./AuthLoader";
import { ThemeProvider } from "./ThemeProvider";

export const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthLoader />
      <AppRoutes />
    </ThemeProvider>
  );
};
