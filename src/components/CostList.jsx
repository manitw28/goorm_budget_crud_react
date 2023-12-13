import "../styles/CostList.css";
import CostItem from "./CostItem";
import { MdDelete } from "react-icons/md";

export default function CostList({
  costs,
  handleDelete,
  deleteAll,
  handleEdit,
}) {
  return (
    <>
      <ul className="list">
        {costs.map((cost) => {
          return (
            <CostItem
              cost={cost}
              key={cost.id}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          );
        })}
      </ul>
      <button className="btn" onClick={deleteAll}>
        목록 지우기 <MdDelete className="btn-icon" />
      </button>
    </>
  );
}
