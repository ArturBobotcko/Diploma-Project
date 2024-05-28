import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../axios-client';
import { ru } from 'date-fns/locale';
import { formatInTimeZone } from 'date-fns-tz';

const AnswerHomework = () => {
  const { homeworkId } = useParams();
  const [responseText, setResponseText] = useState('');
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null); // Add state to hold the file URL
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [homework, setHomework] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient.get(`/api/getHomework/${homeworkId}`).then(response => {
      setHomework(response.data.homework);
      setResponseText(response.data.homework.response_text || '');
      if (response.data.homework.file_path) {
        setFileURL('http://localhost:8000/' + response.data.homework.file_path); // Update the file URL state
      }
    });
  }, [homeworkId]);

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
        `/api/answerStudentHomework/${homeworkId}`,
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
      remainingTime = new Date(deadline) - updateTime;
    }

    let days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    if (days < 0) {
      days *= -1;
    }
    if (hours < 0) {
      hours *= -1;
    }
    const remainingTimeText = `${days} дн. ${hours} час.`;

    return {
      remainingTimeText,
      isLate: remainingTime < 0,
    };
  };

  const getRemainingTimeData = () => {
    return calculateRemainingTime(
      homework.completion_status,
      homework.deadline,
      homework.updated_at,
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
          <h2 className="m-0">{homework.description}</h2>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h3 className="mb-2">Ответ на задание</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <table className="table">
              <tbody>
                <tr>
                  <th className="ps-1">Состояние ответа на задание</th>
                  {homework.completion_status === 0 ? (
                    <td className="bg-danger text-white">Не выполнено</td>
                  ) : (
                    <td className="bg-success text-white">Выполнено</td>
                  )}
                </tr>
                <tr>
                  <th className="ps-1">Состояние оценивания</th>
                  <td>TODO: Сделать оценивание</td>
                </tr>
                <tr>
                  <th className="ps-1">Последний срок сдачи</th>
                  <td>{formatDate(homework.deadline)}</td>
                </tr>
                <tr>
                  <th className="ps-1">Оставшееся время</th>
                  {homework.completion_status === 0 ? (
                    <td>{remainingTimeText}</td>
                  ) : isLate ? (
                    <td className="bg-danger text-white">
                      Ответ отправлен с опозданием на <br /> {remainingTimeText}
                    </td>
                  ) : (
                    <td className="bg-success text-white">
                      Ответ отправлен заранее на <br /> {remainingTimeText}
                    </td>
                  )}
                </tr>
                <tr>
                  <th className="ps-1">Последнее изменение</th>
                  {/* <td>{formatDate(homework.updated_at)}</td> */}
                  {homework.updated_at === null ? (
                    <td>Нет изменений</td>
                  ) : (
                    <td>{formatDate(homework.updated_at)}</td>
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
          <h3 className="mb-3">Отзыв</h3>
          <table className="table">
            <tbody>
              <tr>
                <th className="ps-1">Оценка</th>
                <td>сколько?</td>
              </tr>
              <tr>
                <th className="ps-1">Оценено в</th>
                <td>время</td>
              </tr>
              <tr>
                <th className="ps-1">Оценено</th>
                <td>Фио препода</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnswerHomework;
