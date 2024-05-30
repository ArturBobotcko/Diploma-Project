import { useState } from 'react';
import axiosClient from '../axios-client';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatInTimeZone } from 'date-fns-tz';
import { ru } from 'date-fns/locale';

const CheckAssignment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const student = location.state?.student;

  const [teacherNote, setTeacherNote] = useState(
    student?.assignment?.teacher_note || '',
  );
  const [checked, setChecked] = useState(student?.assignment?.checked || false);
  const [grade, setGrade] = useState(student?.assignment?.grade || '');
  const [studentId, setStudentId] = useState(student?.student_data?.id);
  const [disciplineId, setDisciplineId] = useState(
    student?.assignment?.discipline_id,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        grade: grade,
        student_id: student.student_data.id,
        discipline_id: student.assignment.discipline_id,
      };

      if (teacherNote) {
        payload.teacher_note = teacherNote;
      }

      const response = await axiosClient.put(
        `/api/checkAssignment/${student.assignment.id}`,
        payload,
      );

      if (response.status === 200) {
        navigate(-1);
      } else {
        setError(
          'Не удалось сохранить изменения. Пожалуйста, попробуйте снова.',
        );
      }
    } catch (error) {
      setError(
        'Произошла ошибка при сохранении изменений. Пожалуйста, попробуйте снова.',
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = date => {
    try {
      return formatInTimeZone(
        new Date(date),
        'Europe/Moscow',
        'dd MMMM yyyy, HH:mm',
        { locale: ru },
      );
    } catch (error) {
      console.error('Invalid date format:', date);
      return 'Некорректная дата';
    }
  };

  const calculateRemainingTime = (completionStatus, deadline, update) => {
    let remainingTime;
    if (completionStatus === 0) {
      const currentTime = new Date();
      remainingTime = new Date(deadline) - currentTime;
    } else {
      const updateTime = new Date(update);
      const deadlineTime = new Date(deadline);
      remainingTime = deadlineTime - updateTime;
    }

    let seconds = Math.floor(remainingTime / 1000);
    if (seconds < 0) {
      seconds *= -1;
    }
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    let remainingTimeText;
    if (days === 0) {
      if (hours === 0) {
        remainingTimeText = `${minutes % 60} мин.`;
      } else {
        remainingTimeText = `${hours % 24} час. ${minutes % 60} мин.`;
      }
    } else {
      remainingTimeText = `${days} дн. ${hours % 24} час. ${minutes % 60} мин.`;
    }

    return {
      remainingTimeText,
      isLate: remainingTime < 0,
    };
  };

  const getRemainingTimeData = () => {
    return calculateRemainingTime(
      student.assignment.completion_status,
      student.assignment.deadline,
      student.assignment.done_at,
    );
  };

  const { remainingTimeText, isLate } = getRemainingTimeData();

  return (
    <div className="container mt-4">
      <div className="card mb-3">
        <div className="card-body">
          <h2 className="card-title text-dark m-0">
            Проверка задания для <br />
            {student.student_data.surname} {student.student_data.name}{' '}
            {student.student_data.patronym}
          </h2>
        </div>
      </div>
      <table className="table table-bordered bg-white">
        <tbody>
          <tr>
            <th>Описание задания</th>
            <td>{student.assignment.description}</td>
          </tr>
          <tr>
            <th>Последний срок сдачи</th>
            <td>{formatDate(student.assignment.deadline)}</td>
          </tr>
          <tr>
            <th>Дата выполнения</th>
            {/* <td>
              {student.assignment.done_at
                ? formatDate(student.assignment.done_at)
                : 'Не выполнено'}
            </td> */}
            {student.assignment.completion_status === 0 ? (
              isLate ? (
                <td>
                  Ответ просрочен на <br />
                  {remainingTimeText}
                </td>
              ) : (
                <td>{remainingTimeText}</td>
              )
            ) : isLate ? (
              <td className="bg-danger text-white">
                Ответ отправлен с опозданием на <br />
                {remainingTimeText}
              </td>
            ) : (
              <td className="bg-success text-white">
                Ответ отправлен заранее на <br />
                {remainingTimeText}
              </td>
            )}
          </tr>
          <tr>
            <th>Статус выполнения</th>
            {student.student_data.completion_status === 0 ? (
              <td className="bg-danger text-white">Не выполнено</td>
            ) : (
              <td className="bg-success text-white">Выполнено</td>
            )}
          </tr>
        </tbody>
      </table>
      <div className="card mb-3">
        <div className="card-body">
          <h3 className="card-title">Ответ ученика</h3>
          <textarea
            className="form-control mb-2"
            rows="5"
            value={student.assignment.response_text}
            readOnly
          />
          {student.assignment.file_path !== null ? (
            <a
              href={`http://localhost:8000/${student.assignment.file_path}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Скачать файл ответа
            </a>
          ) : (
            <p className="m-0">Файл ответа не был прикреплен</p>
          )}
        </div>
      </div>
      <table className="table table-bordered bg-white">
        <tbody>
          {student.assignment.checked === 0 ? (
            <tr>
              <th>Статус проверки</th>
              <td className="bg-danger text-white">Не проверено</td>
            </tr>
          ) : (
            <>
              <tr>
                <th>Статус проверки</th>
                <td className="bg-success text-white">Проверено</td>
              </tr>
              <tr>
                <th>Дата проверки</th>
                <td>{formatDate(student.assignment.checked_at)}</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
      <div className="card mb-3">
        <div className="card-body">
          <h3 className="card-title">Заметка преподавателя</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="5"
              value={teacherNote}
              onChange={e => setTeacherNote(e.target.value)}
            />
          </div>
          <input
            type="number"
            className="form-control mb-3"
            placeholder="Введите оценку"
            value={grade}
            onChange={e => setGrade(e.target.value)}
            min="2"
            max="5"
          />
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckAssignment;
