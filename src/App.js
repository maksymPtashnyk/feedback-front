import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReviewForm from './ReviewForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/maugli" element={<ReviewForm park="Мауглі" />} />
        <Route path="/manki" element={<ReviewForm park="Манкі" />} />
        <Route path="*" element={<h1>Error</h1>} />
      </Routes>
    </Router>    
  );
};

export default App;
