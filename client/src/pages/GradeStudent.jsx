import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../axios-client';

const GradeStudent = () => {
  const { studentId } = useParams();
  const location = useLocation();
  const { disciplineId } = location.state;
  const [gradeValue, setGradeValue] = useState('');
  const [gradeType, setGradeType] = useState('');
  const [comment, setComment] = useState('');
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const studentResponse = await axiosClient.get(`/api/user/${studentId}`);
        const studentData = studentResponse.data.user;

        setStudent(studentData);
      } catch (error) {
        setError('Ошибка при загрузке данных');
      }
    };

    fetchStudent();
  }, [studentId]);

  const handleSubmit = event => {
    event.preventDefault();

    const errors = {};
    if (!gradeType) {
      errors.gradeType = 'Тип оценки обязателен для заполнения';
    }
    if (!gradeValue) {
      errors.gradeValue = 'Оценка обязательна для заполнения';
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    axiosClient
      .post('/api/grade-student', {
        student_id: studentId,
        discipline_id: disciplineId,
        grade_type: gradeType,
        grade_value: gradeValue,
        comment: comment,
      })
      .then(response => {
        console.log(response);
        navigate('/grades');
      })
      .catch(error => {
        console.error(error);
      });
  };

  if (student === null) {
    return (
      <div className="container d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const previousGrades = student.disciplines.find(
    discipline => discipline.discipline.id === disciplineId,
  );

  const discipline = student.disciplines.find(
    item => item.discipline.id === disciplineId,
  );

  const disciplineName = discipline ? discipline.discipline.name : '';

  const lastThreeGrades = previousGrades ? previousGrades.grades.slice(-3) : [];

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-12 mb-4">
          <div className="p-4 bg-white border rounded shadow-sm text-center">
            <h2 className="text-dark mb-0">
              Выставление и предыдущие оценки по дисциплине:
            </h2>
            <h3 className="text-primary mt-2">{disciplineName}</h3>
            <h2 className="text-dark mt-3 mb-0">Ученика:</h2>
            <h3 className="text-primary mt-2">
              {student.user_data.surname} {student.user_data.name}{' '}
              {student.user_data.patronym}
            </h3>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card border-primary">
            <div className="card-header bg-primary text-white">
              {error && <div className="alert alert-danger">{error}</div>}
              {student !== null && (
                <>
                  <h2 className="mb-0">Выставить оценку</h2>
                </>
              )}
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Тип оценки</label>
                  <select
                    className="form-select"
                    value={gradeType}
                    onChange={e => setGradeType(e.target.value)}
                  >
                    <option value="">Выберите тип</option>
                    <option value="answer">Ответ на уроке</option>
                    <option value="test">Тестирование</option>
                  </select>
                  {errors.gradeType && (
                    <div className="text-danger">{errors.gradeType}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Оценка</label>
                  <input
                    type="number"
                    className="form-control"
                    value={gradeValue}
                    onChange={e => setGradeValue(e.target.value)}
                    min="2"
                    max="5"
                  />
                  {errors.gradeValue && (
                    <div className="text-danger">{errors.gradeValue}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Комментарий</label>
                  <textarea
                    className="form-control"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Поставить оценку
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card border-info">
            <div className="card-header bg-info text-white">
              <h2 className="mb-0">Последние три оценки по {disciplineName}</h2>
            </div>
            <div className="card-body">
              {lastThreeGrades.length > 0 ? (
                <ul className="list-group list-group-flush">
                  {lastThreeGrades.map((grade, index) => (
                    <li key={index} className="list-group-item">
                      <strong>Тип оценки:</strong> {grade.grade_type}
                      <br />
                      <strong>Оценка: </strong>
                      <span
                        className={`p-1 badge ${grade.grade_value <= 3.4 ? 'bg-danger' : grade.grade_value <= 4.4 ? 'bg-warning' : 'bg-success'}`}
                      >
                        {grade.grade_value}
                      </span>
                      <br />
                      <strong>Комментарий:</strong> {grade.comment}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-muted">
                  Нет предыдущих оценок для этой дисциплины
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeStudent;
