import "../styles/CostInput.css";
import { MdSend } from "react-icons/md";

export default function CostInput({
  handleCharge,
  charge,
  resultTotalSum,
  total,
  handleSubmit,
  edit,
}) {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-center">
          <div className="form-group">
            <label htmlFor="charge">지출 항목</label>
            <input
              type="text"
              className="form-control"
              id="charge"
              name="charge"
              placeholder="예) 렌트비"
              value={charge}
              onChange={handleCharge}
            />
          </div>
          <div className="form-group">
            <label htmlFor="total">비용</label>
            <input
              type="number"
              className="form-control"
              id="total"
              name="total"
              placeholder="예) 100"
              value={total}
              onChange={resultTotalSum}
            />
          </div>
        </div>
        <button type="submit" className="btn">
          {edit ? `수정` : `추가`}
          <MdSend className="btn-icon" />
        </button>
      </form>
    </>
  );
}
