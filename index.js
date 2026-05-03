process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);

require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('clientReady', () => {
  console.log(`✅ Connecté en tant que ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  try {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    // 🏓 PING
    if (commandName === 'ping') {
      return interaction.reply({ content: '🏓 Pong !' });
    }

    // 🚀 BOOSTS
    if (commandName === 'boosts') {
      return interaction.reply('🚀 Boosts disponibles bientôt !');
    }

    // 📌 MATCHERINO
    if (commandName === 'matcherino') {
      return interaction.reply('📌 Matcherino pin envoyé !');
    }

    // 🎁 REWARDS
    if (commandName === 'rewards') {
      return interaction.reply('🎁 Reward ticket créé !');
    }

    // 🎟 TICKET
    if (commandName === 'ticket') {
      return interaction.reply('🎟 Ticket support créé !');
    }

    // 📦 ACCOUNT
    if (commandName === 'account') {
      const desc = interaction.options.getString('description');
      const price = interaction.options.getString('price');
      const trophies = interaction.options.getString('trophies');
      const image = interaction.options.getString('image');

      const embed = new EmbedBuilder()
        .setTitle('📦 Nouveau compte')
        .setDescription(desc)
        .addFields(
          { name: '💰 Prix', value: price, inline: true },
          { name: '🏆 Trophées', value: trophies, inline: true }
        )
        .setImage(image)
        .setColor(0x00AEFF);

      return interaction.reply({ embeds: [embed] });
    }

  } catch (err) {
    console.error(err);

    if (!interaction.replied && !interaction.deferred) {
      return interaction.reply({
        content: '❌ Une erreur est survenue',
        ephemeral: true
      });
    }
  }
});

client.login(process.env.TOKEN);