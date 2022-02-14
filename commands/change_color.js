const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('trocar_cor')
    .setDescription('Muda sua role para que você tenha uma nova cor para seu nick')
    .addStringOption(option => option.setName('cor').setDescription('Cor para usar no nick.').setRequired(true)),
  async execute(interaction) {
    let color_role_dict = {
      'verde': '942609589185163284',
      'laranja': '942610154287943710',
      'vermelho': '942610243702116372',
      'azul': '942610339038638101',
      'roxo': '942610438171033631',
      'rosa': '942610517804072980',
    }

    let color = interaction.options.getString('cor').toLowerCase();

    if (!color_role_dict[color]) {
      interaction.reply('Escolha uma cor válida.');
      return;
    }

    let userRoles = interaction.member['_roles'];
    let colorRoles = Object.values(color_role_dict);

    let repeatedRoles = [];

    colorRoles.forEach(colorRole => {
      let isAnyValidRoleInUserRoles = userRoles.find(userRole => userRole == colorRole);
      if (isAnyValidRoleInUserRoles) {
        repeatedRoles.push(colorRole);
      }
    });

    userRoles = interaction.member.roles;

    repeatedRoles.forEach(repeated => {
      userRoles.remove(repeated);
    });

    userRoles.add(color_role_dict[color]);
    interaction.reply('Cor trocada.');
  },
};