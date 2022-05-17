import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  function handleChange(e) {
    e.target.name === "about"
      ? setDescription(e.target.value)
      : setName(e.target.value);
  }
 
  function handleSubmit(e) {

    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);
  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name={"popup_profile"}
      isOpen={props.isOpen}
      title={"Edit profile"}
      btnTitle={"Save"}
      onClose={props.onClose}
    >
      <input
         value={name || ''}
        onChange={handleChange}
        id="popup__input_user-name"
        className="popup__input popup__input_user_name"
        type="text"
        placeholder="Name"
        name="name"
        required
        minLength="2"
        maxLength="40"
      />
      <span
        id="popup__input_user-name-error"
        className="popup__input-error"
      ></span>
      <input
       value={description || ''}
        onChange={handleChange}
        id="form__input_user-hobby"
        className="popup__input popup__input_user_hobby"
        type="text"
        placeholder="About me"
        name="about"
        required
        minLength="2"
        maxLength="200"
      />
      <span
        id="form__input_user-hobby-error"
        className="popup__input-error"
      ></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
