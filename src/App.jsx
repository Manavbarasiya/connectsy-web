import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Body is used as the main layout */}
        <Route path="/" element={<Body />}>
          {/* Use relative path (without leading /) */}
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
