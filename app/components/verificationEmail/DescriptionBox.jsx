export default function DescriptionBox({ title, color = "green" }) {
  const colorClasses = {
    green: {
      container: "bg-green-50",
      textarea: "bg-green-50 focus:ring-green-100",
    },
    blue: {
      container: "bg-blue-50",
      textarea: "bg-blue-50 focus:ring-blue-300",
    },
  };

  const styles = colorClasses[color] || colorClasses.green;

  return (
    <div
      className={`w-full sm:w-80 h-56 border-2 border-dashed border-gray-500 ${styles.container} rounded-lg flex flex-col items-center p-2 sm:p-4`}
    >
      <h3 className="text-gray-700 text-xl font-medium py-2">{title}</h3>
      <textarea
        className={`w-full h-full mt-2 p-2 border rounded-lg resize-none focus:outline-none focus:ring-1 ${styles.textarea}`}
        placeholder="Type your text here..."
        name="description"
        id="description"
      ></textarea>
    </div>
  );
}
