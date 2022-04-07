import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div>
      <div class="container flex justify-center py-10 mx-auto">
        <div class="p-3 rounded-lg bg-white shadow-lg">
          <div class="flex justify-between w-full">
            {" "}
            <img
              src="https://i.imgur.com/CeVfZyY.jpg"
              width="150"
              class="rounded-lg"
            />
            <div class="ml-2">
              <div class="p-3">
                <h3 class="text-2xl">{currentUser.username}</h3>{" "}
                <span>{currentUser.email}</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-gray-200 rounded-lg">
                <div class="mr-3">
                  {" "}
                  <span class="text-gray-400 block">Id</span>{" "}
                  <span class="font-bold text-black text-xl">
                    {currentUser.id}
                  </span>{" "}
                </div>
                <div class="mr-3">
                  {" "}
                  <span class="text-gray-400 block">Roles</span>{" "}
                  <span class="font-bold text-black text-xl">
                    {currentUser.roles &&
                      currentUser.roles.map((role, index) => (
                        <li className="list-none" key={index}>
                          {role}
                        </li>
                      ))}
                  </span>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul> */}
    </div>
  );
};

export default Profile;
