
console.log([
	'',
	'      ██╗  ██╗██╗██████╗ ██╗   ██╗██╗   ██╗',
	'      ██║ ██╔╝  ║██╔══██╗╚██╗ ██╔╝██║   ██║',
	'      █████╔╝ ██║██████╔╝ ╚████╔╝ ██║   ██║',
	'      ██╔═██╗ ██║██╔══██╗  ╚██╔╝  ██║   ██║',
	'      ██║  ██╗██║██║  ██║   ██║   ╚██████╔╝',
	'      ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ',
	'',
].join('\n'));

const KiryuBot = require('./main/kiryubot');
KiryuBot.prepareBot();
KiryuBot.initializeBot();