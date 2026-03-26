import styles from "./acc.module.css";

function AccDisplay(props) {
  const { question, answer, open, handleOnClick, indexProp } = props;
  console.log(open, indexProp);

  return (
    <div
      style={{
        width: "1000px",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 10,
      }}
    >
      <div onClick={handleOnClick} className={`${styles.questionStyleAcc}`}>
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

export default AccDisplay;
