const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Help'),
  async execute(interaction) {
    await interaction.reply('Use /trocar_cor, selecione a opção cor e escreva um dos cargos de cor disponíveis (Verde, Laranja, Vermelho, Azul, Roxo, Rosa).');
  },
};