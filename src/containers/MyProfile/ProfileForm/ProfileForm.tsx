import "./ProfileForm.scss";
import { Profile } from "../MyProfile";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

interface ProfileProp {
  setData: (newData: Partial<Profile>) => void;
  isData: Profile;
}

function ProfileForm({ setData, isData }: ProfileProp) {
  const [isNewData, setNewData] = useState<Profile>({
    fullName: "",
    age: "",
    email: "",
    profession: "",
    photo: "",
  });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setData({
      ...isData,
      age:
        isNewData.age && isNewData.age !== isData.age
          ? isNewData.age
          : isData.age,
      fullName:
        isNewData.fullName && isNewData.fullName !== isData.fullName
          ? isNewData.fullName
          : isData.fullName,
      email:
        isNewData.email && isNewData.email !== isData.email
          ? isNewData.email
          : isData.email,
      profession:
        isNewData.profession && isNewData.profession !== isData.profession
          ? isNewData.profession
          : isData.profession,
    });

    setNewData({
      fullName: "",
      age: "",
      email: "",
      profession: "",
      photo: "",
    });
  };

  return (
    <form onSubmit={submit} className="profile_form">
      <TextField
        type="text"
        value={isNewData.fullName}
        label="FullName"
        onChange={(e) =>
          setNewData((prev) => ({ ...prev, fullName: e.target.value }))
        }
        sx={{ marginBottom: "10px" }}
      />
      <TextField
        type="text"
        value={isNewData.age}
        label="Age"
        onChange={(e) =>
          setNewData((prev) => ({ ...prev, age: e.target.value }))
        }
        sx={{ marginBottom: "10px" }}
      />
      <TextField
        type="text"
        value={isNewData.email}
        label="Email"
        onChange={(e) =>
          setNewData((prev) => ({ ...prev, email: e.target.value }))
        }
        sx={{ marginBottom: "10px" }}
      />
      <TextField
        type="text"
        value={isNewData.profession}
        label="Profession"
        onChange={(e) =>
          setNewData((prev) => ({ ...prev, profession: e.target.value }))
        }
        sx={{ marginBottom: "10px" }}
      />
      <Button type="submit" variant="contained" color="secondary">
        Submit
      </Button>
    </form>
  );
}

export default ProfileForm;
