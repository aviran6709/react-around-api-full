import React from "react";
function PopupWithForm(props) {
  return (
    <div
      className={`${props.isBlack?"":`popup ${props.name} ${props.isOpen && "popup_opened"}`}`}
      onClick={props.onClose}
    >
      <div
        className={`${props.isBlack?"":`popup__continer ${props.className ? props.className : ""}`}`}
        onClick={(evt) => {
          evt.stopPropagation();
        }}
      >
        <button
          onClick={props.onClose}
          type="button"
          className="popup__close-btn "
        ></button>
        <h2 className={`${props.isBlack ? "popup__title_them_black" : "popup__title" }`}> {props.title}</h2>
        <form onSubmit={props.onSubmit}
          action="#"
          method="POST"
          name={props.name}
          className={`popup__content popup__form `}
        >
          {props.children}
          <button className={`popup__button ${props.isBlack ? "popup__button_them_black" : "popup__submit-btn"}`} type="submit">
            {props.btnTitle}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
