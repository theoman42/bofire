import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Navigation.css";
import { getUserPartHomes } from "../../../../store/userPartHomes";
import { getOneHomeContent } from "../../../../store/currentMenuContent";
import { getRooms } from "../../../../store/room";

const UserPartHomes = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getUserPartHomes(user.id));
  }, []);

  const loadHome = (homeId) => {
    dispatch(getOneHomeContent(homeId));
    dispatch(getRooms(homeId));
  };

  const userPartHomes = Object.values(
    useSelector((state) => state.userPartHomes)
  );

  return (
    <>
      <div className="navigation-joined-homes">
        {userPartHomes?.map((home) => {
          return (
            <div className="icons" onClick={() => loadHome(home.id)}>
              <img src={home.imgUrl} key={home.id} alt="home" />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UserPartHomes;
