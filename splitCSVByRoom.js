const fs = require('fs')
require.extensions['.csv'] = function (module, filename) {
	module.exports = fs.readFileSync(filename, 'utf8')
}

let dataName  

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
  readline.question(`Enter name of CSV to split (do not include file extension)`, (input) => {
    console.log(`Splitting ${input}...`)
    dataName = input
    readline.close()
  })

const data = require(`./poultry1/${dataName}.csv`)
function CSVToArray( strData, strDelimiter ){
    strDelimiter = (strDelimiter || ",");
    var objPattern = new RegExp(
        (
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );

    var arrData = [[]];
    var arrMatches = null;
    while (arrMatches = objPattern.exec( strData )){
        var strMatchedDelimiter = arrMatches[ 1 ];
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
            ){
            arrData.push( [] );

        }

        var strMatchedValue;
        if (arrMatches[ 2 ]){
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );

        } else {
            strMatchedValue = arrMatches[ 3 ];

        }

        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

    return( arrData );
}

const dataArr = CSVToArray(data, ',')
let ids = []
dataArr.map(x => {
    if (x[1] !== undefined && x[1] !== 'room_id') ids.push(x[1])
})
const unique = (value, index, self) => {
    return self.indexOf(value) === index
  }
const uniqueIds = ids.filter(unique)
console.log(uniqueIds)
const labels = 'controllerid,room_id,room_name,equip_id,equipment_name,equipment_type,timestamp,unit,value'
uniqueIds.forEach(x => {
    fs.writeFile(
        `room${x}_${dataName}.csv`,
         labels + '\n' + dataArr.filter(arr => arr[1] === x).join('\n'),
         (err) => { if (err) throw err }
        )
  })
  
console.log('Done')