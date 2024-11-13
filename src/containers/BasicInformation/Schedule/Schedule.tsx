import "./Schedule.scss";
import { habitTracker } from "../../../data/data";
import Checkbox from "@mui/material/Checkbox";
import { MouseEvent } from "react"; // Импортируем MouseEvent из react

function Schedule() {
  return (
    <ul className="Schedule">
      {habitTracker.map((el, i) => (
        <li key={i}>
          <Checkbox
            color={el.status ? "success" : "error"}
            checked={el.status}
            onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()} // Используем React.MouseEvent
          />
          {`${el.habit} ${el.time}`}
        </li>
      ))}
    </ul>
  );
}

export default Schedule;
