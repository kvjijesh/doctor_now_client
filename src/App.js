import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Header from "./components/header/Header";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import './scss/main.scss'
import Login from "./pages/login/Login";
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
   <>
   <Router>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/signup" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
   </Router>
   <ToastContainer/>
   </>
  );
}

export default App;
