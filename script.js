let apiData = localStorage
let allUsers = []
let selectedUsers = []

window.addEventListener('load', loadApi)

let userListHTML = document.querySelector('#userList')
let statsHTML = document.querySelector('#stats')
let inputText = document.getElementById('inputText')
let form = document.querySelector('form')

function renderUsers() {
  userListHTML.innerHTML = ''
  selectedUsers.sort((a, b) => a.name.localeCompare(b.name))

  userListHTML.innerHTML = '<p>Nenhum usuário encontrado</p>'

  if (selectedUsers.length !== 0) {
    userListHTML.innerHTML = ''

    selectedUsers.forEach(user => {
      const { name, picture, age } = user
  
      let cardUserHTML = `
        <div class="card">
          <div class="row">
            <img src="${picture}">
            <p>${name}, ${age} anos</p>
          </div>
        </div>
      `
    userListHTML.innerHTML += cardUserHTML
    })
  }
}

function renderStats() {
  statsHTML.innerHTML = ''
  let totalMaleGender = 0
  let totalFemaleGender = 0
  let sumAges = 0
  let mediaAges = 0

  statsHTML.innerHTML = '<p>Nada para exibir</p>'
  
  if (selectedUsers.length !== 0) {
    statsHTML.innerHTML = ''
    
    selectedUsers.forEach(user => {
      const { gender, age } = user

      gender == 'male' ? totalMaleGender ++ : totalFemaleGender ++

      sumAges += age    
    })

    selectedUsers.length == 0 ? mediaAges = 0 : mediaAges = sumAges/selectedUsers.length

    let cardStatusHTML = `
      <div class="info">
        <p class="total-users">Total de usuários: ${selectedUsers.length}</p>
        <p>Sexo masculino: ${totalMaleGender}</p>
        <p>Sexo feminino: ${totalFemaleGender}</p>
        <p>Soma das idades: ${sumAges}</p>
        <p>Média das idades: ${mediaAges.toFixed(2)}</p>
      </div
    `
    
    statsHTML.innerHTML += cardStatusHTML
  }
}

async function loadApi() {
  let result = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo')
  let { results: json } = await result.json()
  allUsers = json.map(data => {
    return {
      name: data.name.first + ' ' + data.name.last,
      picture: data.picture.thumbnail,
      age: data.dob.age,
      gender: data.gender
    }
  })

  selectedUsers = allUsers

  renderUsers()
  renderStats()
  
}

inputText.addEventListener('keyup', event => {
  let text = event.target.value
  selectedUsers = []

  allUsers.find(user => {
    let nameCompare = user.name.toLowerCase()

    if (nameCompare.indexOf(text.toLowerCase()) >= 0) {
      selectedUsers = [...selectedUsers, user]
    }
  })

  renderUsers()
  renderStats()
})

form.addEventListener('submit', event => event.preventDefault())