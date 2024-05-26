import { useState, useMemo } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const ParentGrades = () => {
  const average = nums => {
    let sum = 0;
    nums.forEach(element => {
      sum += element.grade_value;
    });
    return sum / nums.length;
  };

  const { user } = useStateContext();
  const [selectedChild, setSelectedChild] = useState(null);

  const averages = useMemo(() => {
    if (!selectedChild || !selectedChild.disciplines) return [];
    return selectedChild.disciplines.map(element => average(element.grades));
  }, [selectedChild]);

  return (
    <div className="container my-4">
      <div className="col-md-6 mb-3">
        <select
          className="form-select"
          onChange={e => setSelectedChild(user.children[e.target.value])}
        >
          <option value="" selected>
            Выберите ученика
          </option>
          {user.children.map((child, index) => (
            <option key={index} value={index}>
              {child.surname} {child.name} {child.patronym}
            </option>
          ))}
        </select>
      </div>

      {selectedChild && (
        <>
          <div className="card mb-3">
            <div className="card-body bg-white text-dark">
              <h4 className="mb-0">
                Оценки ученика: {selectedChild.surname} {selectedChild.name}{' '}
                {selectedChild.patronym}
              </h4>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table bg-white table-hover table-bordered m-0">
              <thead className="table-white">
                <tr>
                  <th scope="col">№</th>
                  <th scope="col">Предметы</th>
                  <th scope="col">Оценки</th>
                  <th scope="col">Пропуски</th>
                  <th scope="col">Средний балл</th>
                </tr>
              </thead>
              <tbody>
                {selectedChild.disciplines.map((discipline, index) => {
                  const avg = averages[index];
                  return (
                    <tr key={index}>
                      <th className="align-middle" scope="row">
                        {index + 1}
                      </th>
                      <td className="align-middle">
                        {discipline.discipline.name}
                      </td>
                      <td className="align-middle">
                        <div className="d-flex flex-wrap gap-1">
                          {discipline.grades.map((grade, index) => (
                            <OverlayTrigger
                              key={index}
                              placement="bottom"
                              overlay={
                                <Tooltip>{`Тип оценки: ${grade.grade_type}, Комментарий: ${grade.comment}`}</Tooltip>
                              }
                            >
                              <button
                                type="button"
                                className={
                                  'p-1 fw-bold text-white btn ' +
                                  (grade.grade_value <= 3
                                    ? 'btn-danger'
                                    : grade.grade_value === 4
                                      ? 'btn-warning'
                                      : 'btn-success')
                                }
                              >
                                {grade.grade_value}
                              </button>
                            </OverlayTrigger>
                          ))}
                        </div>
                      </td>
                      <td></td>
                      <td>
                        {!isNaN(avg) && (
                          <button
                            type="button"
                            className={
                              'p-1 fw-bold text-white btn ' +
                              (avg <= 3
                                ? 'btn-danger'
                                : avg === 4
                                  ? 'btn-warning'
                                  : 'btn-success')
                            }
                          >
                            {avg.toFixed(2)}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ParentGrades;
