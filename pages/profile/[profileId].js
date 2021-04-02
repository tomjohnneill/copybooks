import FollowBar from "../../components/FollowBar";

const Profile = () => {
  return (
    <div className="flex">
      <div>
        <img
          src="https://istheshipstillstuck.com/ever-given.jpg"
          className="w-full h-64 object-cover"
        />
      </div>
      <FollowBar />
    </div>
  );
};

export default Profile;
