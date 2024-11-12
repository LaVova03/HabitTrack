import "./LeftBar.scss";
import { useNavigate } from "react-router-dom";

function LeftBar() {
  const navigate = useNavigate();
  return (
    <ul className="LeftBar">
      <li onClick={() => navigate("main")}>Basic information</li>
      <li onClick={() => navigate("tracker")}>Habit tracker</li>
      <li onClick={() => navigate("categories")}>Categories and templates</li>
      <li onClick={() => navigate("gamification")}>Gamification</li>
      <li>Analytics</li>
      <li>Integration and notifications</li>
      <li onClick={() => navigate("profile")}>My profile</li>
      <li onClick={() => navigate("support")}>Help and support</li>
    </ul>
  );
}

export default LeftBar;
