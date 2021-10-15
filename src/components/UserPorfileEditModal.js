import React, { useRef } from "react";
import styled from "styled-components";

export const UserProfileEditModal = ({
  showEditProfileModal,
  setShowEditProfileModal,
}) => {
  const modalRef = useRef();
  const closeEditProfileModal = (e) => {
    if (modalRef.current === e.target) {
      setShowEditProfileModal(false);
    }
  };
  // function TextInput(e, setState) {
  //   setState(e.target.value);
  // }

  return (
    <>
      <div>
        {showEditProfileModal ? (
          <Wrap ref={modalRef} onClick={closeEditProfileModal}>
            <div showEditProfileModal={showEditProfileModal}>
              <p>User ID</p>
              <input />
              <input />
            </div>
          </Wrap>
        ) : null}
      </div>
    </>
  );
};

const Wrap = styled.div`
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
