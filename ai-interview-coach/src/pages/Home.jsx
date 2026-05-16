import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(to bottom right, #031d33, #0a4f70, #0cc0df)",
      }}
    >
      <div
        style={{
          width: "600px",
          padding: "50px",
          borderRadius: "30px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(10px)",
          textAlign: "center",
          boxShadow: "0 0 40px rgba(0,255,255,0.5)",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "60px",
            marginBottom: "10px",
          }}
        >
          AI Interview
        </h1>

        <p
          style={{
            color: "white",
            fontSize: "28px",
            marginBottom: "40px",
          }}
        >
          Practice interviews with AI and improve confidence 🚀
        </p>

        <button
          onClick={() => navigate("/interview")}
          style={{
            padding: "18px 50px",
            fontSize: "25px",
            border: "none",
            borderRadius: "15px",
            background: "#00e5ff",
            color: "black",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 0 25px #00e5ff",
          }}
        >
          Start Interview
        </button>
      </div>
    </div>
  );
}

export default Home;