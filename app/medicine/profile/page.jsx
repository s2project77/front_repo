import Layout from "@/app/components/medcine_layout/layout";
import { Side_bar } from "../../components/mainpage/side_bar";
import Profile from "../../components/profile/Profile";

const ProfilePage = () => {
  return (
    <Layout>
      <div className="sm:grid-cols-[1.1fr_4fr] grid-cols-1 grid">
        <Side_bar color={'blue'} />
        <Profile color={'blue'} />
      </div>
    </Layout>
  );
};

export default ProfilePage;
