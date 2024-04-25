import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className="container-fluid p-0 d-flex flex-column min-vh-100">
      <Navbar />
      <div
        className="container-fluid bg-white text-secondary my-5"
        style={{ flex: '1 0 auto' }}
      >
        <div className="container"></div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
