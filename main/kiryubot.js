const Discord = require('discord.js');
const env = require('dotenv').config();
const fs = require('fs');

const amongity = require('../controllers/amongity');


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

        console.log('Getting ready for messages . . .');
        this.bindMessageEvent();

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

 }

 module.exports = new KiryuBot();