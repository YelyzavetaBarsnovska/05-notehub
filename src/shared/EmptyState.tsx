export default function EmptyState({ message = "Немає даних" }) {
  return (
    <p style={{ textAlign: "center", opacity: 0.6, marginTop: "20px" }}>
      {message}
    </p>
  );
}
