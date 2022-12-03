import React from "react";
import { useSelector } from "react-redux";
import InRoom from "./InRoom";

const SingleHome = () => {
  const user = useSelector((state) => state.session.user);

  return <>{user.currentRoomId ? <InRoom /> : <div>Out of Room</div>}</>;
};

export default SingleHome;
