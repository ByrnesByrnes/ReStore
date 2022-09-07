import { CssBaseline, Container, createTheme, ThemeProvider } from "@mui/material";
import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { About } from "../modules/about";
import { ProductDetail, Catalog } from "../modules/catalog";
import { Contact } from "../modules/contact";
import { Home } from "../modules/home";
import { ErrorPage, Header, MainLoader, NotFound, ServerError } from "../modules/ui";
import { HOME, CONTACT, ABOUT, CATALOG, ERROR, SERVER_ERROR, BASKET, CHECKOUT, agent } from "../modules/routes";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Basket } from "../modules/basket";
import { useStoreContext } from "../context/store-context";
import { getCookie } from "./utilities/ultilities";
import { Checkout } from "../modules/checkout";

function App() {
  const { setBasket } = useStoreContext();

  const [loading, setLoading] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const buyerId = getCookie("buyerId");

    if (buyerId) {
      agent.Basket.get()
        .then(basket => setBasket(basket.items.$values))
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }

  }, [setBasket]);

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

  if (loading) return <MainLoader />;

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
          <Route path={BASKET} component={Basket} />
          <Route path={CHECKOUT} component={Checkout} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </ThemeProvider>
  );
}

export default App;
