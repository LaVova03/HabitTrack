import "./ProfileForm.scss";
import { Profile } from "../MyProfile";
import TextField from "@mui/material/TextField";

interface ProfileProp {
  setData: (newData: Partial<Profile>) => void;
  isData: Profile;
}

function ProfileForm({ setData, isData }: ProfileProp) {
  return (
    <form className="profile_form">
      <TextField
        type="text"
        value={isData.fullName}
        onChange={(e) => setData({ fullName: e.target.value })}
      />
      <TextField
        type="text"
        value={isData.age}
        onChange={(e) => setData({ age: e.target.value })}
      />
      <TextField
        type="text"
        value={isData.email}
        onChange={(e) => setData({ email: e.target.value })}
      />
      <TextField
        type="text"
        value={isData.profession}
        onChange={(e) => setData({ profession: e.target.value })}
      />
    </form>
  );
}

export default ProfileForm;
