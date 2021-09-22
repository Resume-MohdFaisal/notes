console.log('working')

window.onload = function () {
  let search = document.getElementById('searchTxt')
  search.addEventListener('input', function () {
    let inputVal = search.value.toLowerCase()
    // console.log(inputVal);
    let noteCards = document.getElementsByClassName('noteCard')
    Array.from(noteCards).forEach(function (element) {
      let cardTxt = element.getElementsByTagName('p')[0].innerText.toLowerCase();
      if (cardTxt.includes(inputVal)) {
        element.style.display = 'block';
      } else {
        element.style.display = 'none';
      }
    })
  })

  showNotes()
  let addBtn = document.getElementById('addBtn');
  // console.log(document.getElementById("addBtn"));
  addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');

    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = '';
    console.log(notesObj);
    showNotes();
  })
}
function showNotes() {
  let notes = localStorage.getItem('notes')

  if (notes == null) {
    notesObj = []
  } else {
    notesObj = JSON.parse(notes)
  }
  let html = ''
  notesObj.forEach(function (element, index) {
    html += ` 
        <div id="card" class="noteCard my-2 mx-2 card" style="width: 18rem;">
          <div class="card-body">
            <h6 class="card-text">posted on : ${Date()}</h6>
            <p class="card-text">
            ${element}
            </p>
            <a id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</a>
          </div>
        </div>
      `
  })
  let notesElm = document.getElementById('notes')
  if (notesObj.length != 0) {
    notesElm.innerHTML = html
  } else {
    notesElm.innerHTML = `nothing to show! not notes are added yet.`
  }
}

function deleteNote(index) {
  console.log('deleting ', index)
  notesObj.splice(index, 1)
  localStorage.setItem('notes', JSON.stringify(notesObj))
  showNotes()
}
