import "./Header.scss";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

function Header() {
  const navigate = useNavigate();
  return (
    <div className="Header">
      <h1>HabiTrack</h1>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          sessionStorage.removeItem("token");
          navigate("/");
        }}
      >
        Log out
      </Button>
    </div>
  );
}

export default Header;
