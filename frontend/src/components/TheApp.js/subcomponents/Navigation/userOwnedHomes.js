import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Navigation.css";
import { getUserOwnedHomes } from "../../../../store/userOwnedHomes";
import { getOneHomeContent } from "../../../../store/currentMenuContent";
import AddHomeModal from "../AddHomeModal";

const UserOwnedHomes = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  useEffect(() => {
    dispatch(getUserOwnedHomes(user.id));
  }, []);

  const userOwnedHomes = Object.values(
    useSelector((state) => state.userOwnedHomes)
  );
  return (
    <>
      <div className="navigation-owned-homes">
        <div className="icons">
          <AddHomeModal />
        </div>
        {userOwnedHomes?.map((home) => {
          return (
            <div
              className="icons"
              onClick={() => dispatch(getOneHomeContent(home.id))}
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
