// src/App.tsx
import { Routes, Route, Link } from 'react-router-dom';
import UseOptimisticPage from './features/UseOptimisticPage';

function HomePage() {
  return (
    <div>
      <h2>Welcome</h2>
      <p>Select a React 19 feature to explore:</p>
      <ul>
        <li>
          <Link to='/use-optimistic'>useOptimistic</Link>
        </li>
        {/* Add more links here */}
      </ul>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>React 19 Feature Demos</h1>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/use-optimistic' element={<UseOptimisticPage />} />
      </Routes>
    </div>
  );
}

export default App;
