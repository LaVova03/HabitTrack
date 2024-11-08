import "./CategoriesModal.scss";
import Templates from "./Templates/Templates";

interface CategoriesModalProps {
  isTemplates: string;
}

function CategoriesModal({ isTemplates }: CategoriesModalProps) {
  return (
    <div className="CategoriesModal">
      <ul style={{ position: "absolute", top: `${isTemplates}` }}>
        <li>
          <Templates nameTemplate="Artist" />
        </li>
        <li>
          <Templates nameTemplate="Musician" />
        </li>
        <li>
          <Templates nameTemplate="Runner" />
        </li>
        <li>
          <Templates nameTemplate="Fitnes" />
        </li>
        <li>
          <Templates nameTemplate="Medical" />
        </li>
      </ul>
    </div>
  );
}

export default CategoriesModal;
