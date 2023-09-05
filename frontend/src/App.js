import { Routes , Route } from 'react-router-dom';
import Home from './pages/Home';
import Chat from  "./pages/Chat"
import './App.css';

function App() {
  return (
    <div className=' app'>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/chats" element={<Chat/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
