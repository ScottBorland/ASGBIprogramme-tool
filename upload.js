const upload = async (rows) =>{
    //https://asgbi-programme.herokuapp.com
    fetch('https://asgbi-programme.herokuapp.com', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Accept': 'application/json, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(rows)
  })
  console.log(JSON.stringify(rows))
}

