import "./Home.scss";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import Artist from "../../assets/images/home/artist.jpg";
import Fitnes from "../../assets/images/home/fitnes.jpg";
import Med from "../../assets/images/home/med.jpg";
import Music from "../../assets/images/home/music.jpg";
import Runner from "../../assets/images/home/run.jpg";

import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const toLogin = (item: string): void => {
    sessionStorage.setItem("auth", item);
    navigate("/auth");
  };

  return (
    <div className="Home">
      <header>
        <h1>HabiTrack</h1>
        <Stack
          direction="row"
          spacing={2}
          sx={{ marginRight: "20px", height: "max-content" }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => toLogin("log")}
          >
            Log In
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => toLogin("sign")}
          >
            Sign In
          </Button>
        </Stack>
      </header>
      <main>
        <ul>
          <li>
            <img src={Artist} alt="logo" />
            <div>
              Create and track progress in developing new techniques and
              creative projects while staying inspired and organized.
            </div>
          </li>
          <li>
            <img src={Music} alt="logo" />
            <div>
              Organize your practice, rehearsals and work on works to support
              the continuous development of skills and creativity.
            </div>
          </li>
          <li>
            <img src={Runner} alt="logo" />
            <div>
              Track your training progress, goals and improvements to maintain
              motivation
              <br />
              and achieve new results.
            </div>
          </li>
          <li>
            <img src={Fitnes} alt="logo" />
            <div>
              Plan and optimize your training schedule, tasks and strategy to
              improve customer service efficiency and achieving their goals.
            </div>
          </li>
          <li>
            <img src={Med} alt="logo" />
            <div>
              Maintain a professional development routine, track learning
              objectives, skills and techniques to improve proficiency.
            </div>
          </li>
        </ul>
      </main>
      <footer>
        “HabiTrack is your assistant in the reproduction and recognition of
        habits.”
      </footer>
    </div>
  );
}

export default Home;
