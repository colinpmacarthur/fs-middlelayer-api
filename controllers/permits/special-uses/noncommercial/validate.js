/*

  ___ ___       ___               _ _       _   ___ ___ 
 | __/ __|  ___| _ \___ _ _ _ __ (_) |_    /_\ | _ \_ _|
 | _|\__ \ / -_)  _/ -_) '_| '  \| |  _|  / _ \|  _/| | 
 |_| |___/ \___|_| \___|_| |_|_|_|_|\__| /_/ \_\_| |___|

*/

//*******************************************************************

'use strict';

//*******************************************************************
// required modules

var include = require('include')(__dirname);
var _ = require('lodash');

//*******************************************************************

var util = include('controllers/permits/special-uses/utility.js');

//*******************************************************************

var noncommercial = function(req){

    var output = {
        'fields_valid': true,
        'error_array':[]
    };

    return output;

};

//*******************************************************************
// exports

module.exports.noncommercial = noncommercial;
