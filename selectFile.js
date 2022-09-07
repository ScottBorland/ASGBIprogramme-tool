// ************************ Drag and drop ***************** //
let dropArea = document.getElementById("drop-area")

// Prevent default drag behaviors
;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)   
  document.body.addEventListener(eventName, preventDefaults, false)
})

// Highlight drop area when item is dragged over it
;['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false)
})

;['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false)
})

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false)

function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}

function highlight(e) {
  dropArea.classList.add('highlight')
}

function unhighlight(e) {
  dropArea.classList.remove('active')
}

function handleDrop(e) {
  var dt = e.dataTransfer
  var files = dt.files

  handleFiles(files)
}

let uploadProgress = []
let progressBar = document.getElementById('progress-bar')

function initializeProgress(numFiles) {
  progressBar.value = 0
  uploadProgress = []

  for(let i = numFiles; i > 0; i--) {
    uploadProgress.push(0)
  }
}

function updateProgress(fileNumber, percent) {
  uploadProgress[fileNumber] = percent
  let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length
  progressBar.value = total
}

function handleFiles(files) {
    readXlsxFile(files[0]).then(function(rows) {
        // `rows` is an array of rows
      // each row being an array of cells.
      
      retrieveDate(rows)
      findRoomRow(rows)
      listRooms(rows)
      listSpeakers(rows)
      handleGlobalRows(rows)
      handleEmptyCells(rows)
      convertDatesToInt(rows)
      replaceStringCharacter(rows, '<', '')
      replaceStringCharacter(rows, '>', '')
      createTable(rows)
      printSpeakers(speakers)
      fileSelector.remove()
  
      

      var button = document.createElement('button')
      button.innerText = 'Upload'
      button.className = 'button-upload' 
      button.id = 'uploadButton'
      button.onclick = function() {
        upload(rows);
    };
      document.body.appendChild(button)
    })
}
