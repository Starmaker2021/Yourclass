import React from 'react';
import AllCoursePage from './components/Course/AllCoursePage/AllCoursePage';
import Login from './components/Login/Login';
import Register from './components/Register/register';
import ManagePage from './components/Manage/ManagePage';
import LearnerCenter from './components/CourseCenter/Learner/LearnerCenter';
import LecturerCenter from './components/CourseCenter/Lecturer/LecturerCenter';
import LearnerPage from './components/Learner/LearnerPage';
import Auth from './components/Auth';
import LecturerPage from './components/Lecturer/LecturerPage';
const routes = [
  {
    path: '/',
    component: Auth,
    exact:true
  },
  {
    path:'/all',
    component:AllCoursePage,
    exact: true
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/admin',
    component:ManagePage
  },
  {
    path: '/learner',
    component: LearnerPage,
    exact:true
  },
  {
    path: '/learner/course',
    component: LearnerCenter,
    exact:true
  },
  {
    path: '/lecturer',
    component: LecturerPage,
    exact: true
  },
  {
    path: '/lecturer/course',
    component: LecturerCenter,
    exact:true
  }
];
export default routes