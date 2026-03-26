import { useState } from "react";

function QNADisplay(props) {
  const { question, answer } = props;

  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        width: "1000px",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 10,
      }}
    >
      <div
        style={{
          borderRadius: "10px",
          backgroundColor: "#48a1ca",

          padding: "10px",
          textAlign: "left",
          cursor: "pointer",
        }}
        className="product"
        onClick={function () {
          setOpen(!open);
        }}
      >
        <p style={{ padding: 0 }}>{question}</p>
      </div>
      {open === true && (
        <div>
          <p style={{ textAlign: "left" }}>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default QNADisplay;
