const amongity = require('../controllers/amongity');

module.exports = {
	name: 'start',
	description: 'Start an AmongUs game session.',
	aliases: ["startgame"],
	sample: ['/start'],
	execute(message, args) {
		if (!message.member.voice.channel) {
            return message.reply('Please join a voice channel to start.');
        }

        amongity.startGame(message.channel.id, message.member.voice.channel.id);
	},
};