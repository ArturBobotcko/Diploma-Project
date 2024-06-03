import { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import ruLocale from '@fullcalendar/core/locales/ru';
import { DateTime } from 'luxon';
import '../StudentSchedule.css';

const TeacherSchedule = () => {
  const { user } = useStateContext();
  const [teacherSchedule, setTeacherSchedule] = useState([]);

  useEffect(() => {
    axiosClient
      .get(`/api/getTeacherSchedule/${user.user_data.id}`)
      .then(response => {
        setTeacherSchedule(response.data.schedule);
      })
      .catch(error => {
        console.error(error);
      });
  }, [user.user_data.id]);

  const events = teacherSchedule.flatMap(({ discipline, schedules }) =>
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
      const classInfo = `${schedule.student_class_number} "${schedule.student_class_letter}"`;
      return {
        title: `${discipline} (${classInfo})`,
        start,
        end,
        allDay: false,
      };
    }),
  );

  const renderEventContent = eventInfo => {
    const startTime = DateTime.fromJSDate(eventInfo.event.start).toFormat(
      'HH:mm',
    );
    const endTime = DateTime.fromJSDate(eventInfo.event.end).toFormat('HH:mm');
    return (
      <div className="event-content p-1">
        <b>{`${startTime} - ${endTime}`}</b>
        <i>{` ${eventInfo.event.title}`}</i>
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

export default TeacherSchedule;
