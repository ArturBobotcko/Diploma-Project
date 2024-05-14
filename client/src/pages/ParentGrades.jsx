import { useState, useMemo } from 'react';
import { useStateContext } from '../contexts/ContextProvider';

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
    <div className="container">
      <select
        className="form-select mb-3 col-3"
        onChange={e => setSelectedChild(user.children[e.target.value])}
      >
        <option selected value="">
          Выберите ученика
        </option>
        {user.children.map((child, index) => (
          <option key={index} value={index}>
            {child.surname} {child.name} {child.patronym}
          </option>
        ))}
      </select>
      {selectedChild && (
        <div className="container-fluid p-0">
          <div className="table-responsive">
            <table
              className="table table-hover table-bordered border-muted"
              style={{ backgroundColor: 'white' }}
            >
              <thead>
                <tr>
                  <th scope="col">№</th>
                  <th scope="col">Предметы</th>
                  <th scope="col">Оценки</th>
                  <th scope="col">Пропуски</th>
                  <th scope="col">Средний балл</th>
                </tr>
              </thead>
              <tbody>
                {selectedChild.disciplines.map((element, index) => {
                  const avg = averages[index];
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{element.name}</td>
                      <td>
                        <div className="d-flex gap-1 flex-row">
                          {element.grades.map((element, index) => (
                            <div
                              key={index}
                              className={
                                'd-inline-block p-1 fw-bold text-white ' +
                                (element.grade_value <= 3
                                  ? 'bg-danger'
                                  : element.grade_value === 4
                                    ? 'bg-warning'
                                    : 'bg-success')
                              }
                            >
                              {element.grade_value}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td></td>
                      <td>
                        <div className="d-flex gap-1 flex-row">
                          {!isNaN(avg) && (
                            <div
                              className={
                                'd-inline-block p-1 fw-bold text-white ' +
                                (avg <= 3.4
                                  ? 'bg-danger'
                                  : avg <= 4.4
                                    ? 'bg-warning'
                                    : 'bg-success')
                              }
                            >
                              {avg}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentGrades;
