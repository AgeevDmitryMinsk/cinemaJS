console.log(`JS подключен`);

const API_KEY = "261986cbb51c934516a9889245136067";
const defaultPath = "https://api.themoviedb.org/3/movie";
const language = "ru";
const imageURL = "https://image.tmdb.org/t/p/w500";
const API_URL = `${defaultPath}/popular?api_key=${API_KEY}&language=${language}&region=${language}`;
// https://api.themoviedb.org/3/movie/popular?api_key=261986cbb51c934516a9889245136067&language=ru&region=ru - обект с данными
// https://api.themoviedb.org/3/movie/popular?api_key=261986cbb51c934516a9889245136067&language=ru&page=1&region=ru

const main = document.getElementById('main')

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
            //data.results.slice(0, 4)
            //console.log(data.results.slice(0, 4));
            console.log(data.results);
            //console.log(data);
            // return `${imagePath}` + response.results.backdrop_path;
            showMovies(data.results.slice(0, 4))
            //choseMovies(data.results.slice(0,4))
        });
}

getMovies(API_URL)

function showMovies(data) {
    main.innerHTML='';

    data.forEach(movie => {
        const {title, poster_path} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${imageURL+poster_path}" alt="${title}" class="js-poster"> 
            <div class="movie-info">
                <h2>${title}</h2>
            </div>`
        main.appendChild(movieEl)
    })
}

// function choseMovies (data) {
//     movie.innerHTML = `
//     <div class="movie-container">
//     <!-- <label>Pick a movie</label> -->
//     <select id="movie">
//         <option selected value="0" disabled>Выбрать фильм:</option>
//         <option value="10">Главный герой(2021), цена 1 билета 10 BYN</option>
//         <option value="8">Бросок кобры. Снейк Айз (2021), цена 1 билета - 8 BYN</option>
//         <option value="7">Звёздный рубеж (2021), цена 1 билета - 7 BYN</option>
//         <option value="5">Последний богатырь: Корень зла (2021), цена 1 билета - 5 BYN</option>
//     </select>
// </div>`;
//
//     data.forEach(movie => {
//         const {title, popularity} = movie;
//         const movieEl = document.createElement('option');
//         movieEl.innerHTML = `
//         <option value="${popularity}">${title}, цена 1 билета ${popularity} BYN</option>`
//         main.appendChild(movieEl)
//     })
//
// }


const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.blocked)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const totalText = document.querySelector(".text");

const movieSelect = document.getElementById("movie");
let ticketPrice = Number(movieSelect.value);

selectPlace();

// функция хранения выбранного фильма movie index, price and name
function setMovieData(movieIndex, moviePrice, movieName) {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
    localStorage.setItem("selectedMovieName", movieName);
    movieName = movieSelect[movieIndex].firstChild.data;
    console.log(movieIndex);
    console.log(moviePrice);
    console.log(movieName);
}

// console.log(localStorage.getItem("selectedMovieIndex"));
// console.log(localStorage.getItem("selectedMovieName"));

// функция подсчета выбранных мест в зале
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    // возвращаю NodeList в массив
    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
    // преобразую массив в строку JSON для получения его длины методом selectedSeats.length
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
    // console.log(
    //     seatsIndex,
    //     JSON.stringify(seatsIndex),
    //     selectedSeats,
    //     selectedSeats.length
    // );

    // в случае если пользователь еще не выбрал фильм, то в итоговом протоколе он не видит общую сумму, количество занятых мест
    const selectedSeatsCount = selectedSeats.length;
    if (
        selectedSeatsCount == 0 ||
        movieSelect.selectedIndex == 0 ||
        ticketPrice == 0
    ) {
        totalText.style.display = `none`;
    } else {
        totalText.style.display = "flex";
    }

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// функция получения данных из локального хранилища и заполнение пользовательского интерфейса
function selectPlace() {
    //преобразуем строку JSON в объект
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// вешаем слушатель для выбора фильма:
movieSelect.addEventListener("click", (e) => {
    ticketPrice = Number(e.target.value);
    movie_selected.innerText =
        movieSelect[e.target.selectedIndex].firstChild.data;
    setMovieData(
        e.target.selectedIndex,
        e.target.value,
        movie_selected.innerText
    );
    updateSelectedCount();
});

// вешаем слушатель для выбора свободных мест:
container.addEventListener("click", (e) => {
    if (
        e.target.classList.contains("seat") &&
        !e.target.classList.contains("blocked")
    ) {
        e.target.classList.toggle("selected");
        console.log(movieSelect.selectedIndex);
        updateSelectedCount();
    }
});

// запускаем фуекцию для подсчета выбранных мест в зале
updateSelectedCount();


function createCard(name, link) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardPic = cardElement.querySelector('.js-poster1');
    cardPic.src = link;
    // cardPic.alt = name;
    cardElement.querySelector('.card__descr').textContent = name;

    // cardPic.addEventListener('click', () => {
    //   showImagePopup(name, link);
    // });
    return cardElement;
}

//
// arrImgFilms.forEach((item) => {
//     cardsSection.append(createCard(item.name, item.link));
// });


//2 initialCards.forEach((item) => {
//     cardsSection.append(createCard(item.name, item.link));
// });
//
// console.log(arrImgFilms, JSON.stringify(arrImgFilms))
//2 console.log(initialCards, JSON.stringify(initialCards))


// for (item in arrImgFilms){
//     console.log(item)
// }


// **************
//
// class Api {
//     constructor(options) {
//         this._url     = options.url;
//         this._headers = options.headers
//     }
//
//     _getResponseData(result) {
//         if (!result.ok) {
//             return Promise.reject(`Ошибка: ${result.status}`);
//         }
//         return result.json();
//     }
//
//     getInitialCards() {
//         return fetch(`${this._url}cards`, {
//             headers: this._headers,
//         })
//             .then(result => this._getResponseData(result)
//             );
//     }
//
//
//     getDataForPageRender() {
//         return Promise.all([this.getInitialCards() ])
//     }
//
//     getCardInfo(id) {
//         return fetch(`${this._url}cards/likes/${id}`, {
//             method: "GET",
//             headers: this._headers,
//         })
//             .then(result => this._getResponseData(result)
//             );
//     }
// }
//
//
// //******
//
// class UserInfo {
//     constructor(userNameSelector, bioSelector, avatarSelector) {
//         this._username = document.querySelector(userNameSelector);
//         this._bio      = document.querySelector(bioSelector);
//         this._avatar   = document.querySelector(avatarSelector);
//     }
//
//     //Публичный метод, который возвращает объект с данными пользователя, для попапа редактирования профиля при открытии
//     getUserInfo () {
//         this._userInfo          = {};
//         this._userInfo.username = this._username.textContent;
//         this._userInfo.bio      = this._bio.textContent;
//         return this._userInfo;
//     }
//     //Публичный метод, который принимает новые данные пользователя и отправляет на страницу
//     setUserInfo (data) {
//         this._username.textContent = data.name;
//         this._bio.textContent      = data.about;
//         this._avatar.src           = data.avatar;
//     }
//
// }
//
// //******
//
// //Создаю экземпляр класса с объектом информации о пользователе
// const userinfo = new UserInfo(
//     '.profile__username',
//     '.profile__bio',
//     '.profile__avatar-image'
// );
//
//
// //****
//
// //Создаю экземляр класса Api
// const api = new Api({
//     url: 'https://mesto.nomoreparties.co/v1/cohort-24/', // Идентификатор группы: cohort-24 by Nasy126@mail.ru Анастасия Житкова
//     headers: {
//         authorization: 'f00e309e-31f2-4bad-9fcd-5ea849544e69', // Токен by Nasy126@mail.ru Анастасия Житкова
//         'Content-type': 'application/json',
//     }
// })
//
// let userID
//
// api.getDataForPageRender()
//     .then((argums) => {
//         const [initialCardsData, userData] = argums;
//         userinfo.setUserInfo(userData);
//         userID = userData._id;
//         renderGallery.renderItems(initialCardsData);
//         console.log(userData)
//     })
//     .catch((error) => {
//         console.log(error);
//     })
//
// //*****
// class Card {
//
// //Конструктор с данными карточки и селектором template-а
//     constructor(item, handleCardClick, handleLikeClick, handleDislikeClick, handleDeleteClick, cardSelector, userID) {
//         this._name               = item.name;
//         this._image              = item.link;
//         this._imageAlt           = item.name;
//         this._id                 = item._id;
//         this._ownerID            = item.owner._id;
//         this._likes              = item.likes;
//         this._cardSelector       = cardSelector;
//         this._handleCardClick    = handleCardClick;
//         this._handleLikeClick    = handleLikeClick;
//         this._handleDislikeClick = handleDislikeClick;
//         this._handleDeleteClick  = handleDeleteClick;
//         this._userID             = userID;
//     }
//
// //Приватный метод создания карточки
//     _getTemplate() {
//         const cardElement = document
//             .querySelector(this._cardSelector)
//             .content
//             .querySelector('.element')
//             .cloneNode(true);
//
//         return cardElement;
//
//     }
//
// //Метод для слушателя клика по кнопке лайка (лайк)
//     _likeButtonClicked() {
//         this._element
//             .querySelector('.element__like-button')
//             .classList
//             .toggle('element__like-button_active');
//     }
//
// //Публичный метод для удаления карточки из разметки
//     deleteButtonClicked () {
//         this._element.remove();
//         this._element = null;
//     }
//
// //Приватный метод для слушателей событий
//     _setEventListeners() {
//
//         this._element.querySelector('.element__like-button').addEventListener('click', () => {
//             this._renderLikeElement();
//         });
//
//         this._element.querySelector('.element__delete-button').addEventListener('click', () => {
//             this._handleDeleteClick();
//         });
//
//         this._element.querySelector('.element__photo').addEventListener('click', () => {
//             this._handleCardClick();
//         });
//     }
//
// //Метод для определения, является ли владельцем фотографии текущий пользователь
//     _isOwner() {
//         return this._ownerID === this._userID;
//     }
//
// //Публичный метод, который возвращает полностью работоспособный
// //наполненный данными элемент карточки
//
//     generateCard() {
//         this._element = this._getTemplate();
//         this._setEventListeners();
//
//         this._element.querySelector('.element__title').textContent = this._name;
//         this._element.querySelector('.element__photo').src = this._image;
//         this._element.querySelector('.element__photo').alt = this._imageAlt;
//
//         if (!this._isLiked()) {
//             this._element
//                 .querySelector('.element__like-button')
//                 .classList
//                 .remove('element__like-button_active');
//
//         } else if (this._isLiked()) {
//             this._element
//                 .querySelector('.element__like-button')
//                 .classList
//                 .add('element__like-button_active');
//         }
//
//         if(!this._isOwner()) {
//             this._element
//                 .querySelector('.element__delete-button')
//                 .remove();
//         }
//
//         this._element.querySelector('.element__like-number').textContent = this._likes.length;
//         return this._element;
//     }
//
//     //Метод для определения, поставил ли лайк текущий пользовател
//     _isLiked () {
//         return this._likes.some((data) => {
//             return data._id === this._userID
//         })
//     }
//
//     //Метод для простановки лайка карточкам текущего пользователя
//     _renderLikeElement () {
//         if (this._isLiked () === false) {
//             this._handleLikeClick()
//         } else if (this._isLiked () === true) {
//             this._handleDislikeClick()
//         }
//     }
//
//     _updateLikesView () {
//         this._element.querySelector('.element__like-number').textContent = this._likes.length;
//         this._likeButtonClicked();
//     }
//
//     setLikesInfo(data) {
//         this._likes = data;
//         this._updateLikesView();
//     }
//
// }

//*******************

// const initialCards =     [
//     {
//         name: 'Главный герой',
//         link: 'https://image.tmdb.org/t/p/w500/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg'
//     }
//     ,
//     {
//         name: 'Бросок кобры. Снейк Айз',
//         link: 'https://image.tmdb.org/t/p/w500/aO9Nnv9GdwiPdkNO79TISlQ5bbG.jpg'
//     }]
// ,
//     {
//         name: 'Звёздный рубеж',
//         link: 'https://image.tmdb.org/t/p/w500/umAoDwLZMBrYeCDfbJYFRMuXWAr.jpg'
//     },
//     {
//         name: 'Последний богатырь: Корень зла',
//         link: 'https://image.tmdb.org/t/p/w500/dIibeeq4QMay5bTJ2vjr72IFFRo.jpg'
//     }
// ];

//const initialCards = JSON.stringify(`https://api.themoviedb.org/3/movie/popular?api_key=261986cbb51c934516a9889245136067&language=ru&region=ru`)

//console.log (initialCards)

// let arrImgFilms = [];
// const imgObj = {};
//
// for (let i = 0; i < 4; i++) {
//
//     let y1 = server({url: "popular"}, i);
//     console.log(y1)
//     const printAddress2 = () => {
//         y1.then((link) => {
//             console.log(link);
//             console.log(typeof link);
//
//             // console.log(JSON.parse(a));
//             arrImgFilms.push(link);
//             console.log(arrImgFilms);
//             console.log(arrImgFilms, JSON.stringify(arrImgFilms))
//             for (item in arrImgFilms) {
//                 console.log(arrImgFilms[item])
//             }
//             //document.querySelector(".js-poster1").src = link;
//         });
//     };
//     printAddress2 ()
//
// }
// let x1 = server({url: "popular"}, 1);
// console.log(x1)
// let x2 = server({url: "popular"}, 2);
// let x3 = server({url: "popular"}, 3);
// let x4 = server({url: "popular"}, 4);


//2 const printAddress = () => {
//     x1.then((a) => {
//         console.log(a);
//         document.querySelector(".js-poster1").src = a;
// 2    });
// x2.then((a) => {
//   console.log(a);
//   document.querySelector(".js-poster2").src = a;
// });
// x3.then((a) => {
//   console.log(a);
//   document.querySelector(".js-poster3").src = a;
// });
// x4.then((a) => {
//   console.log(a);
//   document.querySelector(".js-poster4").src = a;
// });
//2 };
//
//2 printAddress();
//
// let urlHTML = printAddress();
// console.log(1, urlHTML);

// document.querySelector('.js-iframe').src = urlHTML;
