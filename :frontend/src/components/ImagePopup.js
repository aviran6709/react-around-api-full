const ImagePopup = (props) => {
  return (
    <div className={`popup_img popup ${props.isOpen && "popup_opened"}`}>
      <div className="popup__img-continer">
        <button
          type="button"
          onClick={props.onClose}
          className="popup__close-btn popup__close-btn_img"
        />
        <img
          className="popup__img-big"
          src={props.target.link}
          alt={props.target.name}
        />
        <p className="popup__img-pargraph">{props.target.name}</p>
      </div>
    </div>
  );
};

export default ImagePopup;
