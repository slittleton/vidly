const bcrypt = require('bcrypt');

// a salt is a random string of characters that will be
// put before or after a hashed password which makes 
// decryption more difficult
async function run() {
  const salt = await bcrypt.genSalt(20)  
  
  // the number passed as argument is the number of rounds the algorithm
  // is run, the more rounds the harder to break the password becomes.
  // 10 is the standard

  const hashed = await bcrypt.hash('1234', salt)

  console.log(salt);
  console.log(hashed);
}
run();