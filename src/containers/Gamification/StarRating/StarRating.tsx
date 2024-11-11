import "./StarRating.scss";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

import { habitTracker } from "../../../data/data";

import Gold from "../../../assets/images/game/gold.png";
import Silver from "../../../assets/images/game/silver.png";
import Bronze from "../../../assets/images/game/bronze.png";

export default function StarRating() {
  const [value, setValue] = useState<number>(0);
  const [text] = useState<string>(
    value > 4
      ? "Congratulations, you have great results!"
      : value > 3
      ? "Not bad, but you need to push it!"
      : "It’s a little weak, you need to push it!"
  );

  useEffect(() => {
    if (habitTracker && habitTracker.length > 0) {
      const quantity = habitTracker.reduce((acc, el) => {
        if (el.status) {
          return acc + 1;
        }
        return acc;
      }, 0);

      const percentage = (quantity / habitTracker.length) * 100;

      const stars = Math.round((percentage / 100) * 5 * 2) / 2;
      setValue(stars);
    }
  }, []);

  return (
    <div className="StarRating">
      <h1>{text}</h1>
      <div>
        <Box
          sx={{
            "& > legend": { mt: 2 },
          }}
        >
          <Typography
            component="legend"
            fontSize={30}
            padding={0}
            marginBottom={2}
          >
            Execution of a task
          </Typography>
          <Rating
            name="half-rating-read"
            defaultValue={2.5}
            value={value}
            precision={0.5}
            readOnly
            sx={{ fontSize: "40px" }}
          />
          <p>Your rating: {value}</p>
        </Box>
        <div>
          <img src={value > 4 ? Gold : value > 3 ? Silver : Bronze} alt="cup" />
          <label>{`Your ${
            value > 4 ? "gold" : value > 3 ? "silver" : "bronze"
          } cup`}</label>
        </div>
      </div>
    </div>
  );
}
