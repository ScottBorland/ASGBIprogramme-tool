//Fly server: https://long-hill-1888.fly.dev
//Heroku server: https://asgbi-programme.herokuapp.com 

const upload = async (rows) =>{
  alert('Spreadsheet has been uploaded and is now viewable at https://scottborland.github.io/ASGBI-public-view')
    fetch('https://long-hill-1888.fly.dev', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Accept': 'application/json, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(rows)
  })
}

