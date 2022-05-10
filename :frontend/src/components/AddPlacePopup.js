import React from "react";
import PopupWithForm from "./PopupWithForm.js";
function AddPlacePopup(props) {
  const inputNameRef = React.useRef();
  const inputLinkRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateNewCard({
      name: inputNameRef.current.value,
      link: inputLinkRef.current.value,
    });
  }
  React.useEffect(() => {
    inputNameRef.current.value = "";
    inputLinkRef.current.value = "";
}, [props.isOpen]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name={"popup_add_card"}
      isOpen={props.isOpen}
      title={"Add new place"}
      btnTitle={"Create"}
      onClose={props.onClose}
    >
      <input
        ref={inputNameRef}
        id="input_card-title"
        className="popup__input popup__input_card_title"
        type="text"
        required
        placeholder="Title"
        name="name"
        minLength="1"
        maxLength="30"
      />
      <span id="input_card-title-error" className="popup__input-error"></span>
      <input
        ref={inputLinkRef}
        id="form__input_card-image"
        className="popup__input popup__input_card_image"
        placeholder="Image link"
        name="link"
        type="url"
        required
      />
      <span
        id="form__input_card-image-error"
        className="popup__input-error"
      ></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
