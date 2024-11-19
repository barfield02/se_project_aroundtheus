export default class Api {
  constructor(options) {
    // constructor body
  }

  // GET /users/me
  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "4e1d8109-9ece-45e8-8ccd-12c7e4a219df",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // GET /cards
  getUserInfo(Url) {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      headers: {
        authorization: "4e1d8109-9ece-45e8-8ccd-12c7e4a219df",
      },
      // body: JSON.stringify({
      //   name: "name",
      //   link: "Url",
      // }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }
  editProfileInfo({ title, description }) {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: {
        authorization: "4e1d8109-9ece-45e8-8ccd-12c7e4a219df",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: title,
        about: description,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }
  addNewCard({ name, link }) {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "POST",
      headers: {
        authorization: "4e1d8109-9ece-45e8-8ccd-12c7e4a219df",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }
  deleteCard(id) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: "4e1d8109-9ece-45e8-8ccd-12c7e4a219df",
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }
  updateProfilePicture(avatar) {
    return fetch(
      "https://around-api.en.tripleten-services.com/v1/users/me/avatar",
      {
        method: "PATCH",
        headers: {
          authorization: "4e1d8109-9ece-45e8-8ccd-12c7e4a219df",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar,
        }),
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }
  updateLikes(isLiked, id) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${id}/likes`,
      {
        method: isLiked ? "DELETE" : "PUT",
        headers: {
          authorization: "4e1d8109-9ece-45e8-8ccd-12c7e4a219df",
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }
}
