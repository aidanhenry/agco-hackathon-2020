const fs = require('fs')
require.extensions['.csv'] = function (module, filename) {
	module.exports = fs.readFileSync(filename, 'utf8')
}

const dataName = 'poultry_feed_tank_feed_usage'
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
    if (x[3] !== undefined && x[3] !== 'equip_id') ids.push(x[3])
})
const unique = (value, index, self) => {
    return self.indexOf(value) === index
  }
const uniqueIds = ids.filter(unique)
console.log(uniqueIds)
const labels = 'controllerid,room_id,room_name,equip_id,equipment_name,equipment_type,timestamp,unit,value'
uniqueIds.forEach(x => {
    fs.writeFile(
        `equipment${x}_${dataName}.csv`,
         labels + '\n' + dataArr.filter(arr => arr[3] === x).join('\n'),
         (err) => { if (err) throw err }
        )
  })
  
