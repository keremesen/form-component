import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout";

const CreateUser = lazy(() => import("./pages/CreateUser"));
const UserDetail = lazy(() => import("./pages/UserDetail"));

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<CreateUser />} />
          <Route path="/user-detail" element={<UserDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
