import { useRouter } from "next/router";
import FollowBar from "../../components/FollowBar";
import SetGrid from "../../components/SetGrid";

const Profile = () => {
  const { query } = useRouter();

  console.log({ query });

  return (
    <div className="flex">
      <div>
        <img
          src="https://istheshipstillstuck.com/ever-given.jpg"
          className="w-full h-64 object-cover"
        />
        <div className="-my-16 mb-0 ml-4 rounded-full">
          <img
            src="https://pbs.twimg.com/profile_images/1101504816776470528/TXkjNsWH_bigger.png"
            className="h-32 rounded-full w-32 object-cover"
          />
          <h2>Tom Neill</h2>
          <p>@tomjneill</p>
        </div>
        <SetGrid userId={query?.profileId} />
      </div>
      <FollowBar />
    </div>
  );
};

export default Profile;
