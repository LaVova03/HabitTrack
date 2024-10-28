import "./Layout.scss";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import LeftBar from "../../components/LeftBar/LeftBar";

function Layout() {
  return (
    <div className="Layout">
      <header>
        <Header />
      </header>
      <main>
        <LeftBar />
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
