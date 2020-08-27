const amongity = require('../controllers/amongity');

module.exports = {
	name: 'task',
	description: 'Mute all players in the active voice channel.',
	aliases: ["mute"],
	sample: ['/task'],
	execute(message, args) {
		if (!amongity.isGameActive()) {
			return message.reply('There are no ongoing game session. Please start using the command: ```/start```');
		}
		
        amongity.muteAllPlayers();
	},
};