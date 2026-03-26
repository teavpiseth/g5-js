import React, { useState } from "react";
import QNADisplay from "./QNADisplay";
import AccDisplay from "./AccDisplay";

export function Accordion() {
  const [openIndex, setOpenIndex] = useState(null);
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
    <div>
      {arrQNA.map((qna, index) => (
        <AccDisplay
          indexProp={index}
          open={openIndex === index}
          key={qna.question}
          question={qna.question}
          answer={qna.Answer}
          handleOnClick={function () {
            setOpenIndex(index);
          }}
        />
      ))}
    </div>
  );
}
