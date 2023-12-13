import { useState } from "react";
import Alert from "./components/Alert";
import CostInput from "./components/CostInput";
import CostList from "./components/CostList";
import './styles/App.css';

export default function App() {
  const [id, setId] = useState("");
  const [costs, setCosts] = useState([]);
  const [charge, setCharge] = useState("");
  const [total, setTotalSum] = useState(0);

  const [alert, setAlert] = useState({
    show: false,
    text: "",
  });

  const [edit, setEdit] = useState(false);

  const handleDelete = (id) => {
    setCosts((costs) => {
      return costs.filter((cost) => cost.id !== id);
    });
    showAlert({ type: "delete", text: "아이템이 삭제되었습니다." });
  };

  const handleCharge = (e) => {
    setCharge(e.target.value);
  };

  const resultTotalSum = (e) => {
    setTotalSum(e.target.valueAsNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && total > 0) {
      if (edit) {
        const newCosts = costs.map((item) => {
          return item.id === id
            ? {
                ...item,
                charge,
                total,
              }
            : item;
        });
        setCosts(newCosts);
        setEdit(false);
        setCharge("");
        setTotalSum(0);
        showAlert({ 
          type: "modify", 
          text: "아이템이 수정되었습니다.",
        });
      } else {
        const newCost = { id: crypto.randomUUID(), charge, total };
        const newCosts = [...costs, newCost];
        setCosts(newCosts);
        setCharge("");
        setTotalSum(0);
        showAlert({ 
          type: "create", 
          text: "아이템이 생성되었습니다.",
        });
      }
    } else {
      showAlert({
        type: "warning",
        text: "지출 항목과 비용을 기입해 주세요.",
      });
    }
  };

  const showAlert = ({ type, text }) => {
    setAlert(() => (
      {
        show: true,
        type,
        text,
      }
    ));
    setTimeout(() => {
      setAlert({ show: false });
    }, 4000);
  };

  const handleEdit = (id) => {
    const cost = costs.find((item) => item.id === id);
    const { charge, total } = cost;
    setId(id);
    setCharge(charge);
    setTotalSum(total);
    setEdit(true);
  };

  const deleteAll = () => {
    setCosts([]);
  };

  return (
    <main className="App-main">
      {alert.show ? 
        <Alert type={alert.type} text={alert.text} /> 
        : null}
      <h1>예산 계산기</h1>
      <div
        style={{
          width: "100%",
          backgroundColor: "white",
          padding: "1rem",
        }}
      >
        <CostInput
          handleCharge={handleCharge}
          resultTotalSum={resultTotalSum}
          handleSubmit={handleSubmit}
          charge={charge}
          total={total}
          edit={edit}
        />
      </div>
      <div
        style={{
          width: "100%",
          backgroundColor: "white",
          padding: "1rem",
        }}
      >
        <CostList
          costs={costs}
          handleDelete={handleDelete}
          deleteAll={deleteAll}
          handleEdit={handleEdit}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          marginTop: "1rem",
        }}
      >
        <p
          style={{
            fontSize: "2rem",
          }}
        >
          {`총 지출: `}
          <span>{costs.reduce((acc, cur) => acc + cur.total, 0)} 원</span>
        </p>
      </div>
    </main>
  );
}
