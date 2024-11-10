import "./Templates.scss";

import { templates } from "../../../../data/templates";
import { Form, TemplatesProfession } from "../../../../types/habitForm";
import { chooseImage } from "../../../../features/chooseImage";
import { useAddTemplatesStore } from "../../../../slices/addTemplates";

interface NameTemplate {
  nameTemplate: string;
}

function Templates({ nameTemplate }: NameTemplate) {
  const addTemplates = useAddTemplatesStore((state) => state.addTemplates);

  const handleClick = (item: Form): void => {
    addTemplates(item);
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
                  <li key={habit.id} onClick={() => handleClick(habit)}>
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
    </div>
  );
}

export default Templates;
