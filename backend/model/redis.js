const redis = require('redis')

const redisclient = redis.createClient({
    username: 'default',
    password: process.env.redis_password,
    socket: {
        host: 'redis-14030.c276.us-east-1-2.ec2.cloud.redislabs.com',
        port: 14030
    }
});
module.exports = redisclient;
