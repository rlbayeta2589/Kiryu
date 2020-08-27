const amongity = require('../controllers/amongity');

module.exports = {
	name: 'talk',
	description: 'Unmute all alive players in the active voice channel.',
	aliases: ["unmute"],
	sample: ['/talk'],
	execute(message, args) {
		if (!amongity.isGameActive()) {
			return message.reply('There are no ongoing game session. Please start using the command: ```/start```');
		}
		
        amongity.unmuteAlivePlayers();
	},
};