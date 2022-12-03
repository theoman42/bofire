import React from "react";
import { useSelector } from "react-redux";

const InRoom = () => {
  const user = useSelector((state) => state.session.user);

  return (
    <>
      <div></div>
    </>
  );
};

export default InRoom;
