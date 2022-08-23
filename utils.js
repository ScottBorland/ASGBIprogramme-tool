

const tableCreate = (row, col) => {
    let body = document.body;
    let tbl  = document.createElement('table');
    tbl.style.width  = '200px';
    tbl.style.border = '1px solid black';

    for(let i = 0; i < row; i++){
        let tr = tbl.insertRow();
        for(let j = 0; j < col; j++){
                let td = tr.insertCell();
                td.appendChild(document.createTextNode(`${i},${j}` ));
                td.style.border = '1px solid black';
            }     
    }
    body.appendChild(tbl);
}

var tableData = [["r1c1", "r1c2"], ["r2c1", "r2c2"], ["r3c1", "r3c2"]];



const replaceStringCharacter = (rows, character, replacement) => {
    rows.forEach((row, index) => {
        var rowsIndex = index
        row.forEach((item, index) => {
            if(typeof item === 'string'){
                rows[rowsIndex][index] = item.replaceAll(character, replacement);
            }
        });
    })  
}

const replaceCellCharacter = (cell, character, replacement) => {
            if(typeof cell === 'string'){
                var cellText
                cellText = cell.replaceAll(character, replacement);
                return cellText
            }
}

const checkStringForCharacter = (item, character) => {
    if(item != null && typeof item === 'string'){
        if(item.includes(character)){
            return true
        }
    } else {
        return false
    }
}

const convertDatesToInt  = (rows) => {
    rows.forEach((row, index) => {
        var rowsIndex = index;
        row.forEach((item, index) => {
            if (item instanceof Date){
                item = item.toTimeString()
                rows[rowsIndex][index] = item.slice(0, 5)
            }
        })
    })  
}
