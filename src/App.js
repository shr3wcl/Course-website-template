import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Component/home";
import Login from "./Component/login";
import Register from "./Component/register";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from "./Component/header";
import {useSelector} from "react-redux";
import Chapters from "./Component/chapters";
import Footer from "./Component/footer";
import Lesson from "./Component/lesson";
import ErrorPage from "./Component/404";
import AdminHome from "./Component/admin/App";
import Profile from "./Component/profile";
import EditInfo from "./Component/editInfo";
import Password from "./Component/password";


function App() {
    const isLogin = useSelector(state => state.auth.login);

    const ProtectedRoute = ({user, children}) => {
        if (!user) {
            toast.warning("Bạn cần đăng nhập",{position: "bottom-right"});
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
              <ProtectedRoute user={isLogin.success}><Chapters/></ProtectedRoute>
          }/>
          <Route path="/lesson/:id" element={
              <ProtectedRoute user={isLogin.success}><Lesson/></ProtectedRoute>
          }/>
          <Route path="/admin/*" element={
              <ProtectedRoute user={isLogin.currentUser?.admin}><AdminHome/></ProtectedRoute>
          }/>
          <Route path="/profile/:id" element={
              <ProtectedRoute user={isLogin.success}><Profile/></ProtectedRoute>
          }/>
          <Route path="/edit/profile" element={
              <ProtectedRoute user={isLogin.success}><EditInfo/></ProtectedRoute>
          }/>
          <Route path="/edit/password" element={
              <ProtectedRoute user={isLogin.success}><Password/></ProtectedRoute>
          }/>
          <Route path={"/*"} element={<ErrorPage/>}/>
      </Routes>
        <Footer/>
    </Router>
  );
}

export default App;
