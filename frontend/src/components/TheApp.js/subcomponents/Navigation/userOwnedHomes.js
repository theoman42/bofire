import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Navigation.css";
import { getUserOwnedHomes } from "../../../../store/userOwnedHomes";
import { getOneHomeContent } from "../../../../store/currentMenuContent";
import { getRooms } from "../../../../store/room";
import AddHomeModal from "../AddHomeModal";

const UserOwnedHomes = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const userOwnedHomes = Object.values(
    useSelector((state) => state.userOwnedHomes)
  );
  const menu = useSelector((state) => state.currentMenuContent);

  const loadHome = (homeId) => {
    dispatch(getOneHomeContent(homeId));
    dispatch(getRooms(homeId));
  };

  useEffect(() => {
    dispatch(getUserOwnedHomes(user.id));
  }, []);

  return (
    <>
      <div className="navigation-owned-homes">
        <AddHomeModal />
        {userOwnedHomes?.map((home) => {
          return (
            <div
              key={home.id}
              className={`icons${
                menu.type === "singleHome" && menu.home.id === home.id
                  ? "-active"
                  : ""
              } clicky`}
              onClick={() => loadHome(home.id)}
            >
              <img src={home.imgUrl} key={home.id} alt="home" />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UserOwnedHomes;
