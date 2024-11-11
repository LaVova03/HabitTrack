import "./Templates.scss";

import { templates } from "../../../../data/templates";
import { Form, TemplatesProfession } from "../../../../types/habitForm";
import { chooseImage } from "../../../../features/chooseImage";
import { useAddTemplatesStore } from "../../../../slices/addTemplates";
import AlertDialog from "../../../../components/AlertDialog/AlertDialog";
import { useState } from "react";

interface NameTemplate {
  nameTemplate: string;
}

function Templates({ nameTemplate }: NameTemplate) {
  const addTemplates = useAddTemplatesStore((state) => state.addTemplates);

  const [open, setOpen] = useState<boolean>(false);
  const [item, setItem] = useState<Form | null>(null);

  const Confirm = () => {
    if (item) {
      addTemplates(item);
      setItem(null);
    }
  };

  return (
    <div className="Templates_cards">
      {templates?.map((el, i) => {
        if (nameTemplate === Object.keys(el)[0]) {
          const habits = el[nameTemplate as keyof TemplatesProfession];
          return (
            <ul key={i}>
              {habits &&
                habits.map((habit: Form) => (
                  <li
                    key={habit.id}
                    onClick={() => {
                      setItem(habit);
                      setOpen(true);
                    }}
                  >
                    {Object.keys(habit).map((key, j) => {
                      if (key === "id") {
                        return null;
                      }
                      return (
                        <p key={j}>
                          {key === "status"
                            ? `${key}: ${
                                habit[key] ? "completed" : "not completed"
                              }`
                            : `${key}: ${habit[key]}`}
                          {chooseImage({ key, habit, i })}
                        </p>
                      );
                    })}
                  </li>
                ))}
            </ul>
          );
        } else {
          return null;
        }
      })}
      <AlertDialog open={open} setOpen={setOpen} Confirm={Confirm} isTemplates/>
    </div>
  );
}

export default Templates;
