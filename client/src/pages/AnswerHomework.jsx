import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../axios-client';
import { ru } from 'date-fns/locale';
import { formatInTimeZone } from 'date-fns-tz';
import { useStateContext } from '../contexts/ContextProvider';

const AnswerHomework = () => {
  const { homeworkId } = useParams();
  const { user } = useStateContext();
  const [responseText, setResponseText] = useState('');
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [homework, setHomework] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get(`/api/getHomework/${homeworkId}?student_id=${user.user_data.id}`)
      .then(response => {
        setHomework(response.data.homework);
        const responseText = response.data.homework.response_text || '';
        setResponseText(responseText);
        if (response.data.homework.file_path) {
          const fileURL =
            'http://localhost:8000/' + response.data.homework.file_path;
          setFileURL(fileURL);
        }
      });
  }, [homeworkId, user.user_data.id]);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('response_text', responseText);
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await axiosClient.post(
        `/api/answerStudentHomework/${homeworkId}?student_id=${user.user_data.id}`,
        formData,
      );
      if (response.status === 200) {
        navigate('/homeworks');
      } else {
        setError('Не удалось отправить задание. Пожалуйста, попробуйте снова.');
      }
    } catch (error) {
      setError(
        'Произошла ошибка при отправке задания. Пожалуйста, попробуйте снова.',
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = date => {
    try {
      const zonedDate = formatInTimeZone(
        new Date(date),
        'Europe/Moscow',
        'dd MMMM yyyy, HH:mm',
        { locale: ru },
      );
      return zonedDate;
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
      homework.completion_status,
      homework.deadline,
      homework.done_at,
    );
  };

  const { remainingTimeText, isLate } = getRemainingTimeData();

  if (Object.keys(homework).length === 0) {
    return (
      <div className="container d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card mb-3">
        <div className="card-body">
          <h2 className="m-0 text-dark">{homework.description}</h2>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h3 className="mb-3">Ответ на задание</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <table className="table">
              <tbody>
                <tr>
                  <th className="ps-1">Состояние ответа на задание</th>
                  {homework.completion_status === 0 ? (
                    <td className="bg-danger text-white">Не выполнено</td>
                  ) : homework.checked === 0 ? (
                    <td className="bg-warning text-white">
                      Отправлено на оценку
                    </td>
                  ) : (
                    <td className="bg-success text-white">Выполнено</td>
                  )}
                </tr>
                <tr>
                  <th className="ps-1">Состояние оценивания</th>
                  {homework.checked === 0 ? (
                    <td className="bg-danger text-white">Не оценено</td>
                  ) : (
                    <td className="bg-success text-white">Оценено</td>
                  )}
                </tr>
                <tr>
                  <th className="ps-1">Последний срок сдачи</th>
                  <td>{formatDate(homework.deadline)}</td>
                </tr>
                <tr>
                  <th className="ps-1">Оставшееся время</th>
                  {homework.completion_status === 0 ? (
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
                  <th className="ps-1">Последнее изменение</th>
                  {homework.done_at === null ? (
                    <td>Нет изменений</td>
                  ) : (
                    <td>{formatDate(homework.done_at)}</td>
                  )}
                </tr>
                <tr>
                  <th className="ps-1">Ответ в виде файла</th>
                  <td>
                    {fileURL ? (
                      <a
                        href={fileURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Скачать прикрепленный файл
                      </a>
                    ) : (
                      <input
                        type="file"
                        id="file"
                        className="form-control"
                        onChange={e => setFile(e.target.files[0])}
                      />
                    )}
                  </td>
                </tr>
                <tr>
                  <th className="ps-1">Ответ в виде текста</th>
                  <td>
                    <textarea
                      id="responseText"
                      className="form-control"
                      value={responseText}
                      onChange={e => setResponseText(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Отправка...' : 'Отправить ответ'}
            </button>
          </form>
        </div>
      </div>
      <div className="card mt-4">
        <div className="card-body">
          <h3 className="mb-3">Отзыв учителя</h3>
          <table className="table">
            <tbody>
              <tr>
                <th className="ps-1">Оценка</th>
                {homework.grade !== null ? (
                  <td>
                    <span
                      className={`p-1 badge ${homework.grade <= 3.4 ? 'bg-danger' : homework.grade <= 4.4 ? 'bg-warning' : 'bg-success'}`}
                    >
                      {homework.grade}
                    </span>
                  </td>
                ) : (
                  <td>Не оценено</td>
                )}
              </tr>
              <tr>
                <th className="ps-1">Время оценивания</th>
                {homework.checked_at !== null ? (
                  <td>{formatDate(homework.checked_at)}</td>
                ) : (
                  <td>Не оценено</td>
                )}
              </tr>
              <tr>
                <th className="ps-1">Учитель</th>
                <td>
                  {homework.teacher.surname} {homework.teacher.name}{' '}
                  {homework.teacher.patronym}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnswerHomework;
