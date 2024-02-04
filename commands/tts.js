import { SlashCommandBuilder, PermissionsBitField} from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("tts")
    .setDescription("tts on string")
    .addStringOption(option => 
        option
            .setName('message')
            .setDescription('message for tts')
            .setRequired(true));

export async function execute(interaction) {

    // check if user who used command has permission to send TTS messages  
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.SendTTSMessages)) {
        return await interaction.reply({content: 'you do not have permission to use tts', ephemeral: true})
    }

    // makes it so the user who initiaed the command is the only one to see the msg ephemeral: true
    const msg = interaction.options.getString('message') ?? 'No input was provided';
    await interaction.reply({content: msg, tts:true});

}