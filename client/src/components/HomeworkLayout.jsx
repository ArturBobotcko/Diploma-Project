import React from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import StudentHomework from '../pages/StudentHomework';
import TeacherHomework from '../pages/TeacherHomework';
import ParentHomework from '../pages/ParentHomework';

const HomeworkLayout = () => {
  const { user } = useStateContext();
  if (user.role) {
    if (user.role.name === 'student') {
      console.log('я студент');
      return <StudentHomework />;
    } else if (user.role.name === 'teacher') {
      return <TeacherHomework />;
    } else if (user.role.name === 'parent') {
      return <ParentHomework />;
    }
  }
};

export default HomeworkLayout;
