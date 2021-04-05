import Router from "next/router";
import { useRouter } from "next/router";
import { useState } from "react";
import AddSet from "../../components/AddSet";
import Drawer from "../../components/Drawer";
import FollowBar from "../../components/FollowBar";
import SetGrid from "../../components/SetGrid";

const Profile = () => {
  const { query } = useRouter();

  const [addSet, setAddSet] = useState(false);

  return (
    <div className="flex">
      {addSet && (
        <Drawer
          title="Add a new set of books"
          handleClose={() => setAddSet(false)}
        >
          <AddSet
            onFinish={(data) => {
              const { id } = data[0];
              setAddSet(false);
              Router.push(`/set/${id}`);
            }}
          />
        </Drawer>
      )}
      <div>
        {/*  
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
          */}
        <h1 className="my-0 p-4 border-b border-gray-200 text-2xl font-bold w-full flex justify-between">
          Your Recommendations
          <button
            onClick={() => setAddSet(true)}
            className="px-4 py-2 rounded-full bg-purple-700 text-white font-bold text-sm"
          >
            Add Set
          </button>
        </h1>
        <SetGrid userId={query?.profileId} />
      </div>
      {/*
        <div className="hidden md:block">
        <FollowBar />
      </div>
        */}
    </div>
  );
};

export default Profile;
