import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import CableIcon from "@mui/icons-material/Cable";
import Checkbox from "@mui/material/Checkbox";
import { Form } from "../types/habitForm";

interface PropType {
  key: string;
  habit: Form;
  i: number;
  handleCheckboxChange?: (value: number) => void;
}

export const chooseImage = ({
  key,
  habit,
  i,
  handleCheckboxChange,
}: PropType) => {
  switch (key) {
    case "habit":
      return <AccountTreeIcon sx={{ marginLeft: "5px" }} color="success" />;
    case "time":
      return <AccessTimeIcon sx={{ marginLeft: "5px" }} color="primary" />;
    case "duration":
      return <AccessAlarmIcon sx={{ marginLeft: "5px" }} color="secondary" />;
    case "periodicity":
      return <CableIcon sx={{ marginLeft: "5px" }} color="primary" />;
    case "status":
      return (
        <Checkbox
          checked={habit.status}
          onChange={
            handleCheckboxChange ? () => handleCheckboxChange(i) : () => {}
          }
          color="success"
          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
        />
      );
    default:
      console.log("Sorry, we are out of " + key + ".");
  }
};
