import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";
import Card from "./Card.js";

export default function Main({
  onEditAvatarClick,
  onEditClick,
  onAddClick,
  onCardClick,
  cards,
  handleCardLike,
  handleCardDelete
}) {
  const { name, about, avatar }  = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container-pic">
          <img className="profile__pic" src={avatar} alt="profile-pic" />

          <div className="profile__overlay">
            <button
              type="button"
              className=" profile__edit-avatar-btn"
              onClick={() => onEditAvatarClick(true)}
            ></button>
          </div>
        </div>
        <div className="profile__container">
          <div className="profile__content">
            <h1 className="profile__title">{name}</h1>

            <button
              type="button"
              className="profile__edit-btn"
              onClick={() => onEditClick(true)}
            ></button>

            <p className="profile__hobby">{about}</p>
          </div>
          <button
            type="button"
            className="profile__add-btn"
            onClick={() => onAddClick(true)}
          ></button>
        </div>
      </section>

      <section className="cards">
        {cards.map((card) => {
          return (
            <Card
              cardData={card}
              onCardClick={onCardClick}
              key={card._id}
              onCardLike={handleCardLike}
              onDeleteCard={handleCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}
