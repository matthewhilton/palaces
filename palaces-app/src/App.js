
import { Routes, Route, useParams } from "react-router-dom";
import View from "./pages/View";
import Signup from "./pages/Signup";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from "react-bootstrap"
import Play from "./pages/Play";
import Edit from "./pages/Edit";
import { useRecoilState } from "recoil";
import accountAtomData from './data/accountDataAtom';
import SyncButton from "./components/SyncButton";

function App() {
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">Palaces</Navbar.Brand>    
          <SyncButton />
        </Container>
      </Navbar>
      <Container>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/:id/*" element={<View />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
