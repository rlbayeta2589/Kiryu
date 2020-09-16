const Discord = require('discord.js');
const env = require('dotenv').config();
const fs = require('fs');

const amongity = require('../controllers/amongity');
const modelhelper = require('../controllers/modelhelper');
const embedhelper = require('../controllers/embedhelper');

class KiryuBot {
    constructor() {
        this.client = new Discord.Client();
        this.client.commands = new Discord.Collection();
        this.client.aliases = new Discord.Collection();
    }

    async initializeBot() {
        console.log('Binding Client to helpers . . .');
        amongity.bindClient(this.client);

        console.log('Logging in . . .');
        this.client.login(process.env.BOT_TOKEN);
    }

    prepareBot() {
        console.log('Preparing bot . . .');
        this.bindReadyEvent();

        console.log('Initializing helpers . . .');
        modelhelper.initialize();

        console.log('Getting ready for messages . . .');
        this.bindMessageEvent();
        this.bindReactionAddEvent();
        this.bindReactionRemoveEvent();

        console.log('Importing bot commands . . .');
        this.importCommands();
    }

    importCommands() {
        let commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

        for (let file of commandFiles) {
            let command = require(`../commands/${file}`);
            this.client.commands.set(command.name, command);

            if (command.aliases) {
                command.aliases.forEach(alias => {
                    this.client.aliases.set(alias, command);
                });
            }
        }
    }

    bindReadyEvent() {
        this.client.once('ready', () => {
            console.log('\n=========  KIRYU NOW ONLINE  =========\n');
            this.client.user.setActivity("out for the impostors.", {'type': 'WATCHING'});
        });
    }

    bindMessageEvent() {
        this.client.on('message', msg => {
            let prefix = process.env.PREFIX.substring(1);

            if (!msg.content.startsWith(prefix) || msg.author.bot) return;
        
            if (!msg.member.hasPermission("ADMINISTRATOR")) {
                return msg.reply('You do not have admin priveledges !');
            }

            let args = msg.content.slice(prefix.length).split(/ +/);
            let command = args.shift().toLowerCase();
        
            if (!this.client.commands.has(command) && !this.client.aliases.has(command)) return;
        
            try {
                let cmd = this.client.commands.get(command) || this.client.aliases.get(command); 
                cmd.execute(msg, args);
            } catch (error) {
                console.error(error);
                msg.reply('there was an error trying to execute that command!');
            }
        
            console.log(msg.content);
        });
    }

    bindReactionAddEvent() {
        this.client.on('messageReactionAdd', (reaction, user) => {
            if (user.bot) return;
            this.reactionCommand(reaction.message, reaction.emoji.name);
        });
    }

    bindReactionRemoveEvent() {
        this.client.on('messageReactionRemove', (reaction, user) => {
            if (user.bot) return;
            this.reactionCommand(reaction.message, reaction.emoji.name);
        });
    }

    reactionCommand(msg, emote) {
        let valid_emoji = ['🔊','🔇','🚫'];
        
        if (!valid_emoji.includes(emote)) return;

        if (emote == valid_emoji[0]) {
            return amongity.unmuteAlivePlayers(msg);
        }

        if (emote == valid_emoji[1]) {
            return amongity.muteAllPlayers(msg);
        }

        if (emote == valid_emoji[2]) {
            return amongity.endGame(msg);
        }
    }
 }

 module.exports = new KiryuBot();