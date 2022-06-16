import { CssBaseline, Container, createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { About } from "../modules/about";
import { ProductDetail, Catalog } from "../modules/catalog";
import { Contact } from "../modules/contact";
import { Home } from "../modules/home";
import { Header } from "../modules/ui";
import { HOME, CONTACT, ABOUT, CATALOG } from "../modules/routes";


function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#212121" : "#eaeaea"
      }
    }
  });

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header mode={darkMode} onThemeChange={handleThemeChange} />
      <Container sx={{ mt: 5 }}>
        <Routes>
          <Route path={HOME} element={<Home />} />
          <Route path={CATALOG} element={<Catalog />} />
          <Route path={`${CATALOG}/:id`} element={<ProductDetail />} />
          <Route path={ABOUT} element={<About />} />
          <Route path={CONTACT} element={<Contact />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
