export default function WorkHourBox({
  isChecked,
  toggleChecked,
  fromTime,
  setFromTime,
  toTime,
  setToTime,
  color = "green", // "green" or "blue"
}) {
  const colors = {
    green: {
      container: "bg-green-50",
      buttonEnabled: "bg-green-500",
      ring: "focus:ring-green-500 focus:border-green-500",
    },
    blue: {
      container: "bg-blue-50",
      buttonEnabled: "bg-blue-500",
      ring: "focus:ring-blue-500 focus:border-blue-500",
    },
  };

  const currentColor = colors[color] || colors.green;

  const inputStyles = `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg ${currentColor.ring} block w-full p-2.5`;
  const buttonStyles = `py-2 px-4 sm:px-12 mt-4 flex items-center justify-center rounded-ms transition-colors duration-200 w-full sm:w-auto ${
    isChecked
      ? `${currentColor.buttonEnabled} text-white`
      : "bg-gray-300 hover:bg-gray-400"
  }`;

  const isTimeInvalid = fromTime && toTime && fromTime >= toTime;

  return (
    <div
      className={`w-full sm:w-80 h-auto sm:h-56 border-2 border-dashed border-gray-400 ${currentColor.container} rounded-lg flex flex-col items-center p-2 sm:p-4`}
    >
      <h3 className="text-gray-600 font-medium text-center">WORK HOURS</h3>
      <div className="flex flex-col items-center mt-2 w-full">
        <form className="w-full max-w-[16rem] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="start-time"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              From:
            </label>
            <input
              type="time"
              id="start-time"
              className={inputStyles}
              value={fromTime}
              onChange={(e) => setFromTime(e.target.value)}
              disabled={isChecked}
              aria-disabled={isChecked}
            />
          </div>
          <div>
            <label
              htmlFor="end-time"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              To:
            </label>
            <input
              type="time"
              id="end-time"
              className={inputStyles}
              value={toTime}
              onChange={(e) => setToTime(e.target.value)}
              disabled={isChecked}
              aria-disabled={isChecked}
            />
          </div>
        </form>

        {isTimeInvalid && (
          <p className="text-red-500 text-sm mt-2 text-center">
            Start time must be before end time.
          </p>
        )}

        <button
          onClick={toggleChecked}
          className={buttonStyles}
          aria-label={isChecked ? "Disable 24/7 mode" : "Enable 24/7 mode"}
        >
          {isChecked ? "24/7 Enabled" : "Set Work Hours"}
        </button>
      </div>
    </div>
  );
}
