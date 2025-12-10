export default function ErrorMessage({ message = "Сталася помилка" }) {
  return (
    <p style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
      {message}
    </p>
  );
}
