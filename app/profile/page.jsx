import Layout from "../components/mainpage_layout/layout";
import { Side_bar } from "../components/mainpage/side_bar";
import Profile from "../components/profile/Profile";

const ProfilePage = () => {
  return (
    <Layout>
      <div className="sm:grid-cols-[1.1fr_4fr] grid-cols-1 grid">
        <Side_bar />
        <Profile />
      </div>
    </Layout>
  );
};

export default ProfilePage;
