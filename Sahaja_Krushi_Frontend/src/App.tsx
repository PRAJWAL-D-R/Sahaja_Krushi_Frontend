import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Router />
    </BrowserRouter>
  );
}

export default App;
