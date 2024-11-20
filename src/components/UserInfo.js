export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._profileAvatar = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
    };
  }

  setUserInfo(title, description) {
    this._nameElement.textContent = title;
    this._descriptionElement.textContent = description;
  }

  setAvatarImage({ avatar }) {
    this._profileAvatar.src = avatar;
  }
}
