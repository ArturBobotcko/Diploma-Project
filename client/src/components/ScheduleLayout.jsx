import React from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import TeacherSchedule from '../pages/TeacherSchedule';
import StudentSchedule from '../pages/StudentSchedule';
import ParentSchedule from '../pages/ParentSchedule';

const ScheduleLayout = () => {
  const { user } = useStateContext();
  if (user.role) {
    if (user.role.name === 'teacher') {
      return <TeacherSchedule />;
    } else if (user.role.name === 'student') {
      return <StudentSchedule />;
    } else if (user.role.name === 'parent') {
      return <ParentSchedule />;
    }
  }
};

export default ScheduleLayout;
