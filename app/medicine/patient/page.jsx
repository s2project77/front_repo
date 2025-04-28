
// PatientCardsGrid.jsx
import PatientCard from "@/app/components/medicine/patient";
import Navbar from "@/app/components/medicine/navabr";
import Layout from "@/app/components/medcine_layout/layout";
import { Side_bar } from "@/app/components/medicine/mainpage/sidebar";
import Searchbar from "@/app/components/searchbar";
const PatientCardsGrid = ({ patients }) => {
  const array=[{hello:""}]
  const samplePatients = patients || [
    {
      id: 1,
      name: "John Doe",
      username: "john_doe",
      bio: "Patient with chronic asthma. Regular check-ups required every 3 months. Allergic to penicillin.",
      avatar: null
    },
  ];
  const data=fetch("http://192.168.15.102:4000/api/users")
 
  return (
    <Layout className="bg-gray-50 min-h-screen py-8 px-4">
        <div  className="w-full min-h-full grid grid-cols-1 sm:grid-cols-[1.1fr_4fr]" >
        <Side_bar></Side_bar>
        <div  className=" flex flex-col gap-4 p-10">
               <div className="flex items-center justify-center">
                        <Searchbar   />
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