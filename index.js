require("dotenv").config();
const { Client, Collection } = require("discord.js");

const fs = require("fs");
const path = require("path");

const c = require("./config.json");

const client = new Client({
    intents: [131071]
});

client.once("ready", async () => {
    console.log("Bot is ready!", client.user.tag);
});

client.login(process.env.token);

client.commands = new Collection()
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith(".js"));

for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on("messageCreate", async (message) => {
    if (!message.content.startsWith(c.prefix) || message.author.bot)return;
    const args = message.content.slice(1).trim().split( );
    const commandName = args.shift().toLocaleLowerCase();

    const command = client.commands.get(commandName)
    if (!command)return;

    try {
        command.execute(message, args, client)

    } catch(error){
        console.error(error);
        message.reply("هنالك مشكلة في البوت", error)
    }
});