import "./HabitTracker.scss";
import { useEffect, useState } from "react";

import { Button } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { habitTracker as initialHabits } from "../../data/data";
import Modal from "../../components/Modal/Modal";
import AlertDialog from "../../components/ConfirmModal/AlertDialog";
import Timer from "../../components/Timer/Timer";
import ModalAddDescr from "./ModalAddDescr/ModalAddDescr";
import { chooseImage } from "../../features/chooseImage";

import { useAddTemplatesStore } from "../../slices/addTemplates";

function HabitTracker() {
  const [habitTracker, setHabitTracker] = useState(initialHabits);
  const [flag, setFlag] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [deleteItem, setDeleteItem] = useState<number | null>(null);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [isIndex, setIndex] = useState<number | null>(null);
  const [isTimer, setTimer] = useState<boolean>(false);
  const [isAddDescr, setAddDescr] = useState<boolean>(false);
  const [isAddDesIndex, setAddDesIndex] = useState<number | null>(null);

  const newHabits = useAddTemplatesStore((state) => state.newHabits);

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
  }, [flag, habitTracker]);

  const ConfirmDeletHabit = () => {
    if (deleteItem === 0 || deleteItem) {
      habitTracker.splice(deleteItem, 1);
      setFlag(true);
      setDeleteItem(null);
    }
  };

  useEffect(() => {
    if (newHabits && newHabits.length > 0) {
      setHabitTracker((prevTracker) => {
        const combined = [...prevTracker, ...newHabits];
        const uniqueHabits = combined.filter(
          (habit, index, self) =>
            index === self.findIndex((h) => h.id === habit.id)
        );
        return uniqueHabits;
      });
    }
  }, [newHabits]);

  return (
    <div className="HabitTracker">
      <header>
        <h3>My habits</h3>
        <Button
          sx={{ marginRight: "10px" }}
          color="secondary"
          variant="contained"
          onClick={() => setTimer((prev) => !prev)}
        >
          Timer
        </Button>
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
            <ul key={i}>
              <li>
                <div>№: {i + 1}</div>
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
              {Object.entries(habit).map(([key, value], j) => {
                if (key === "id") return null;

                return (
                  <li key={j}>
                    {key === "status"
                      ? `${key}: ${value ? "completed" : "not completed"}`
                      : `${key}: ${value}`}
                    {chooseImage({ key, habit, i, handleCheckboxChange })}
                  </li>
                );
              })}
              <li>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setAddDescr((prev) => !prev);
                    setAddDesIndex(i);
                  }}
                >
                  Add description
                </Button>
                {isAddDescr ? (
                  <ModalAddDescr
                    setAddDescr={setAddDescr}
                    isAddDescr={isAddDescr}
                    isAddDesIndex={isAddDesIndex}
                    habitTracker={habitTracker}
                    setHabitTracker={setHabitTracker}
                    setFlag={setFlag}
                  />
                ) : null}
              </li>
            </ul>
          ))
        ) : (
          <div>No habits</div>
        )}
        <div
          style={{
            position: "absolute",
            left: "65%",
            top: !isTimer ? "-300px" : "20px",
            transition: "0.3s ease",
          }}
        >
          <Timer setTimer={setTimer} />
        </div>
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
