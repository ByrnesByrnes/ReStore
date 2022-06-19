import { CssBaseline, Container, createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { About } from "../modules/about";
import { ProductDetail, Catalog } from "../modules/catalog";
import { Contact } from "../modules/contact";
import { Home } from "../modules/home";
import { ErrorPage, Header, NotFound, ServerError } from "../modules/ui";
import { HOME, CONTACT, ABOUT, CATALOG, ERROR, SERVER_ERROR } from "../modules/routes";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="top-right" hideProgressBar transition={Flip} theme={darkMode ? "dark" : "light"} />
      <CssBaseline />
      <Header mode={darkMode} onThemeChange={handleThemeChange} />
      <Container sx={{ mt: 5 }}>
        <Switch>
          <Route exact path={HOME} component={Home} />
          <Route exact path={CATALOG} component={Catalog} />
          <Route path={`${CATALOG}/:id`} component={ProductDetail} />
          <Route path={ABOUT} component={About} />
          <Route path={CONTACT} component={Contact} />
          {/* will remove error page */}
          <Route path={ERROR} component={ErrorPage} />
          <Route path={SERVER_ERROR} component={ServerError} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </ThemeProvider>
  );
}

export default App;
