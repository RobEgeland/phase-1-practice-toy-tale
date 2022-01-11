let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

let toyObj = {
  name: '',
  image: '',
  likes:0
}
document.addEventListener('DOMContentLoaded', getToys);


function getToys() {
  fetch('http://localhost:3000/toys')
  .then((res) => res.json())
  .then((data) => data.forEach((data) => renderOneToy(data)))

}

function renderOneToy(data) {
  let card = document.createElement('div');
  card.className = 'card'
  card.innerHTML = `
    <h2>${data.name}</h2>
    <img src ="${data.image}" class="toy-avatar" />
    <p>${data.likes}</p>
    <button class="like-btn" id="${data.id}">Like</button>
  `
  document.querySelector('#toy-collection').appendChild(card)
  card.querySelector('.like-btn').addEventListener('click', () => {
    data.likes += 1
    card.querySelector('p').textContent = data.likes
    updateLikes(data)
  })
}

document.querySelector('.add-toy-form').addEventListener('submit', addNewToy);

function addNewToy(e) {
  toyObj = {
    name:e.target.name.value,
    image:e.target.URL.value,
    likes:0
  }
  renderOneToy(toyObj)
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(toyObj)
  })
  .then(res => res.json())
  .then(data => console.log(data))
}

function updateLikes(toy) {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toy)
  })
  .then(res => res.json())
  .then(data => console.log(data))

}