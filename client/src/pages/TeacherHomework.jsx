import { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';
import { useNavigate } from 'react-router-dom';
import { ru } from 'date-fns/locale';
import { formatInTimeZone } from 'date-fns-tz';

const TeacherHomework = () => {
  const { user } = useStateContext();
  const [selectedDiscipline, setSelectedDiscipline] = useState('');
  const [selectedCheckDiscipline, setSelectedCheckDiscipline] = useState('');
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [selectedCheckClassId, setSelectedCheckClassId] = useState(null);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [filteredCheckClasses, setFilteredCheckClasses] = useState([]);
  const [studentsInClass, setStudentsInClass] = useState([]);
  const [isIndividual, setIsIndividual] = useState(false);
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [assignedHomeworks, setAssignedHomeworks] = useState([]);
  const navigate = useNavigate();

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

  const handleDisciplineChange = event => {
    const disciplineId = parseInt(event.target.value, 10);
    if (event.target.id === 'disciplineCheckSelect') {
      setSelectedCheckDiscipline(disciplineId);
      const selectedClasses = user.classes.find(
        element => element.discipline.id === disciplineId,
      );
      if (selectedClasses) {
        setFilteredCheckClasses(selectedClasses.classes);
      } else {
        setFilteredCheckClasses([]);
      }
    } else if (event.target.id === 'disciplineSelect') {
      setSelectedDiscipline(disciplineId);
      // Фильтруем классы в зависимости от выбранной дисциплины
      const selectedClasses = user.classes.find(
        element => element.discipline.id === disciplineId,
      );
      if (selectedClasses) {
        setFilteredClasses(selectedClasses.classes);
      } else {
        setFilteredClasses([]);
      }
    }
  };

  const handleClassChange = event => {
    const studentClassId = parseInt(event.target.value, 10);
    if (event.target.id === 'classCheckSelect') {
      setSelectedCheckClassId(studentClassId);
    } else if (event.target.id === 'classSelect') {
      setSelectedClassId(studentClassId);
    }

    if (studentClassId != null) {
      axiosClient
        .get(`/api/getStudentsFromClass/${studentClassId}`)
        .then(response => {
          if (event.target.id === 'classSelect') {
            setStudentsInClass(response.data.students);
          }
        });
    }
  };

  const handleCheckboxChange = event => {
    setIsIndividual(event.target.checked);
    if (!event.target.checked) {
      setSelectedStudents([]);
    }
  };

  const handleStudentCheckboxChange = studentId => {
    setSelectedStudents(prevSelectedStudents =>
      prevSelectedStudents.includes(studentId)
        ? prevSelectedStudents.filter(id => id !== studentId)
        : [...prevSelectedStudents, studentId],
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true); // Устанавливаем состояние загрузки в true

    const homeworkData = {
      teacher_id: user.user_data.id,
      discipline_id: selectedDiscipline,
      student_class_id: selectedClassId,
      description: description,
      deadline: deadline,
      students: isIndividual
        ? selectedStudents
        : studentsInClass.map(student => student.id),
    };

    axiosClient
      .post('/api/assignHomework', homeworkData)
      .then(() => {
        alert('Домашнее задание успешно добавлено');
        // Очистить форму после отправки
        setSelectedDiscipline('');
        setSelectedClassId(null);
        setFilteredClasses([]);
        setStudentsInClass([]);
        setIsIndividual(false);
        setDescription('');
        setDeadline('');
        setSelectedStudents([]);
      })
      .catch(error => {
        console.error('Error assigning homework:', error);
        alert('Произошла ошибка при добавлении домашнего задания');
      })
      .finally(() => {
        setIsLoading(false); // Устанавливаем состояние загрузки в false
      });
  };

  const handleOnCheckHomeworkClick = homeworkId => {
    navigate(`/check-homework/${homeworkId}`);
  };

  const renderAssignedHomeworks = () => {
    const sortedHomeworks = [...assignedHomeworks].sort(
      (a, b) => new Date(a.deadline) - new Date(b.deadline),
    );

    return (
      <table className="table table-bordered m-0">
        <thead>
          <tr>
            <th>Задание</th>
            <th>Дата сдачи</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {sortedHomeworks.map(homework => (
            <tr
              key={homework.id}
              onClick={() => handleOnCheckHomeworkClick(homework.id)}
              style={{ cursor: 'pointer' }}
            >
              <td>{homework.description}</td>
              <td>{formatDate(homework.deadline)}</td>
              <td>
                {new Date(homework.deadline) < new Date()
                  ? 'Просрочено'
                  : 'Активно'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  useEffect(() => {
    const loadAssignedHomeworks = () => {
      if (selectedCheckClassId && selectedCheckDiscipline) {
        axiosClient
          .get(
            `/api/getAssignedHomeworks/${selectedCheckClassId}?teacher_id=${user.user_data.id}&discipline_id=${selectedCheckDiscipline}`,
          )
          .then(response => {
            setAssignedHomeworks(response.data.homeworks);
          });
      }
    };
    loadAssignedHomeworks();
  }, [selectedCheckClassId, selectedCheckDiscipline, user.user_data.id]);

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title m-0">
            Выставление домашних заданий ученикам
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="disciplineSelect" className="form-label">
                Выберите дисциплину
              </label>
              <select
                id="disciplineSelect"
                className="form-select"
                value={selectedDiscipline}
                onChange={handleDisciplineChange}
              >
                <option value="">Выберите дисциплину</option>
                {user.classes.map((element, index) => (
                  <option key={index} value={element.discipline.id}>
                    {element.discipline.name}
                  </option>
                ))}
              </select>
            </div>
            {!isNaN(selectedDiscipline) && selectedDiscipline && (
              <div className="col-md-6 mb-3">
                <label htmlFor="classSelect" className="form-label">
                  Выберите класс
                </label>
                <select
                  id="classSelect"
                  className="form-select"
                  value={selectedClassId}
                  onChange={handleClassChange}
                >
                  <option value="">Выберите класс</option>
                  {filteredClasses.map((classItem, index) => (
                    <option key={index} value={classItem.id}>
                      {classItem.number} &quot;{classItem.letter}&quot;
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          {!isNaN(selectedClassId) && selectedClassId && (
            <>
              <div className="mb-3">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="individualCheckbox"
                    checked={isIndividual}
                    onChange={handleCheckboxChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="individualCheckbox"
                  >
                    Индивидуальное задание
                  </label>
                </div>
              </div>
              {isIndividual ? (
                <>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Выбрать</th>
                          <th>Фамилия</th>
                          <th>Имя</th>
                          <th>Отчество</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentsInClass.map(student => (
                          <tr key={student.id}>
                            <td>
                              <input
                                type="checkbox"
                                className="form-check-input"
                                checked={selectedStudents.includes(student.id)}
                                onChange={() =>
                                  handleStudentCheckboxChange(student.id)
                                }
                              />
                            </td>
                            <td>{student.surname}</td>
                            <td>{student.name}</td>
                            <td>{student.patronym}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {selectedStudents.length > 0 && (
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                          Текст задания
                        </label>
                        <textarea
                          id="description"
                          className="form-control"
                          value={description}
                          onChange={e => setDescription(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="deadline" className="form-label">
                          Дата сдачи
                        </label>
                        <input
                          type="datetime-local"
                          id="deadline"
                          className="form-control"
                          value={deadline}
                          onChange={e => setDeadline(e.target.value)}
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Загрузка...' : 'Отправить'}
                      </button>
                    </form>
                  )}
                </>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Текст задания
                    </label>
                    <textarea
                      id="description"
                      className="form-control"
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="deadline" className="form-label">
                      Дата сдачи
                    </label>
                    <input
                      type="datetime-local"
                      id="deadline"
                      className="form-control"
                      value={deadline}
                      onChange={e => setDeadline(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Загрузка...' : 'Отправить'}
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
      <div className="card mt-4">
        <div className="card-header">
          <h5 className="card-title m-0">Проверка домашних заданий</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="disciplineCheckSelect" className="form-label">
                Выберите дисциплину
              </label>
              <select
                id="disciplineCheckSelect"
                className="form-select"
                value={selectedCheckDiscipline}
                onChange={handleDisciplineChange}
              >
                <option value="">Выберите дисциплину</option>
                {user.classes.map((element, index) => (
                  <option key={index} value={element.discipline.id}>
                    {element.discipline.name}
                  </option>
                ))}
              </select>
            </div>
            {!isNaN(selectedCheckDiscipline) && selectedCheckDiscipline && (
              <div className="col-md-6 mb-3">
                <label htmlFor="classCheckSelect" className="form-label">
                  Выберите класс
                </label>
                <select
                  id="classCheckSelect"
                  className="form-select"
                  value={selectedCheckClassId}
                  onChange={handleClassChange}
                >
                  <option value="">Выберите класс</option>
                  {filteredCheckClasses.map((classItem, index) => (
                    <option key={index} value={classItem.id}>
                      {classItem.number} &quot;{classItem.letter}&quot;
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          {!isNaN(selectedCheckClassId) &&
            selectedCheckClassId &&
            (selectedCheckDiscipline && assignedHomeworks.length > 0 ? (
              renderAssignedHomeworks()
            ) : (
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title m-0">
                    Раннее назначенные домашние задания
                  </h5>
                </div>
                <div className="card-body">
                  <p className="m-0">Нет ранее заданных домашних заданий</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherHomework;
