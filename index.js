const fs = require('fs')
require.extensions['.csv'] = function (module, filename) {
	module.exports = fs.readFileSync(filename, 'utf8')
}

const data = require('./poultry1/poultry_feed_tank_feed_usage.csv')
// console.log(data)

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
const keys = dataArr[0]
console.log(dataArr)
console.log(keys)
dataArr.filter(arr => arr[3] === '8157')