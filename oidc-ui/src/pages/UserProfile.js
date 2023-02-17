import React from "react";
import Background from "../components/Background";
import UserProfile from "../components/UserProfile";
import oidcService from "../services/oidcService";
import ProfileUI from "../components/ProfileUI";


export default function UserProfilePage({ langOptions }) {
  return (
    <ProfileUI
      component={React.createElement(UserProfile, {
        oidcService: oidcService,
      })}
      langOptions={langOptions}
    />
  );
}
