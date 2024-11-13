import "./ProgressLine.scss";
import { habitTracker } from "../../../data/data";
import { useEffect, useState } from "react";
import { useAddTemplatesStore } from "../../../slices/addTemplates";

interface Habit {
  id: number;
  habit: string;
  time: string;
  duration: string;
  periodicity: string;
  status: boolean;
}

function ProgressLine() {
  const newHabits = useAddTemplatesStore((state) => state.newHabits);

  const [isData, setData] = useState<Habit[]>([]);

  useEffect(() => {
    if (habitTracker.length > 0) {
      setData(habitTracker);
    }
  }, []);

  useEffect(() => {
    if (newHabits.length > 0) {
      setData((prevData) => [...prevData, ...newHabits]);
    }
  }, [newHabits]);

  return (
    <div className="ProgressLine">
      <label>Progress</label>
      <ul>
        {isData.length > 0 ? (
          isData.map((el, i) => (
            <li
              style={{
                border: el.status ? "2px solid gold" : "2px solid gray",
                borderLeft: "4px solid black",
                borderRight: "4px solid black",
                width: "100px",
              }}
              key={i}
            ></li>
          ))
        ) : (
          <li>Нет данных о привычках</li>
        )}
      </ul>
    </div>
  );
}

export default ProgressLine;
