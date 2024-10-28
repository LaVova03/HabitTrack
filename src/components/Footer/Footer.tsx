import "./Footer.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";
import Medal from "../../assets/images/footer/medal.png";

function Footer() {
  return (
    <ul className="Footer">
      <li>
        <img src={Medal} alt="logo" />
      </li>
      <li>© 2024 HabiTrack</li>
      <li>
        <ul>
          <li
            onClick={() =>
              window.open("https://www.instagram.com/_voha_jan_/", "_blank")
            }
          >
            {"Instagram"}
            <InstagramIcon sx={{ color: "#ff348d" }} />
          </li>
          <li onClick={() => window.open("https://t.me/Voha_Jan", "_blank")}>
            {"Telegram"}
            <TelegramIcon sx={{ color: "rgb(0, 157, 232)" }} />
          </li>
          <li
            onClick={() =>
              window.open(
                "https://www.facebook.com/profile.php?id=100008929712628",
                "_blank"
              )
            }
          >
            {"Facebook"}
            <FacebookIcon sx={{ color: "#0866ff" }} />
          </li>
        </ul>
      </li>
    </ul>
  );
}

export default Footer;
