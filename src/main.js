// // // Логікa роботи додатка

// // import { getData } from './js/pixabay-api';

// // import iziToast from 'izitoast';                                  // Бібліотека для повідомлень
// // import 'izitoast/dist/css/iziToast.min.css';

// // import SimpleLightbox from 'simplelightbox';                      // Бібліотека для галереї
// // import 'simplelightbox/dist/simple-lightbox.min.css';

// // const inputOfWords = document.querySelector('.inputOfWords');     // Інпут
// // const buttonForInput = document.querySelector('.buttonForInput'); // Кнопка
// // const userList = document.querySelector('.userList');             // Галерея
// // const areaForLoader = document.querySelector('.areaForLoader');   // Лоадер

// // let wordOfUser = '';
// // let imagesLength = '';

// // const lightbox = new SimpleLightbox('.gallery a', {   // Великі картинки 
// //   captionDelay: 250,
// //   captionsData: 'alt',
// // });

// // buttonForInput.addEventListener('click', event => {   // Надсилання запиту на сервер
// //   event.preventDefault();
// //   loaderF();
// //   userList.innerHTML = '';
// //   setTimeout(() => {
// //     wordOfUser = inputOfWords.value.trim();
// //     checkInputValidity();
// //   }, 2000);
// //   // inputOfWords.value = '';
// // });

// // function checkInputValidity() {                   // Перевірка валідності запиту
// //   fetchImages()
// //     .then(images => {
// //       if (wordOfUser === '') {
// //         iziToast.show({
// //           color: 'red',
// //           message: `Sorry, the input field must be filled in to start the photo search.`,
// //           position: 'topRight',
// //         });
// //       } else if (images.length === 0) {
// //         iziToast.show({
// //           color: 'red',
// //           message: `Sorry, there are no images matching your search query. Please try again!`,
// //           position: 'topRight',
// //         });
// //       } else {
// //         renderImg(images);
// //       }
// //     })
// //     .catch(error => console.log(error))
// //     .finally(() => spanElementRem());
// //     inputOfWords.value = '';
// // }

// // function renderImg(images) {                        // Рендар фото в браузері
// //   imagesLength = images.length;

// //   const markupImg = images                          
// //     .map(image => {
// //       return `<div class="blockForAllElements">
// //           <li>
// //           <a href=${image.largeImageURL} download="false">
// //           <img src=${image.webformatURL} alt = "${image.tags}" class = "imgOfUser">
// //           </a>
// //           </li>
// //           <div class = "divForDescription"> 
// //           <ul class="blockOfInfo"> 
// //             <li class="title">Likes</li>
// //             <li class="info">${image.likes}</li>
// //           </ul>
// //           <ul class="block">
// //             <li class="title">Views</li>
// //             <li class="info">${image.views}</li>
// //           </ul>
// //           <ul class="block">
// //             <li class="title">Comments</li>
// //             <li class="info">${image.comments}</li>
// //           </ul>
// //           <ul class="block">
// //             <li class="title">Downloads</li>
// //             <li class="info">${image.downloads}</li>
// //           </ul>
// //           </div>
// //         </div>`;
// //     })
// //     .join('');
// //   userList.insertAdjacentHTML('beforeend', markupImg);

// //   lightbox.refresh();
// // }

// // function fetchImages() {                            // Запит на сервер для отримання фото
// //   return fetch(
// //     `https://pixabay.com/api/?key=42977219-0f6c9f9217f976d8651793c3a&q=${wordOfUser}&image_type=photo&per_page=15&orientation=horizontal&safesearch=true`
// //   )
// //     .then(response => {
// //       if (!response.ok) {
// //         throw new Error(response.status);
// //       }
// //       return response.json();
// //     })
// //     .then(data => data.hits);
// // }

// function loaderF() {                                  // Створюємо лоадер
//   const spanElement = document.createElement('span');
//   areaForLoader.appendChild(spanElement);
//   spanElement.classList.add('loader');
// }

// function spanElementRem() {                           // Видаляємо лоадер
//   const loaderF = document.querySelector('.loader');
//   loaderF.remove();
// }


import { getData } from './js/pixabay-api';
import { renderImg, renderMoreImg } from './js/render-functions';

import iziToast from 'izitoast';                                  // Бібліотека для повідомлень
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.formForInput');             // Форма
const inputOfWords = document.querySelector('.inputOfWords');     // Інпут
const buttonLoadMore = document.querySelector('.buttonLoadMore'); // Кнопка "Ще"
const userList = document.querySelector('.userList');             // Галерея
const areaForLoader = document.querySelector('.areaForLoader');   // Лоадер


let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

form.addEventListener('submit', fetchImages)
buttonLoadMore.addEventListener('click', moreImages)

async function fetchImages(event) {
  event.preventDefault();

  const query = inputOfWords.value.trim();
  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search images',
    })
    return
  }
  areaForLoader.style.display = 'block';
  buttonLoadMore.style.display = 'none';
  currentPage = 1;
  currentQuery = query;

  try {
    const data = await getData(query, currentPage);
    if (data.hits.length === 0) {
      iziToast.error({
      title: 'Error',
      message: 'Sorry, there are no images matching your search query. Please try again!',
    })
    } else {
      totalHits = data.totalHits;
      userList.innerHTML = '';
      renderImg(data.hits);
      if (data.hits.length >= 15) {
          buttonLoadMore.style.display = 'block';
      }
      inputOfWords.value = '';
    }
  } catch (error) {
    if (userList.innerHTML = '') {
      iziToast.error({
      title: 'Error',
      message: 'An error occurred while searching for images!',
    })
    }
  }
  finally {
    areaForLoader.style.display = 'none';
  }
}

async function moreImages(event) {
  event.preventDefault();

  areaForLoader.style.display = 'block';

  try {
    currentPage += 1;
    const data = await getData(currentQuery, currentPage);
    if (data.hits.length > 0) {
      const cardHeight = document.querySelector('.blockForAllElements').getBoundingClientRect().height;
      renderMoreImg(data.hits);
      window.scrollBy({
                top: cardHeight * 2, // Прокручуємо на дві висоти карточки галереї
                behavior: 'smooth' // Додаємо плавність
            });
    } 
  } catch (error) {
    areaForLoader.style.display = 'none';
    iziToast.warning({
      title: 'Warning',
      message: 'No more images',
    })
  }
  finally {
    if (userList.querySelectorAll('.blockForAllElements').length >= totalHits) {
      buttonLoadMore.style.display = 'none';
      iziToast.info({
      title: 'Info',
      message: "We're sorry, but you've reached the end of search results.",
    })
    }
    areaForLoader.style.display = 'none';
  }
}
