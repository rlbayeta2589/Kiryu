const amongity = require('../controllers/amongity');

module.exports = {
	name: 'start',
	description: 'Start an AmongUs game session.',
	aliases: ["startgame"],
	sample: ['/start'],
	execute(message, args) {
		if (amongity.isGameActive()) {
			return message.reply('There is already an ongoing game session. Please end using the command: ```/end```');
        }

		if (!message.member.voice.channel) {
            return message.reply('Please join a voice channel to start.');
        }

        amongity.startGame(message.channel.id, message.member.voice.channel.id);
	},
};