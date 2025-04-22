import Image from "next/image";

export default function Description({ color = "green" }) {
  const colorClass = color === "blue" ? "text-blue-600" : "text-green-600";
  const bgColorClass = color === "blue" ? "bg-blue-300" : "bg-green-300";
  const textColorClass = color === "blue" ? "text-blue-600" : "text-green-600";

  return (
    <div
      id="description"
      className="sm:w-1/3 lg:w-1/3 md:w-1/3 text-xl leading-loose text-gray-600"
    >
      <h2 className={`text-3xl font-bold ${colorClass} mb-4`}>Setupping</h2>
      <p>
        To serve you better we ask that you provide original identifying
        documents. This will secure your account in cases of account
        recovery. It also helps to ensure that the important data and
        notifications you receive are sent to the correct location.
      </p>
      <p>
        An acceptable proof of identification includes a photo of your Govt,
        approved ID card, pharm agreement, Phone number and real picture of
        your pharmacy. We will reach out to you via email once this process
        has been completed.
      </p>
      <div className={`px-4 mt-4 w-auto flex items-center ${bgColorClass} rounded-md`}>
        <Image src="/Lock.svg" alt="lock" width={24} height={24} />
        <p className={`px-2 ${textColorClass}`}>
          All data is safely stored and encrypted
        </p>
      </div>
    </div>
  );
}
