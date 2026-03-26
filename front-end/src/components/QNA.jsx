import QNADisplay from "./QNADisplay";

const QNA = () => {
  const arrQNA = [
    {
      question: "What is Java script?",
      Answer: "Java script?",
    },
    {
      question: "2 What is Java script?",
      Answer: "2 Java script?",
    },
    {
      question: "3 What is Java script?",
      Answer: "3 Java script?",
    },
    {
      question: "4 What is Java script?",
      Answer: "4 Java script?",
    },
    {
      question: "4 What is Java script?",
      Answer: "4 Java script?",
    },
  ];
  return (
    <>
      {arrQNA.map((t) => (
        <QNADisplay key={t.question} question={t.question} answer={t.Answer} />
      ))}
    </>
  );
};
export default QNA;
