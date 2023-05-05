import React, { useState } from "react";
import "./modal.css";
import { RiCloseLine } from "react-icons/ri";
import { logout } from "../../store/user/user.slice";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { currentUserSelector } from "../../store/user/user.selector";
import { FaRegUserCircle } from "react-icons/fa";

const Modal = ({ setIsOpen }) => {
  const user = useSelector(currentUserSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await signOutUser();
      dispatch(logout());
      navigate("/login", { replace: true });
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)}>
        <div className="centered">
          <div className="modal">
            <div className="modalHeader">
              <h5 className="heading">User Settings</h5>
            </div>
            <button className="closeBtn" onClick={() => setIsOpen(false)}>
              <RiCloseLine style={{ marginBottom: "-3px" }} />
            </button>
            <div className="modalContent">
              <div className={`${user?.photoURL && "profile-container"}`}>
                {user?.photoURL ? (
                  <img src={user?.photoURL} alt="profile-picture" />
                ) : (
                  <FaRegUserCircle style={{ marginInline: "auto" }} size={32} />
                )}
              </div>
              <div>
                <span>Name :</span>
                <span>{user?.displayName}</span>
              </div>
              <div>
                <span>Email :</span>
                <span>{user?.email}</span>
              </div>
            </div>
            <div className="modalActions">
              <div className="actionsContainer">
                <button
                  disabled={isLoading}
                  className="logoutBtn"
                  onClick={() => handleLogout()}
                >
                  {isLoading ? (
                    <ColorRing
                      visible={true}
                      height="25"
                      width="25"
                      ariaLabel="blocks-loading"
                      wrapperClass="blocks-wrapper"
                      colors={[
                        "#ff3e4e",
                        "#f47e60",
                        "#f8b26a",
                        "#abbd81",
                        "#849b87",
                      ]}
                    />
                  ) : (
                    "Logout"
                  )}
                </button>
                <button className="deleteBtn" onClick={() => setIsOpen(false)}>
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;