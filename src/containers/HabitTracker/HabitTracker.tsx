import "./HabitTracker.scss";
import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { habitTracker as initialHabits } from "../../../public/data";

function HabitTracker() {
  const [habitTracker, setHabitTracker] = useState(initialHabits);

  const handleCheckboxChange = (index: number) => {
    const updatedHabits = habitTracker.map((habit, i) => {
      if (i === index) {
        return { ...habit, status: !habit.status };
      }
      return habit;
    });
    setHabitTracker(updatedHabits);
  };

  return (
    <div className="HabitTracker">
      <h3>My habits</h3>
      {habitTracker && habitTracker.length > 0 ? (
        habitTracker.map((habit, i) => (
          <ul key={habit.id}>
            <li>№: {habit.id}</li>
            <li>Habit: {habit.name}</li>
            <li>At: {habit.time}</li>
            <li>Duration: {habit.duration}</li>
            <li>Periodicity: {habit.periodicity}</li>
            <li>
              Status:
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
    </div>
  );
}

export default HabitTracker;
