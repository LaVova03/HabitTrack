import "./CategoriesTemplates.scss";
import { useState } from "react";
import { Button } from "@mui/material";
import CategoriesModal from "./CategoriesModal/CategoriesModal";

function CategoriesTemplates() {
  const [isTemplates, setTemplates] = useState<string>("0");

  return (
    <div className="Categories">
      <ul>
        <li>
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: "105px" }}
            onClick={() => setTemplates("0")}
          >
            Artist
          </Button>
        </li>
        <li>
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: "105px" }}
            onClick={() => setTemplates("-332px")}
          >
            Musician
          </Button>
        </li>
        <li>
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: "105px" }}
            onClick={() => setTemplates("-664px")}
          >
            Runner
          </Button>
        </li>
        <li>
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: "105px" }}
            onClick={() => setTemplates("-996px")}
          >
            Fitnes
          </Button>
        </li>
        <li>
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: "105px" }}
            onClick={() => setTemplates("-1328px")}
          >
            Medical
          </Button>
        </li>
      </ul>
      <CategoriesModal isTemplates={isTemplates} />
    </div>
  );
}

export default CategoriesTemplates;
