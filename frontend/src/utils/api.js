const customFetch = (url, headers) => {
    return fetch(url, headers).then((res) => {
        if (res.ok) { return res.json(); }
        else { Promise.reject(res.statusText); }
    })

}
  class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;

    }
    //get array of cards obj from server
    getCard = () => {
        return customFetch(`${this.baseUrl}/cards`, { headers: this.headers })

    };
    //get user info from server
    getUserInfo = () => {
        return customFetch(`${this.baseUrl}/users/me`, { headers: this.headers })
    }

 
    //set user info
    setUserInfoToServer = (inputData) => {
        return customFetch(`${this.baseUrl}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                name: inputData.name,
                about: inputData.about
            })
        })

    }

  

    changeLikeCardStatus = (cardId, isLiked) => {
        return customFetch(`${this.baseUrl}/cards/${cardId}/likes`,
            {
                method:`${isLiked ? "PUT" : "DELETE"}`,
                headers: this.headers,
            }
        )
    }


    // requset to chenge profile pic 
    setUserPicUrl = (data) => {
        console.log(data);
        return customFetch(`${this.baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
    }
    //add card func
    setCardToServr(data) {
        return customFetch(`${this.baseUrl}/cards`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
    }

    deleteCardRequest = (elementId) => {
        return customFetch(`${this.baseUrl}/cards/${elementId}`,
            {
                method: "DELETE",
                headers: this.headers,
            }
        )
    }
updateToken = () => {
    this.headers = {
        authorization:`Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json"
    }
}


    //end of class
}



//Token: 2dbf8d5b-1a4e-4959-a937-202ce5167a76 Group ID: group-12

  const api = new Api({
    // baseUrl: `https://around.nomoreparties.co/v1/group-12`,
    baseUrl: `https://api.aroundus.students.nomoreparties.sbs`,
    // baseUrl: `http://localhost:3000`,
    headers: {
        authorization:`Bearer ${localStorage.getItem("jwt")}`,
        // authorization:`2dbf8d5b-1a4e-4959-a937-202ce5167a76`,
        "Content-Type": "application/json"
    }
});

// Bearer ${localStorage.getItem("jwt")}
export default api