//  _                                        
// (_)                                       
//  _  ___ ___  ___ _ __ ___  __ _ _ __ ___  
// | |/ __/ _ \/ __| '__/ _ \/ _` | '_ ` _ \ 
// | | (_|  __/ (__| | |  __/ (_| | | | | | |
// |_|\___\___|\___|_|  \___|\__,_|_| |_| |_|
//   __           _                   
//  / _|         | |                  
// | |_ __ _  ___| |_ ___  _ __ _   _ 
// |  _/ _` |/ __| __/ _ \| '__| | | |
// | || (_| | (__| || (_) | |  | |_| |
// |_| \__,_|\___|\__\___/|_|   \__, |
//                               __/ |
//                              |___/ 

//          _.-.
//        ,'/ //\
//       /// // /)
//      /// // //|
//     /// // ///
//    /// // ///
//   (`: // ///
//    `;`: ///
//    / /:`:/
//   / /  `'
//  / /
// (_/  hh

const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const helpers = require('./src/helpers/index.js');

// Syncing all the models at once.
conn.sync({ force: false }).then(async () => {
  server.listen(3001, () => {
    console.log(`🍦🍧 Tony Gelati 🍧🍦`);
    console.log(`🚀 listening on port: 3001 🚀`);
  });
  await helpers.chargeMaterials()
  await helpers.chargePopsicleType()
});
