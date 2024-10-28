import "./LeftBar.scss";
import { useNavigate } from "react-router-dom";

function LeftBar() {
  const navigate = useNavigate();
  return (
    <ul className="LeftBar">
      <li onClick={() => navigate("main")}>Basic information</li>
      <li onClick={() => navigate("tracker")}>Habit tracker</li>
      <li>Categories and templates</li>
      <li>Gamification</li>
      <li>Analytics</li>
      <li>Integration and notifications</li>
      <li>User profile</li>
      <li>Help and support</li>
    </ul>
  );
}

export default LeftBar;
