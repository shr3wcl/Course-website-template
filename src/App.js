import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Component/home";
import Login from "./Component/login";
import Register from "./Component/register";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from "./Component/header";
import {useSelector} from "react-redux";
import Chapters from "./Component/chapters";
import Footer from "./Component/footer";
import Lesson from "./Component/lesson";


function App() {
    const isLogin = useSelector(state => state.auth.login.success);

    const ProtectedRoute = ({user, children}) => {
        if (!user) {
            return <Navigate to="/login" replace/>;
        }
        return children;
    };
  return (
    <Router>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
          <Route path="/chapters/:id" element={
              <ProtectedRoute user={isLogin}><Chapters/></ProtectedRoute>
          }/>
          <Route path="/lesson/:id" element={
              <ProtectedRoute user={isLogin}><Lesson/></ProtectedRoute>
          }/>
      </Routes>
        <Footer/>
    </Router>
  );
}

export default App;
