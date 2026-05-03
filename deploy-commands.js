require('dotenv').config();
const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [

  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Test du bot'),

  new SlashCommandBuilder()
    .setName('boosts')
    .setDescription('Show available boosts/carries'),

  new SlashCommandBuilder()
    .setName('matcherino')
    .setDescription('Request a Matcherino pin'),

  new SlashCommandBuilder()
    .setName('rewards')
    .setDescription('Create a reward ticket'),

  new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Create a support ticket'),

  new SlashCommandBuilder()
    .setName('account')
    .setDescription('Créer une annonce de compte')
    .addStringOption(o =>
      o.setName('description')
        .setDescription('Description')
        .setRequired(true)
    )
    .addStringOption(o =>
      o.setName('price')
        .setDescription('Prix')
        .setRequired(true)
    )
    .addStringOption(o =>
      o.setName('trophies')
        .setDescription('Trophées')
        .setRequired(true)
    )
    .addStringOption(o =>
      o.setName('image')
        .setDescription('URL image')
        .setRequired(true)
    )

].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log('✅ Commandes déployées');
  } catch (err) {
    console.error(err);
  }
})();