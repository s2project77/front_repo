export default function DescriptionBox({ title  }) {
  return (
    <div className="w-full sm:w-80 h-56 border-2 border-dashed border-gray-400 bg-green-50 rounded-lg flex flex-col items-center p-2 sm:p-4">
      <h3 className="text-gray-600 text-xl font-medium py-2">{title}</h3>
      <textarea
        className="w-full h-full mt-2 p-2 border rounded-lg resize-none bg-green-50 focus:outline-none focus:ring-1 focus:ring-green-100"
        placeholder="Type your text here..."
        name="description"
        id="description"
      ></textarea>
    </div>
  );
}