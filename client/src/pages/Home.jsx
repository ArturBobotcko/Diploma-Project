import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Cookies from "js-cookie";
import axios from "axios";
import { Navbar } from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();
  const getUserData = async () => {
    const token = Cookies.get("token");
    // console.log(token);
    const url = "http://localhost:8000/api/profile";
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await axios
      .get(url, { headers: headers })
      .then((response) => {
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const logout = async () => {
    const token = Cookies.get("token");
    // console.log(token);
    const url = "http://localhost:8000/api/logout";
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await axios
      .get(url, { headers: headers })
      .then((response) => {
        console.log(response.data);
        Cookies.remove("token");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };
  return (
    <div className="container-fluid p-0 d-flex flex-column min-vh-100">
      <Navbar />
      <div
        className="container-fluid bg-white text-secondary my-5"
        style={{ flex: "1 0 auto" }}
      >
        <div className="container">
          <button className="btn btn-primary" onClick={getUserData}>
            profile
          </button>
          <button className="btn btn-primary" onClick={logout}>
            logout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
