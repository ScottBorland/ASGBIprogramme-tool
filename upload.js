const upload = async (rows) =>{
  alert('Spreadsheet has been uploaded and is now viewable at file:///C:/Users/scott/Documents/asgbi-tool-public-view/index.html')
    fetch('https://asgbi-programme.herokuapp.com', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Accept': 'application/json, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(rows)
  })
}

