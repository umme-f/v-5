const sql = require('mssql/msnodesqlv8');

// database configutation
var config ={
    database : 'car_demo',
    server : 'K2023-003\\SQLEXPRESS',
    driver : 'msnodesqlv8',
    options : {
        trustedConnection : true
    }
};

// connect to databases
sql.connect(config,function(err){
    if (err){
        console.log(err);
    }

    // create the request object
    var request = new faShareAltSquare.Request();
    // database query
    request.query('select * from table', function(err, recordSet){
        if (err){
            console.log(err)
        }else{
            console.log(recordSet)
        }
    });
})