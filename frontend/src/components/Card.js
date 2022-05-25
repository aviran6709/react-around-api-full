import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";
const Card = (props) => {
  const currentUser = React.useContext(CurrentUserContext);
// console.log(props.cardData.likes)

  const isOwn = props.cardData.owner === currentUser._id;
  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn ? "card__delete-button_visible" : "card__delete-button_hidden"
  }`;
  
    const isLiked= props.cardData.likes && props.cardData.likes.some((c)=>c._id === currentUser._id);
   


  return (
    
    <div className="card">
      {isOwn ?(<button
        type="button"
        onClick={() => {
          props.onDeleteCard(props.cardData._id);
        }}
        className={cardDeleteButtonClassName}
      ></button>): ""}
     
      <img
        className="card__image"
        src={props.cardData.link}
        alt={props.cardData.name}
        onClick={() => props.onCardClick(props.cardData)}
      />
      <div className="card__content">
        <h2 className="card__title">{props.cardData.name}</h2>
        <div className="card__like_column">
          <button
            type="button"
            onClick={() => {
              props.onCardLike(props.cardData)
              
            }
            }
            className={`card__like-button ${isLiked ? "card__like-button_dark":""}`}
            ></button>
            
          <span className="card__likes">
            { props.cardData.likes && props.cardData.likes.length > 0 ? props.cardData.likes.length : ""}
          </span>
        </div>
      </div>
    </div>
  );
};
export default Card;
