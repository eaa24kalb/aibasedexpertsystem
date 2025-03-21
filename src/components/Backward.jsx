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

  const possibleBooks = books.map(book => book.title);

  const handleSelect = (key, value) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);

    if (step === 3) {
      inferForward(newAnswers);
    } else {
      setStep(step + 1);
    }
  };

  const inferForward = (answers) => {
    const result = books.find((book) => {
      return Object.entries(answers).every(([key, value]) => book[key] === value);
    });
    setRecommendation(result ? result.title : "No recommendation found");
  };

  const inferBackward = (targetBook) => {
    const book = books.find((b) => b.title === targetBook);
    if (!book) {
      setRecommendation("No matching book found");
      return;
    }
    
    const newAnswers = {};

    newAnswers["genre"] = book.genre;

    if (book.genre === "Fantasy") {
      newAnswers["subgenre"] = book.subgenre;
    }
    if (book.genre === "Mystery") {
      newAnswers["era"] = book.era;
    }
    if (book.genre === "Sci-Fi") {
      newAnswers["type"] = book.type;
    }
    if (book.genre === "History") {
      newAnswers["era"] = book.era;
    }
    if (book.genre === "Self-help") {
      newAnswers["focus"] = book.focus;
    }

    setAnswers(newAnswers);
    setRecommendation(book.title);
  };

  return (
    <div>
      <h1>Book Checker</h1>
      {recommendation ? (
        <h2>Recommended Book: {recommendation}</h2>
      ) : (
        <>
          {step === 1 && (
            <>
              <h2>Do you prefer Fiction or Non-Fiction?</h2>
              <button onClick={() => handleSelect("genre", "Fantasy")}>Fiction</button>
              <button onClick={() => handleSelect("genre", "History")}>Non-Fiction</button>
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

          {step === 3 && answers.genre === "Fantasy" && answers.subgenre === "Epic" && (
            <>
              <h2>Do you prefer a long series or a single book?</h2>
              <button onClick={() => handleSelect("length", "Series")}>Series</button>
              <button onClick={() => handleSelect("length", "Single Book")}>Single Book</button>
            </>
          )}

          {step === 3 && answers.genre === "Sci-Fi" && answers.type === "Hard" && (
            <>
              <h2>Do you prefer books with deep scientific concepts or more action-focused?</h2>
              <button onClick={() => handleSelect("focus", "Scientific")}>Scientific</button>
              <button onClick={() => handleSelect("focus", "Action")}>Action</button>
            </>
          )}

          {step === 3 && answers.genre === "Mystery" && answers.era === "Classic" && (
            <>
              <h2>Do you prefer a detective or a private investigator?</h2>
              <button onClick={() => handleSelect("detectiveType", "Detective")}>Detective</button>
              <button onClick={() => handleSelect("detectiveType", "Private Investigator")}>Private Investigator</button>
            </>
          )}
        </>
      )}

      <h2>Test Backward Chaining</h2>
      {possibleBooks.map((book) => (
        <button key={book} onClick={() => inferBackward(book)}>{book}</button>
      ))}
    </div>
  );
};

export default ExpertSystem;
