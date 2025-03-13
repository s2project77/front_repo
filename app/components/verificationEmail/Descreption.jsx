import Image from "next/image";
export default function Descreption() { 
    return(<div
              id="descreption"
              className="sm:w-1/3 lg:w-1/3 md:w-1/3 text-xl leading-loose text-gray-600      " 
            >
              <h2 className="text-3xl font-bold text-green-600 mb-4">Setupping</h2>
              <p>
                To serve you better we ask that you provide original identifying
                documents. This will secure your account in cases of account
                recovery. It also helps to ensure that the important data and
                notifications you receive are sent to the correct location.
              </p>
              <p>
                An acceptable proof of identification includes a photo of your Govt,
                approved ID card, pharm agreement, Phone number and real picture of
                your pharmacy.We will reach out to you via email once this process
                has been completed.
              </p>
              <div className="px-4 mt-4 w-auto flex items-center  bg-green-300 rounded-md ">
                <Image src="/Lock.svg" alt="lock" width={24} height={24} />
                <p className="text-green-600 px-2">
                  All data is safely stored and encrypted
                </p>
              </div>
            </div>)
}
