const amongity = require('../controllers/amongity');

module.exports = {
	name: 'help',
	description: 'Display all the commands.',
	sample: ['/help'],
	execute(message, args) {
		message.channel.send(amongity.helpCommands());
	},
};