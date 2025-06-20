// src/App.tsx
import { Routes, Route, Link } from "react-router-dom";
import UseOptimisticPage from "./features/UseOptimisticPage";

function App() {
  return (
    <div>
      <h1>React 19 Feature Demos</h1>
      <nav>
        <ul>
          <li><Link to="/use-optimistic">useOptimistic</Link></li>
          {/* More links can go here */}
        </ul>
      </nav>

      <Routes>
        <Route path="/use-optimistic" element={<UseOptimisticPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
}

export default App;
