/* var config = {
    user: 'apps_bsft',
    addres: '10.3.18.93',
    port: '27017',
    password: '6Q9PvRsEq8cXqQf',
    info: '?authSource=BroadSoft',
    option: { useNewUrlParser: true },
    db: "BroadSoft",
}; */

/*
var config = {
    user:'BroadSoftOwner',
    address:'10.3.18.85',
    port:'27017',
    password:'pePh4MecHe2hEth',
    info:'?authSource=BroadSoft',
    option:{  useNewUrlParser: true },
    db:'BroadSoft'
}*/

/* var config = {
        user: 'riflores',
        addres: '10.3.18.93',
        port: '27017',
        password: 'uD2kC2tm6KAhgKS6qQfZ',
        info: '/?authSource=Vsys_ms',
        option: { useNewUrlParser: true, useUnifiedTopology: true },
        db: "Vsys_ms",
    } */
var config = {
    user: 'ijardines', //emanuel_prueba
    addres: '10.3.18.93',  // localhost
    port: '27017', //27017
    password: 'uJ7NJjCbvz9fS32SW4QC', //1234
    info: '?authSource=Vsys_ms', //?authSource=EJERCICIOS2
    option: { useNewUrlParser: true, useUnifiedTopology: true },
    db: "Vsys_ms", // BASE DE DATOS   //EJERCICIOS2
}

if (!config.urlMongo) {
    config.urlMongo = 'mongodb://' + config.user + ':' + config.password + '@' +
        config.addres + ':' + config.port + '/' + config.info;

}
module.exports = config;