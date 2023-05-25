import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import ECommerce from './pages/Dashboard/ECommerce';
import Banner from './pages/Form/Banner';
import ErrorPage from "../404";
import Subject from "./pages/Form/Subject";
import Course from "./pages/Form/Course";
import Chapter from "./pages/Form/Chapter";
import Lesson from "./pages/Form/Lesson";

function AdminHome() {
  const [loading, setLoading] = useState(true);

  const preloader = document.getElementById('preloader');

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none';
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <p className=" text-center text-danger">Failed to lead app</p>
  ) : (
    <>
      <Routes>
        <Route path="/" element={<ECommerce />} />
        <Route path="/banner" element={<Banner />} />
        <Route path="/subject" element={<Subject />} />
        <Route path="/course" element={<Course/>}/>
        <Route path="/chapter" element={<Chapter/>}/>
        <Route path="/lesson" element={<Lesson/>}/>
        <Route path="/*" element={<ErrorPage/>} />
      </Routes>
    </>
  );
}

export default AdminHome;
