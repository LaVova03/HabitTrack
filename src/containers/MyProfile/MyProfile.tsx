import "./MyProfile.scss";
import { useRef, useState, ChangeEvent } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import Logo from "../../assets/profile/person.png";
import ProfileForm from "./ProfileForm/ProfileForm";
import { user } from "../../data/userData";
import { Profile } from "../../types/habitForm";

function MyProfile() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isData, setData] = useState<Profile>({
    fullName: user?.fullName || "",
    age: user?.age || "",
    email: user?.email || "",
    profession: user?.profession || "",
    photo: user?.photo || "",
  });

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setData((prev) => ({ ...prev, photo: URL.createObjectURL(file) }));
    }
  };

  const updateProfileData = (newData: Partial<Profile>) => {
    setData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  return (
    <div className="profile">
      <div style={{ width: "50%" }}>
        <div>
          <img
            src={isData.photo || Logo}
            alt="user_photo"
            style={{
              width: "100px",
              height: "100px",
              border: "2px solid black",
              objectFit: "contain",
              borderRadius: "50%",
            }}
          />
          <input
            ref={inputRef}
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <button>
            <SettingsIcon
              onClick={handleButtonClick}
              color="primary"
              sx={{ cursor: "pointer" }}
            />
          </button>
        </div>
        <ul>
          {isData.fullName
            ? Object.keys(isData).map((key) => {
                if (key === "photo") {
                  return null;
                }
                return (
                  <li key={key}>{`${key}: ${isData[key as keyof Profile]}`}</li>
                );
              })
            : null}
        </ul>
      </div>
      <ProfileForm setData={updateProfileData} isData={isData} />
    </div>
  );
}

export default MyProfile;
