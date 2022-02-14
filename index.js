const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const token = process.env.DISCORD_TOKEN;
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.log(error);
    await interaction.reply({ content: `Ocorreu um erro ao executar o comando ${interaction.commandName}`, ephemeral: true });
  }
});

client.login(token);