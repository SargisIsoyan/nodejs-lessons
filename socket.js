const AppError = require('./managers/app_error');
const TokenManager = require('./managers/token-manager');
const MessagesCtrl = require('./controllers/messages.ctrl');

module.exports = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: '*'
        }
    });
    const users = new Map();
    io.use((client, next) => {
        if (client.handshake.auth && client.handshake.auth.token) {
            try {
                const decoded = TokenManager.decode(client.handshake.auth.token);
                if (decoded.userId && decoded.action === 'login') {
                    client.userId = decoded.userId;
                    next();
                } else {
                    client.disconnect();
                }
            } catch (e) {
                client.disconnect();
            }
        } else {
            client.disconnect();
        }
    }).on('connection', (client) => {
        users.set(client.userId, client);
        client.on('disconnect', () => {
            users.delete(client.userId);
        });

        client.on('new message', async (data) => {
            const message = await MessagesCtrl.send({
                userId: client.userId,
                to: data.to,
                value: data.value
            });
            if(users.has(data.to)){
                const user = users.get(data.to);
                user.emit('new message', message);
            }
        });

        client.on('get messages', async (data) => {
            const messages = await MessagesCtrl.getMessages({
                userId: client.userId,
                to: data.to
            });
            client.emit('get messages', messages);
        })
    });
}
