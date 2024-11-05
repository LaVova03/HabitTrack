import "./MyProfile.scss";
import { useRef, useState, ChangeEvent } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import Logo from "../../assets/profile/person.png";
import ProfileForm from "./ProfileForm/ProfileForm";

export interface Profile {
  fullName: string;
  age: string;
  email: string;
  profession: string;
}

function MyProfile() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isPhoto, setPhoto] = useState<string | null>(null);
  const [isData, setData] = useState<Profile>({
    fullName: "fullName",
    age: "age",
    email: "email",
    profession: "profession",
  });

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
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
      <div>
        <div>
          <img
            src={isPhoto || Logo}
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
            ? Object.keys(isData).map((key) => (
                <li key={key}>{`${key}: ${isData[key as keyof Profile]}`}</li>
              ))
            : null}
        </ul>
      </div>
      <ProfileForm setData={updateProfileData} isData={isData} />
    </div>
  );
}

export default MyProfile;
