roomsRow = 'null'
rooms = []
speakers = []

ArrayOfSpeakersLists = []

speakerSignifierStart = '<'
speakerSignifierEnd = '>'

const findRoomRow = (rows) => {
    rows.forEach((row, index) => {
        if(row[0] == 'Room:'){
            roomsRow = index;
        }    
    })
}

const findDateRows = (rows) => {
    datesRows = []
    rows.forEach((row, index) => {
        if(row[0] == 'Date:'){
            datesRows.push(index);
        }    
    })
    console.log(datesRows)
    return datesRows
}

const listRooms = ((rows) => {
    roomsArray = rows[roomsRow]
    roomsArray.forEach((item) => {
        if(item !== 'null' && item !== 'Room:'){
            rooms.push(item)
        }
    })
})

const separateTables = (rows, dateRows) => {
    var tables = []
    dateRows.forEach((dateRow, index) => {
        if(index != dateRows.length - 1){
            var spliceLength = dateRows[index+1] - dateRows[index]
            tables[index] = rows.splice(0, spliceLength)
        }else{
            tables[index] = rows
        }    
    })
    return tables
}

const retrieveDate = (rows) => {
    var date = document.createElement('header')
    var dateAsString = convertDateToString(rows[0][1])
    rows[0][1] = convertDateToString(rows[0][1])
    date.innerHTML = dateAsString
    // rows = rows.splice(0, 1)
    document.body.appendChild(date)
}

const listSpeakers = ((rows) => {
    speakers = []
    rows.forEach((row, index) => {
        row.forEach((item, index) => {
            if(checkStringForCharacter(item, speakerSignifierStart)){
                extractSpeakers(item)
            }
        })
    })
    console.log(speakers)
    ArrayOfSpeakersLists.push(speakers)
})

const extractSpeakers = (item) => {
    const startIndex = item.indexOf(speakerSignifierStart) + 1
    const endIndex = item.indexOf(speakerSignifierEnd) 
    let speaker = item.slice(startIndex, endIndex)
    speakers.push(speaker)
    const newItem = item.slice(endIndex+1)
    if(checkStringForCharacter(newItem, speakerSignifierStart)){
        extractSpeakers(newItem)
    }
}

function createSpeakerTable(speakersArray){
    ArrayOfSpeakersLists.forEach((speakerArray, index) => {
        var speakerTable = document.createElement('table')
        speakerTable.id = 'speaker-table'
        speakerTable.className = 'speaker-table'
        let thead = speakerTable.createTHead()
        
        let row = thead.insertRow()
        let th = document.createElement('th')
        let text = 'Day ' + (index + 1).toString() + ' Speakers' + ' (' + speakerArray.length.toString() + ')'
        th.innerHTML = text
        th.style.padding = '5px'
        th.style.paddingTop = '5px'
        row.appendChild(th)
        
    
        var speakerTableBody = document.createElement('tbody')    
    
            speakerArray.forEach((speaker) => {
                var row = document.createElement('tr')
                row.class = 'speaker-table-row'
                row.style.borderRight = 'white solid 0px'
                var cell = document.createElement('td')
                cell.class = 'speaker-table-cell'
                cell.style.borderRight = 'white solid 0px'
                cell.innerHTML= speaker
                row.appendChild(cell)
                speakerTableBody.appendChild(row)
    
        })
        
    
        speakerTable.appendChild(speakerTableBody);
        document.body.appendChild(speakerTable);
    })
}

function createTable(tableData) {
    var table = document.createElement('table');
    table.id = "programme-table"
    var tableBody = document.createElement('tbody');
  
    tableData.forEach(function(rowData, index) {
        if(index == 0){return}else{
            var row = document.createElement('tr')
        }
      
  
      rowData.forEach(function(cellData) {
        var cell = document.createElement('td');
        if(cellData !== null){
            cellData = setCellColor(cell, cellData);
            cell.appendChild(document.createTextNode(cellData));
        }
        row.appendChild(cell);
      });
  
      tableBody.appendChild(row);
    });
  
    table.appendChild(tableBody);
    document.body.appendChild(table);
  }

