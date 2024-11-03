import "./HabitTracker.scss";
import { useEffect, useState } from "react";

import { Button } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import CableIcon from "@mui/icons-material/Cable";
import Checkbox from "@mui/material/Checkbox";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { habitTracker as initialHabits } from "../../../public/data";
import Modal from "../../components/Modal/Modal";
import AlertDialog from "../../components/ConfirmModal/AlertDialog";

// Интерфейс для формы
export interface Form {
  id: number;
  name: string;
  time: string;
  duration: string;
  periodicity: string;
  status: boolean;
}

function HabitTracker() {
  const [habitTracker, setHabitTracker] = useState(initialHabits);
  const [flag, setFlag] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [deleteItem, setDeleteItem] = useState<number | null>(null);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [isIndex, setIndex] = useState<number | null>(null);

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
  }, [flag, initialHabits, habitTracker]);

  const ConfirmDeletHabit = () => {
    if (deleteItem === 0 || deleteItem) {
      habitTracker.splice(deleteItem, 1);
      setFlag(true);
      setDeleteItem(null);
    }
  };

  return (
    <div className="HabitTracker">
      <header>
        <h3>My habits</h3>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => setOpenCreate(true)}
        >
          Create
        </Button>
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
                      setDeleteItem(i);
                      setOpen(true);
                    }}
                  >
                    <DeleteForeverIcon color="error" />
                  </button>
                  <EditNoteIcon
                    color="primary"
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      setOpenEdit(true);
                      setIndex(i);
                    }}
                  />
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
      <AlertDialog
        open={open}
        setOpen={setOpen}
        ConfirmDeletHabit={ConfirmDeletHabit}
      />
      <Modal
        open={openCreate}
        openEdit={openEdit}
        setOpen={setOpenCreate}
        setOpenEdit={setOpenEdit}
        isIndex={isIndex}
        setFlag={setFlag}
        setIndex={setIndex}
      />
    </div>
  );
}

export default HabitTracker;
