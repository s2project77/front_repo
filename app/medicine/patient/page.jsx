import { cookies } from "next/headers";
import PatientCard from "@/app/components/medicine/patient";
import Navbar from "@/app/components/medicine/navabr";
import Layout from "@/app/components/medcine_layout/layout";
import { Side_bar } from "@/app/components/medicine/mainpage/sidebar";
import Searchbar from "@/app/components/searchbar";
import { headers } from "next/headers";
const PatientCardsGrid = async ({ patients }) => {
  const array=[{hello:""}]
  const cookieStore = cookies();
  const token = cookieStore.get("jwt")?.value; // Adjust key name to your actual cookie name

  const samplePatients = patients || [
    {
      id: 1,
      name: "John Doe",
      username: "john_doe",
      bio: "Patient with chronic asthma. Regular check-ups required every 3 months. Allergic to penicillin.",
      avatar: null
    },
  ];
  const data1= await fetch("http://192.168.124.229:4000/api/users",{
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",}
  );
  {/*const data2=data1.json()
  const data3=data2.data.data; */}
  return (
    <Layout className="bg-gray-50 min-h-screen py-8 px-4">
        <div  className="w-full min-h-full grid grid-cols-1 sm:grid-cols-[1.1fr_4fr]" >
        <Side_bar></Side_bar>
        <div  className=" flex flex-col gap-4 p-10">
               <div className="flex items-center justify-center">
                        <Searchbar data={[]} />
                      </div>
                      <div   className="p-8 " > 
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Patient Directory</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {samplePatients.map(patient => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </div></div></div>
      </div>
    </Layout>
  );
};

export default PatientCardsGrid;