import { useEffect, useState } from "react";
import app from "../firebase";

import {
  getFirestore,
  collection,
  getDocs,
} from "firebase/firestore";

function History() {

  const db = getFirestore(app);

  const [history, setHistory] = useState([]);

  useEffect(() => {

    const fetchData = async () => {

      const querySnapshot = await getDocs(
        collection(db, "interviews")
      );

      const data = [];

      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });

      setHistory(data);
    };

    fetchData();

  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#071c2f",
        color: "white",
        padding: "40px",
      }}
    >

      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        📜 Interview History
      </h1>

      {history.map((item, index) => (

        <div
          key={index}
          style={{
            background: "#102b46",
            padding: "20px",
            borderRadius: "15px",
            marginBottom: "20px",
          }}
        >

          <h2>💼 Role: {item.role}</h2>

          <p>🏆 Score: {item.score}</p>

          <p>🗣 Communication: {item.communication}</p>

          <p>🔥 Confidence: {item.confidence}</p>

          <p>⚠ Warnings: {item.warnings}</p>

          <p>📅 Date: {item.date}</p>

        </div>
      ))}

    </div>
  );
}

export default History;