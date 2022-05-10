import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import AddPlacePopup from "./AddPlacePopup.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";

import React from "react";
import ImagePopup from "./ImagePopup.js";
import api  from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function App({email}) {
 
  const [isOpenEdit, setIsOpenEdit] = React.useState(false);
  const [isOpenAvatar, setIsOpenAvatar] = React.useState(false);
  const [isOpenAddcard, setIsOpenAddcard] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  function getCurrentData() {
    api.getUserInfo().then((res) => {
        setCurrentUser(res);
    }).catch(console.log);
  }
  function setCurrentData(info) {
    api
      .setUserInfoToServer(info)
      .then((res) => {
        closeAllPopups()
        setCurrentUser(res);
      }).catch(console.log)
  }
  function handleUpdateAvatar(info) {
    api
      .setUserPicUrl(info)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()
      }).catch(console.log)
  }
  function handleCardDelete(card) {
    api.deleteCardRequest(card).then(() => {
      setCards(cards.filter((c) => c._id !== card));
    }).catch(console.log);
  }
  
  const handleAddPlaceSubmit = (data) => {
    api
      .setCardToServr(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups()
      }).catch(console.log);
  };

  function handleEditAvatarClick() {
    setIsOpenAvatar(true);
  }

  function handleEditProfileClick() {
    setIsOpenEdit(true);
  }

  function handleAddPlaceClick() {
    setIsOpenAddcard(true);
  }

  function closeAllPopups() {
    setIsOpenAddcard(false);
    setIsOpenEdit(false);
    setIsOpenAvatar(false);
    setIsImagePopupOpen(false);
  }

  const handleCardClick = (cardClicked) => {
    setSelectedCard(cardClicked);
    setIsImagePopupOpen(true);
  };
  React.useEffect(() => {
    getCards();
    getCurrentData();
    
  }, []);
  
  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', closeByEscape)   
    return () => document.removeEventListener('keydown', closeByEscape)
}, [])


  function getCards() {
    api.getCard().then((res) => setCards(res)).catch(console.log);
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Send a request to the API and getting the updated card data
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    }).catch(console.log);;
  }

  return (

   
    <div className="App">
     

    <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header  email={email} />
          <Main
            cards={cards}
            onEditClick={handleEditProfileClick}
            onEditAvatarClick={handleEditAvatarClick}
            onAddClick={handleAddPlaceClick}
            onCardClick={handleCardClick}
            handleCardDelete={handleCardDelete}
            handleCardLike={handleCardLike}
          />
          <Footer />

          
            <AddPlacePopup
              isOpen={isOpenAddcard}
              onClose={closeAllPopups}
              onUpdateNewCard={handleAddPlaceSubmit}
            />

            <EditAvatarPopup
              isOpen={isOpenAvatar}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />

            <EditProfilePopup
              isOpen={isOpenEdit}
              onClose={closeAllPopups}
              onUpdateUser={setCurrentData}
            />
            <ImagePopup
              isOpen={isImagePopupOpen}
              onClose={closeAllPopups}
              target={selectedCard}
            />
          
        </CurrentUserContext.Provider></div> 
     


    </div>
  );
}

export default App;
