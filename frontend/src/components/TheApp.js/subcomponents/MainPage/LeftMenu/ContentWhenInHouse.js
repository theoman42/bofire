import React, { useEffect, useState } from "react";
import { RiSettings2Line } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import RoomSettingsModal from "./RoomSettingsModal";
import AddRoomModal from "./AddRoomModal";
import { enterRoom, leaveRoom } from "../../../../../store/session";

const ContentWhenInHouse = () => {
  const rooms = Object.values(useSelector((state) => state.rooms));
  const user = useSelector((state) => state.session.user);
  const menuContent = useSelector((state) => state.currentMenuContent);
  const dispatch = useDispatch();

  const [isOwned, setIsOwned] = useState(false);

  const roomGateway = (isActive, homeId, roomId) => {
    if (isActive) dispatch(leaveRoom(user.id));
    else dispatch(enterRoom(user.id, homeId, roomId));
  };

  useEffect(() => {
    if (menuContent.home) {
      setIsOwned(menuContent.home.ownerId == user.id);
    }
  }, [user, menuContent]);
  return (
    <>
      <div className="rooms-heading-and-settings-row">
        <div>ROOMS</div>
        <AddRoomModal />
      </div>
      <div className="all-rooms-container">
        {rooms.map((room) => {
          let isActive = room.id === user.currentRoomId;
          return (
            <div
              className={`single-room-container${isActive ? "-active" : ""}`}
              onClick={() => roomGateway(isActive, room.homeId, room.id)}
            >
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
