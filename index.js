//Used with TOKEN operation instead of putting token direction to main.js
require("dotenv").config();

//Restart nodemon dev script with this command (automatically restarts bot on saved changes)
//npm dev nodemon

//New versions of discord.js require "Intents"
//Intents give permissions for what the bot is able to view
//Guilds are essentially channels
const {Client, Intents} = require("discord.js");
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

//Display message that bot is online
client.once('ready', () => {
    console.log('invokeBot is Online')
});

//Set Bot command key
const prefix = '!';

//Set role constants
const testRole = '900975818669436929';
const trustedMembersRole = '';
const invokeBotRole = '';
const adminRole = '';
const everyoneRole = '';

//Set channel constants
const generalChannelID = '855343712033177633';

//Listen for message and have bot respond
client.on("messageCreate", message => {
    if(message.content.startsWith("!")){
        if(message.content.substring(1) === "ping"){
            message.reply("Message Received");
        } else if(message.content.substring(1) === "commands"){
            message.reply("!ping, !commands, !roleChange");
        }
        //This command allows you to get detailed information for each role
        else if(message.content.substring(1) === "showRoleData"){
            message.reply("Sending to console...");
            console.log(message.guild.roles.valueOf(2));
        }
        //Adds role when command is typed
        else if(message.content.substring(1) === "roleChange"){
            message.member.roles.add(testRole);
        }
        //Ping all members of a role - Not working yet
        else if(message.content.substring(1) === "pingRole"){
            client.channels.cache.get(generalChannelID).send("Mentioning. ", "<@&testRole>");;
        }
    }
});



//Login to Bot - Keep this last line in file
//Uses the env package to import TOKEN from the .env file
client.login(process.env.TOKEN);