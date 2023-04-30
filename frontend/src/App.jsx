import "./global_sass/app.css";
import { Heading, Box } from "@chakra-ui/react";
import Navbar from "./Components/Navbar";
import AllRoutes from "./Routes/AllRoutes";

function App() {
  return (
    <Box className="App">
      <Heading>App</Heading>
      <Navbar />
      <AllRoutes />
    </Box>
  );
}

export default App;
