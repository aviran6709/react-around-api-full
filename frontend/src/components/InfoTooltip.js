import React from "react";
import vtag from "../images/vtag.svg";
import xtag from "../images/xtag.svg";

const InfoTooltip = (props) => {
    return (
        <div className={`popup ${props.isOpen && "popup_opened"}`}>

            <div className="popup__continer_ads">
                <button
                    onClick={props.closePopup}
                    type="button"
                    className="popup__close-btn "
                >
                </button>
                <img className="imgtag" src={props.resStatus ? vtag : xtag} alt=" presses TAG" />

                <p className="tool-tip_title" >{props.resStatus ? `Success! You have now been registered.` : `Oops, something went wrong! Please try again.`}</p>

            </div>
        </div>
    )

}
export default InfoTooltip
/* popup_opened `Success! You have now been registered.` */