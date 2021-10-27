import "./App.css";

import Users from "./screens/users";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserDetails from "./screens/userDetails";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

function App() {
  const theme = createMuiTheme({
    typography: {
      fontFamily: '"Montserrat"',
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact={true} component={Users} path="/" />
          <Route exact={true} component={UserDetails} path="/Users/:id" />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
