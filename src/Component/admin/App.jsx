import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import ECommerce from './pages/Dashboard/ECommerce';
import Banner from './pages/Form/Banner';
import ErrorPage from "../404";
import Subject from "./pages/Form/Subject";
import Course from "./pages/Form/Course";
import Chapter from "./pages/Form/Chapter";
import Lesson from "./pages/Form/Lesson";
import SubjectView from './pages/View/subject';
import BannerView from './pages/View/banner';
import CourseView from './pages/View/course';
import ChapterView from './pages/View/chapter';
import LessonView from './pages/View/lesson';
import SubjectEdit from './pages/Edit/subject';
import BannerEdit from './pages/Edit/banner';
import CourseEdit from './pages/Edit/course';
import ChapterEdit from './pages/Edit/chapter';
import LessonEdit from './pages/Edit/lesson';

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
          <Route path="/view/subject" element={<SubjectView />} />
          <Route path="/view/banner" element={<BannerView />} />
          <Route path="/view/course" element={<CourseView />} />
          <Route path="/view/chapter" element={<ChapterView />} />
          <Route path="/view/lesson" element={<LessonView />} />
          <Route path="/edit/subject/:id" element={<SubjectEdit />} />
          <Route path="/edit/banner/:id" element={<BannerEdit />} />
          <Route path="/edit/course/:id" element={<CourseEdit />} />
          <Route path="/edit/chapter/:id" element={<ChapterEdit />} />
          <Route path="/edit/lesson/:id" element={<LessonEdit />} />
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
