
import { Routes, Route } from "react-router-dom";
import View from "./pages/View";
import Signup from "./pages/Signup";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container } from "react-bootstrap"

function App() {
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Palaces</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/:id" element={<View />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
