import React from "react";
import PopupWithForm from "./PopupWithForm.js";
// import { CurrentUserContext } from "../contexts/CurrentUserContext";
function EditAvatarPopup(props) {
  const picRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: picRef.current.value,
    });
  }
  React.useEffect(() => {
    picRef.current.value = "";
}, [props.isOpen]);
  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name={"popup_edit-profile-pic"}
      isOpen={props.isOpen}
      title={"Change profile picture"}
      btnTitle={"Save"}
      onClose={props.onClose}
      className={"popup__continer-edit-profile-pic"}
    >
      <input
        ref={picRef}
        id="form__input-edit-profile-pic"
        className="popup__input popup__input_pic-link"
        placeholder="Image link"
        name="link"
        type="url"
        required
      />
      <span
        id="form__input-edit-profile-pic-error"
        className="popup__input-error"
      ></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
