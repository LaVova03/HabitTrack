import "./BasicInformation.scss";
import { user } from "../../data/userData";
import { Profile } from "../MyProfile/MyProfile";
import ProgressLine from "./ProgressLine/ProgressLine";

import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

function BasicInformation() {
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
  );
}

export default BasicInformation;
