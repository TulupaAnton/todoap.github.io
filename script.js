const inputBox = document.getElementById('input-box')
const listContainer = document.getElementById('list-container')
function showAlert (title, text, icon = 'warning') {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonColor: '#007BFF'
  })
}
function addTask () {
  if (inputBox.value === '') {
    showAlert('Помилка', 'Будь ласка введіть завдання.', 'error')
  } else {
    let li = document.createElement('li')
    li.innerHTML = inputBox.value
    listContainer.appendChild(li)

    let span = document.createElement('span')
    span.innerHTML = '\u00d7'
    li.appendChild(span)

    let editSpan = document.createElement('span')
    editSpan.innerHTML = '<i class="fas fa-pencil-alt"></i>'
    editSpan.classList.add('edit-icon')
    editSpan.onclick = function () {
      editTask(li)
    }
    li.appendChild(editSpan)

    listContainer.appendChild(li)
  }
  inputBox.value = ''
  saveData()
  toggleDeleteButton()
}
listContainer.addEventListener(
  'click',
  function (e) {
    if (e.target.tagName === 'LI') {
      e.target.classList.toggle('checked')
      saveData()
    } else if (e.target.tagName === 'SPAN') {
      e.target.parentElement.style.display = 'none'
    }
    saveData()
  },
  false
)

function editTask (item) {
  let newText = prompt(
    'Редагувати завдання',
    item.childNodes[0].textContent.trim()
  )
  if (newText !== null && newText.trim() !== '') {
    item.childNodes[0].textContent = newText
    saveData()
  }
}

function saveData () {
  localStorage.setItem('data', listContainer.innerHTML)
}

function toggleDeleteButton () {
  const deleteBtn = document.querySelector('.deleteBtn')
  if (listContainer.children.length > 0) {
    deleteBtn.style.display = 'block'
  } else {
    deleteBtn.style.display = 'none'
  }
}

function allDelete () {
  listContainer.innerHTML = ''
  saveData()
  toggleDeleteButton()
}
function showTask () {
  listContainer.innerHTML = localStorage.getItem('data')
  toggleDeleteButton()
}

showTask()
