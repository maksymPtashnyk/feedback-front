import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReviewForm from './ReviewForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/maugli" element={<ReviewForm park="Мауглі" />} />
        <Route path="/manki" element={<ReviewForm park="Манкі" />} />
      </Routes>
    </Router>    
  );
};

export default App;
