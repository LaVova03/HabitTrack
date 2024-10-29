import "./HabitTracker.scss";
import { useEffect, useState } from "react";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import CableIcon from "@mui/icons-material/Cable";
import Checkbox from "@mui/material/Checkbox";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";

import { habitTracker as initialHabits } from "../../../public/data";
import Modal from "../../components/Modal/Modal";

function HabitTracker() {
  const [habitTracker, setHabitTracker] = useState(initialHabits);
  const [flag, setFlag] = useState<boolean>(false);

  const handleCheckboxChange = (index: number) => {
    const updatedHabits = habitTracker.map((habit, i) => {
      if (i === index) {
        return { ...habit, status: !habit.status };
      }
      return habit;
    });
    setHabitTracker(updatedHabits);
  };

  useEffect(() => {
    if (flag) {
      setFlag(false);
    }
  }, [flag, initialHabits]);

  return (
    <div className="HabitTracker">
      <header>
        <h3>My habits</h3>
        <Modal setFlag={setFlag} />
      </header>
      <main>
        {habitTracker && habitTracker.length > 0 ? (
          habitTracker.map((habit, i) => (
            <ul key={habit.id}>
              <li>
                <div>№: {habit.id}</div>
                <div>
                  <button
                    onClick={() => {
                      habitTracker.splice(i, 1);
                      setFlag(true);
                    }}
                  >
                    <DeleteForeverIcon color="error" />
                  </button>
                  <button>
                    <EditNoteIcon color="primary" />
                  </button>
                </div>
              </li>
              <li>
                Habit: {habit.name}
                <AccountTreeIcon sx={{ marginLeft: "5px" }} color="success" />
              </li>
              <li>
                At: {habit.time}
                <AccessTimeIcon sx={{ marginLeft: "5px" }} color="primary" />
              </li>
              <li>
                Duration: {habit.duration}
                <AccessAlarmIcon sx={{ marginLeft: "5px" }} color="secondary" />
              </li>
              <li>
                Periodicity: {habit.periodicity}
                <CableIcon sx={{ marginLeft: "5px" }} color="primary" />
              </li>
              <li>
                Status: {habit.status ? "completed" : "not completed"}
                <Checkbox
                  checked={habit.status}
                  onChange={() => handleCheckboxChange(i)}
                  color="success"
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                />
              </li>
            </ul>
          ))
        ) : (
          <div>No habits</div>
        )}
      </main>
    </div>
  );
}

export default HabitTracker;