const setCellColor = (cell, cellData) => {
    if(checkStringForCharacter(cellData, '[s]')){
        cell.style.backgroundColor = 'lightgreen'
        cellData = replaceCellCharacter(cellData, '[s]', '')
    }else if (checkStringForCharacter(cellData, '[p]')){
        cell.style.backgroundColor = 'lightblue'
        cellData = replaceCellCharacter(cellData, '[p]', '')
    }else if (checkStringForCharacter(cellData, '[e]')){
        cell.style.backgroundColor = 'tan'
        cellData = replaceCellCharacter(cellData, '[e]', '')
    }else if (checkStringForCharacter(cellData, '[b]')){
        cell.style.backgroundColor = 'plum'
        cell.style.border = '0px solid blue'
        cellData = replaceCellCharacter(cellData, '[b]', '')
    }else if (checkStringForCharacter(cellData, '[v]')){
        cell.style.backgroundColor = 'indianred'
        cellData = replaceCellCharacter(cellData, '[v]', '')
    }else if (checkStringForCharacter(cellData, '[r]')){
        cell.style.backgroundColor = 'slateblue'
        cellData = replaceCellCharacter(cellData, '[r]', '')
    }else if(checkStringForCharacter(cellData, '[n]')){
        cellData = replaceCellCharacter(cellData, '[n]', '')
    }
    return cellData
}

const findCellType = (cell) => {
    var cellType
    if(checkStringForCharacter(cell, '[s]')){
        cellType = '[s]'
    } else if(checkStringForCharacter(cell, '[b]')){
        cellType = ''
    } else if(checkStringForCharacter(cell, '[e]')){
        cellType = '[e]'
    } else if(checkStringForCharacter(cell, '[r]')){
        cellType = '[r]'
    } else if(checkStringForCharacter(cell, '[v]')){
        cellType = '[v]'
    } else if(checkStringForCharacter(cell, '[p]')){
        cellType = '[p]'
    }else if(checkStringForCharacter(cell, '[r]')){
        cellType = '[r]'
    }  
    else{
        cellType = ''
    }
    return cellType
}

const handleGlobalRows = (rows) => {
    rows.forEach((row, index) => {
        var rowsIndex = index
        row.forEach((item, index) => {
            if(checkStringForCharacter(item, '[b]')){
                if(index == 1){
                    moveToMiddleCell(item, rows, rowsIndex)
                    rows[rowsIndex][index] = '[b]'
                }              
                for (var i=1; index+i < row.length; i++)
                if(rows[rowsIndex][index+i] == null){
                    rows[rowsIndex][index+i] = '[b]'
                }
            }
        })
    })
}

const moveToMiddleCell = (item, rows, rowsIndex) => {
    var middleIndex = Math.floor(rows[rowsIndex].length/2);
    rows[rowsIndex][middleIndex] = item
}

const handleEmptyCells = (rows) => {
    rows.forEach((row, index) => {
        var rowsIndex = index
        row.forEach((item, index) => {
            if(item === null){
                if(rowsIndex != 0){
                    var cellType = findCellType(rows[rowsIndex-1][index])
                    rows[rowsIndex][index] = cellType
                }
            }
        })
    })
}

const printRooms = (rooms) => {
    
    ul = document.createElement('ul');
    title = document.createElement('header')
    
    document.getElementById('speakerlistholder').appendChild(title);
    document.getElementById('speakerlistholder').appendChild(ul);
    
    rooms.forEach(room => {
    let li = document.createElement('li');
    ul.appendChild(li);
    title.innerHTML += 'Speakers: '
    li.innerHTML += room;
    });
}

const printSpeakers = (speakers) => {

    title = document.createElement('header')
    
    document.body.appendChild(title);
    
    ul = document.createElement('ul');
    
    document.body.appendChild(ul);
    
    speakers.forEach(speaker => {
    let li = document.createElement('li');
    ul.appendChild(li);
    title.innerHTML = 'Speakers: '
    li.innerHTML += speaker;
    });
}









