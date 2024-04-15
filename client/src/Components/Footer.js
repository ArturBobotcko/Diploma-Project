import React from "react";

const Footer = () => {
  return (
    <div className="container-fluid border-top text-light bg-dark">
      <div className="container">
        <footer class="row py-5 my-5 flex-column flex-md-row justify-content-center align-content-center gap-5">
          <div className="col d-flex flex-column align-items-center text-center">
            <div className="nav flex-column">
              <h5 className="mb-3">О компании</h5>
              <a className="nav-link text-muted p-0 mb-2" href="#">
                О нас
              </a>
              <a className="nav-link text-muted p-0 mb-2" href="#">
                Как это работает
              </a>
              <a className="nav-link text-muted p-0 mb-2" href="#">
                Преимущества
              </a>
            </div>
          </div>
          <div className="col d-flex flex-column align-items-center text-center">
            <div className="nav flex-column">
              <h5 className="mb-3">Возможности</h5>
              <a className="nav-link text-muted p-0 mb-2" href="#">
                Преподавателям
              </a>
              <a className="nav-link text-muted p-0 mb-2" href="#">
                Родителям
              </a>
              <a className="nav-link text-muted p-0 mb-2" href="#">
                Учащимся
              </a>
            </div>
          </div>
          <div className="col d-flex flex-column align-items-center text-center">
            <div className="nav flex-column">
              <h5 className="mb-3">Поддержка</h5>
              <a className="nav-link text-muted p-0 mb-2" href="#">
                Портал службы поддержки
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
