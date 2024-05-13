import React from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import StudentGrades from '../pages/StudentGrades';
import TeacherGrades from '../pages/TeacherGrades';

const Grades = () => {
  const { user, isAuthorized } = useStateContext();
  if (user.role) {
    if (user.role.name === 'student') {
      console.log('я студент');
      return <StudentGrades />;
    } else if (user.role.name === 'teacher') {
      return <TeacherGrades />;
    } else if (user.role.name === 'parent') {
      return <ParentGrades />;
    }
  }
};

export default Grades;
