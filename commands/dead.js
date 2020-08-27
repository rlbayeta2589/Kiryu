const amongity = require('../controllers/amongity');

module.exports = {
	name: 'dead',
	description: 'Add player to the dead list.',
	sample: ['/dead'],
	execute(message, args) {
        if (!amongity.isGameActive()) {
			return message.reply('There are no ongoing game session. Please start using the command: ```/start```');
        }

		let mention = message.mentions.users.first();
		if (!args.length || args.length > 1 || !mention) {
			return message.reply('Please tag the dead player.');
		}

        amongity.addDeadPlayer(mention.id);
	},
};