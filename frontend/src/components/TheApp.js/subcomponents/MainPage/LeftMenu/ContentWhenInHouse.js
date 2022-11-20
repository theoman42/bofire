import React, { useEffect, useState } from "react";
import { RiSettings2Line } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import Content from "../Content";
import RoomSettingsModal from "./RoomSettingsModal";

const ContentWhenInHouse = (isOwned, type) => {
  const user = useSelector((state) => state.session.user);
  const content = useSelector((state) => state.currentMenuContent);
  const rooms = Object.values(useSelector((state) => state.rooms));

  return (
    <>
      <div className="rooms-heading-and-settings-row">
        <div>Rooms:</div>
        <div>settings</div>
      </div>
      <div>
        {rooms.map((room) => {
          return (
            <div className="room-container">
              <div>{room.roomName}</div>
              {isOwned && <RoomSettingsModal roomId={room.id} />}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ContentWhenInHouse;
