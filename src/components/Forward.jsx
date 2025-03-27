import React, { useState } from "react";

const books = [
  { title: "Lord of the Rings", genre: "Fantasy", subgenre: "Epic" },
  { title: "Harry Potter", genre: "Fantasy", subgenre: "Light" },
  { title: "Sherlock Holmes", genre: "Mystery", era: "Classic" },
  { title: "Gone Girl", genre: "Mystery", era: "Modern" },
  { title: "The Martian", genre: "Sci-Fi", type: "Hard" },
  { title: "Dune", genre: "Sci-Fi", type: "Soft" },
  { title: "SPQR", genre: "History", era: "Ancient" },
  { title: "Sapiens", genre: "History", era: "Modern" },
  { title: "Atomic Habits", genre: "Self-help", focus: "Productivity" },
  { title: "The Power of Now", genre: "Self-help", focus: "Mindfulness" }
];

const ExpertSystem = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [recommendation, setRecommendation] = useState(null);

  const handleSelect = (key, value) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);

    // Determine if we need to show recommendation
    const isFinalStep = step === 2; // All genres reach the final step at 2
    if (isFinalStep) {
      inferRecommendation(newAnswers);
    } else {
      setStep(step + 1);
    }
  };

  const inferRecommendation = (selectedAnswers) => {
    // Filter books that match all chosen options
    let results = books.filter((book) =>
      Object.entries(selectedAnswers).every(([key, value]) => book[key] === value)
    );

    setRecommendation(results.length > 0 ? results.map((book) => book.title).join(", ") : "No recommendation found");
  };

  return (
    <div>
      <h1>Book Picker</h1>
      {recommendation ? (
        <h2>Recommended Book(s): {recommendation}</h2>
      ) : (
        <>
          {step === 1 && (
            <>
              <h2>What genre do you prefer?</h2>
              <button onClick={() => handleSelect("genre", "Fantasy")}>Fantasy</button>
              <button onClick={() => handleSelect("genre", "History")}>History</button>
              <button onClick={() => handleSelect("genre", "Sci-Fi")}>Sci-Fi</button>
              <button onClick={() => handleSelect("genre", "Self-help")}>Self-help</button>
              <button onClick={() => handleSelect("genre", "Mystery")}>Mystery</button>
            </>
          )}

          {step === 2 && answers.genre === "Fantasy" && (
            <>
              <h2>What type of Fantasy?</h2>
              <button onClick={() => handleSelect("subgenre", "Epic")}>Epic</button>
              <button onClick={() => handleSelect("subgenre", "Light")}>Light</button>
            </>
          )}

          {step === 2 && answers.genre === "History" && (
            <>
              <h2>Do you prefer Ancient or Modern history?</h2>
              <button onClick={() => handleSelect("era", "Ancient")}>Ancient</button>
              <button onClick={() => handleSelect("era", "Modern")}>Modern</button>
            </>
          )}

          {step === 2 && answers.genre === "Sci-Fi" && (
            <>
              <h2>What type of Sci-Fi?</h2>
              <button onClick={() => handleSelect("type", "Hard")}>Hard</button>
              <button onClick={() => handleSelect("type", "Soft")}>Soft</button>
            </>
          )}

          {step === 2 && answers.genre === "Mystery" && (
            <>
              <h2>Do you prefer Classic or Modern Mystery?</h2>
              <button onClick={() => handleSelect("era", "Classic")}>Classic</button>
              <button onClick={() => handleSelect("era", "Modern")}>Modern</button>
            </>
          )}

          {step === 2 && answers.genre === "Self-help" && (
            <>
              <h2>What do you want to focus on?</h2>
              <button onClick={() => handleSelect("focus", "Productivity")}>Productivity</button>
              <button onClick={() => handleSelect("focus", "Mindfulness")}>Mindfulness</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ExpertSystem;
