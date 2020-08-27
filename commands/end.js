const amongity = require('../controllers/amongity');

module.exports = {
	name: 'end',
    description: 'End an AmongUs game session.',
	aliases: ["endgame"],
	sample: ['/end'],
	execute(message, args) {
        if (!amongity.isGameActive()) {
			return message.reply('There are no ongoing game session. Please start using the command: ```/start```');
        }

        amongity.endGame();
	},
};