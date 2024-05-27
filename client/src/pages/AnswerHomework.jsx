import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../axios-client';

const AnswerHomework = () => {
  const { homeworkId } = useParams();
  const [responseText, setResponseText] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h2 className="text-dark">Ответ на задание</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="responseText" className="form-label">
                Ответ:
              </label>
              <textarea
                id="responseText"
                className="form-control"
                value={responseText}
                onChange={e => setResponseText(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="file" className="form-label">
                Прикрепить файл:
              </label>
              <input
                type="file"
                id="file"
                className="form-control"
                onChange={e => setFile(e.target.files[0])}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Отправка...' : 'Отправить задание'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AnswerHomework;
