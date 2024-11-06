import "./CategoriesModal.scss";

interface CategoriesModalProps {
  isTemplates: string;
}

function CategoriesModal({ isTemplates }: CategoriesModalProps) {
  return (
    <div className="CategoriesModal">
      <ul style={{ top: `${isTemplates}` }}>
        <li>Artist</li>
        <li>Musician</li>
        <li>Runner</li>
        <li>Fitnes</li>
        <li>Medical</li>
      </ul>
    </div>
  );
}

export default CategoriesModal;
