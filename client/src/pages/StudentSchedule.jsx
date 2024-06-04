import { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import ruLocale from '@fullcalendar/core/locales/ru';
import { DateTime } from 'luxon';
import '../StudentSchedule.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

const StudentSchedule = () => {
  const { user } = useStateContext();
  const [studentSchedule, setStudentSchedule] = useState([]);

  useEffect(() => {
    axiosClient
      .get(`/api/getStudentSchedule/${user.user_data.id}`)
      .then(response => {
        setStudentSchedule(response.data.schedule);
      })
      .catch(error => {
        console.error(error);
      });
  }, [user.user_data.id]);

  const dayOfWeekToDate = dayOfWeek => {
    const daysOfWeek = {
      Понедельник: 1,
      Вторник: 2,
      Среда: 3,
      Четверг: 4,
      Пятница: 5,
      Суббота: 6,
      Воскресенье: 7,
    };
    return daysOfWeek[dayOfWeek];
  };

  const events = studentSchedule.flatMap(({ discipline, teacher, schedules }) =>
    schedules.map(schedule => {
      const date = DateTime.fromISO(schedule.day_of_week);
      const start = date
        .set({
          hour: parseInt(schedule.start_time.split(':')[0], 10),
          minute: parseInt(schedule.start_time.split(':')[1], 10),
        })
        .toJSDate();
      const end = date
        .set({
          hour: parseInt(schedule.end_time.split(':')[0], 10),
          minute: parseInt(schedule.end_time.split(':')[1], 10),
        })
        .toJSDate();
      const teacherFullName = teacher.user.patronym
        ? `${teacher.user.surname} ${teacher.user.name} ${teacher.user.patronym}`
        : `${teacher.user.surname} ${teacher.user.name}`;
      return {
        title: `${discipline}\n${teacherFullName}`,
        start,
        end,
        allDay: false,
        extendedProps: {
          fullTitle: `${discipline} (${teacher.user.surname} ${teacher.user.name} ${teacher.user.patronym})`,
        },
      };
    }),
  );

  const renderEventContent = eventInfo => {
    const startTime = DateTime.fromJSDate(eventInfo.event.start).toFormat(
      'HH:mm',
    );
    const endTime = DateTime.fromJSDate(eventInfo.event.end).toFormat('HH:mm');
    const [discipline, teacherFullName] = eventInfo.event.title.split('\n');

    return (
      <div className="event-content p-1">
        <b>{`${startTime} - ${endTime}`}</b>
        <i>{` ${discipline}`}</i>
        <i>{` ${teacherFullName}`}</i>
        <div className="tooltip">{eventInfo.event.extendedProps.fullTitle}</div>
      </div>
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Расписание занятий</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        locale={ruLocale}
        events={events}
        eventContent={renderEventContent}
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }}
        nowIndicator
        allDaySlot={false}
        firstDay={1}
        height="auto"
      />
    </div>
  );
};

export default StudentSchedule;
