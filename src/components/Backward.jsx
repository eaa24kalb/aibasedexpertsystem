import { useState } from 'react';
import styles from '../Backward.module.css';
import readinggif from '../assets/readinggif.gif';

export default function BackwardChainBook() {
  const [facts, setFacts] = useState({
    fiction: null,
    genre: null,
    subgenre: null,
    era: null,
    focus: null,
    selectedBook: null,
    conclusion: null,
  });

  const books = [
    { title: "Lord of the Rings", genre: "Fantasy", type: "Fiction", subgenre: "Epic" },
    { title: "Harry Potter", genre: "Fantasy", type: "Fiction", subgenre: "Light" },
    { title: "Sherlock Holmes", genre: "Mystery", type: "Fiction", era: "Classic" },
    { title: "Gone Girl", genre: "Mystery", type: "Fiction", era: "Modern" },
    { title: "The Martian", genre: "Sci-Fi", type: "Fiction" },
    { title: "Dune", genre: "Sci-Fi", type: "Fiction" },
    { title: "SPQR", genre: "History", type: "Non-fiction", era: "Ancient" },
    { title: "Sapiens", genre: "History", type: "Non-fiction", era: "Modern" },
    { title: "Atomic Habits", genre: "Self-help", type: "Non-fiction", focus: "Productivity" },
    { title: "The Power of Now", genre: "Self-help", type: "Non-fiction", focus: "Mindfulness" }
  ];

  const selectBook = (book) => {
    setFacts({
      fiction: null,
      genre: null,
      subgenre: null,
      era: null,
      focus: null,
      selectedBook: book.title,
      conclusion: null
    });
  };

  const askQuestion = (fact, question, onYes, onNo) => (
    <div key={fact} className={styles.questionContainer}>
      <p className={styles.question}>{question}</p>
      <div className={styles.buttonGroup}>
        <button className={styles.buttonYes} onClick={() => { setFacts((prev) => ({ ...prev, [fact]: "Yes" })); onYes(); }}>Yes</button>
        <button className={styles.buttonNo} onClick={() => { setFacts((prev) => ({ ...prev, [fact]: "No" })); onNo(); }}>No</button>
      </div>
    </div>
  );

  const backwardChain = () => {
    if (!facts.selectedBook) {
      return (
        <div className={styles.selectionContainer}>
          <h2>Select a book:</h2>
          <div className={styles.bookList}>
            {books.map((book, index) => (
              <button key={index} className={styles.bookButton} onClick={() => selectBook(book)}>
                {book.title}
              </button>
            ))}
          </div>
        </div>
      );
    }

    const selectedBook = books.find(b => b.title === facts.selectedBook);

    if (facts.fiction === null) {
      return askQuestion(
        "fiction",
        "Do you want to read fiction?",
        () => {
          if (selectedBook.type !== "Fiction") {
            setFacts((prev) => ({ ...prev, conclusion: `It's not a match 💔. You prefer fiction, but "${selectedBook.title}" is non-fiction.` }));
          }
        },
        () => {
          if (selectedBook.type === "Fiction") {
            setFacts((prev) => ({ ...prev, conclusion: `It's not a match 💔. You prefer non-fiction, but "${selectedBook.title}" is fiction.` }));
          }
        }
      );
    }

    if (facts.conclusion) {
      return <p className={styles.conclusion}>{facts.conclusion}</p>;
    }

    if (facts.genre === null) {
      return askQuestion(
        "genre",
        `Do you want to read ${selectedBook.genre.toLowerCase()}?`,
        () => {},
        () => setFacts((prev) => ({ ...prev, conclusion: `It's not a match 💔. You don't want to read ${selectedBook.genre.toLowerCase()}.` }))
      );
    }

    if (selectedBook.genre === "Fantasy" && facts.subgenre === null) {
      return askQuestion(
        "subgenre",
        `Do you want to read ${selectedBook.subgenre.toLowerCase()} fantasy?`,
        () => {},
        () => setFacts((prev) => ({ ...prev, conclusion: `It's not a match 💔. You don't want to read ${selectedBook.subgenre.toLowerCase()} fantasy.` }))
      );
    }

    if (selectedBook.genre === "Mystery" && facts.era === null) {
      return askQuestion(
        "era",
        `Do you want to read a ${selectedBook.era.toLowerCase()} mystery?`,
        () => {},
        () => setFacts((prev) => ({ ...prev, conclusion: `It's not a match 💔. You prefer a different type of mystery. This one is ${selectedBook.era.toLowerCase()}.` }))
      );
    }

    let reasons = [`It's a ${selectedBook.type.toLowerCase()} book.`];

    if (selectedBook.genre) reasons.push(`It's a ${selectedBook.genre.toLowerCase()} book.`);
    if (selectedBook.subgenre) reasons.push(`It's specifically ${selectedBook.subgenre.toLowerCase()} fantasy.`);
    if (selectedBook.era) reasons.push(`It covers ${selectedBook.era.toLowerCase()} history/mystery.`);
    if (selectedBook.focus) reasons.push(`It focuses on ${selectedBook.focus.toLowerCase()}.`);

    return (
      <div className={styles.resultContainer}>
        <h2 className={styles.matchTitle}>Yayy, it's a match!❤️</h2>
        <h2 className={styles.bookTitle}>You should definitely give "{selectedBook.title}" a chance!</h2>
        <img src={readinggif} alt="Reading Gif" style={{width: "300px"}}/>
        <p className={styles.reasonsHeader}>Here’s why:</p>
        <ul className={styles.reasonsList}>
          {reasons.map((reason, index) => <li key={index}>{reason}</li>)}
        </ul>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Backward Chaining: Book Checker</h1>
      <p className={styles.description}>Do you already know what you want to read? Check if the book is a match for you.</p>
      {backwardChain()}
    </div>
  );
}
