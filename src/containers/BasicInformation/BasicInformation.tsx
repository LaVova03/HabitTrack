import "./BasicInformation.scss";
import { user } from "../../data/userData";
import { Profile } from "../../types/habitForm";
import ProgressLine from "./ProgressLine/ProgressLine";
import Schedule from "./Schedule/Schedule";

import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import TimeClockAmPm from "./TimeClockAmPm/TimeClockAmPm";

function BasicInformation() {
  const date = new Date();

  useEffect(() => {
    const date1 = new Date();
    console.log(date1);
  }, []);

  if (!user) {
    return (
      <Stack
        sx={{ color: "grey.500", margin: "auto" }}
        spacing={2}
        direction="row"
      >
        <CircularProgress color="secondary" />
      </Stack>
    );
  }
  return (
    <div className="BasicInformation">
      <div>
        <ul>
          {user
            ? Object.keys(user).map((el, i) => {
                if (el === "photo") {
                  return (
                    <li
                      key={i}
                      style={{
                        float: "right",
                        position: "relative",
                        top: "-140px",
                        left: "200px",
                      }}
                    >
                      <img src={user[el as keyof Profile]} alt="logo" />
                    </li>
                  );
                }
                return (
                  <li key={i}>
                    {el === "fullName"
                      ? "Full Name: "
                      : el === "age"
                      ? "Age: "
                      : el === "email"
                      ? "Email: "
                      : el === "profession"
                      ? "Profession: "
                      : null}
                    {user[el as keyof Profile]}
                  </li>
                );
              })
            : "Loading..."}
        </ul>
        <ProgressLine />
      </div>
      <div>
        <span
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "50px",
            width: "150%",
            justifyContent: "space-between",
          }}
        >
          <h1>{date.toLocaleDateString()}</h1>
          <TimeClockAmPm />
        </span>
        <Schedule />
      </div>
    </div>
  );
}

export default BasicInformation;
