
const redis = require('redis');

const client = redis.createClient({
  port:6379,
  host:'127.0.0.1'
});

client.on('connect',async()=>{
  console.log('redis connected');
});

client.on('error',async(err)=>{
  console.log(err.message);
});

client.on('end',async()=>{
  console.log('redis end');
});

process.on('SIGINT',()=>{
   client.quit();
   process.exit(0);
});

module.exports = client;



