import React from "react";
import "../styles/CostItem.css";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export default function CostItem({ cost, handleDelete, handleEdit }) {
  return (
    <li className="item">
      <div className="info">
        <span className="cost">{cost.charge}</span>
        <span className="total">{cost.total} 원</span>
      </div>
      <div>
        <button className="edit-btn" onClick={() => handleEdit(cost.id)}>
          <MdEdit />
        </button>
        <button
          className="clear-btn"
          onClick={() => {
            handleDelete(cost.id);
          }}
        >
          <MdDelete />
        </button>
      </div>
    </li>
  );
}
