import { SlashCommandBuilder, PermissionsBitField, VoiceState} from "discord.js";

// MAKE SURE TO UPDATE SERVER_ID WITH SERVER YOU ARE USING BOT ON: STEPBROS- 496476981689581569 TEST-1178376839379566672 NEDBY-658558453668642826

export const data = new SlashCommandBuilder()
    .setName("rtu")
    .setDescription("rough them up")
    .addStringOption(option => 
        option
            .setName('user')
            .setDescription('mention user to rough up')
            .setRequired(true))
    .addStringOption(option =>
        option
            .setName('count')
            .setDescription('larger number the more roughed up they get')
            .setRequired(true));

// create a function that will handle any internation with this slash command
// using "export" allows us to use hello-world.js as a module
export async function execute(interaction, channels) {
   
    // check if user who used command has permission to send TTS messages  
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.MoveMembers)) {
        return await interaction.reply({content: 'you do not have permission to move people', ephemeral: true})
    }

    // check if user who used command is in a voice channel

    // get guildMember obj by interaction.members (the member objs have the guildMember obj in it)
    var guildMemberToRoughUp;

    // channels - is a map of all voice channels with their id and name
    // structure key = id => value = 'channel type' {}

    // var to track if specified user is in voice channel
    var user_real = false;

    // array to hold all ids of voice channels
    const voice_channel_ids = [];

    // get user arg
    const user_id = interaction.options.getString('user').replace(/[\\<>@#&!]/g, "");
    
    // get count arg
    var count = interaction.options.getString('count') ?? 5;

    //  current channel for user who used slash command
    const current_channel = interaction.member.voice.channel;

    
    if(!current_channel) {
        return await interaction.reply({content: 'please make sure you are in a voice channel', ephemeral: true})
    }

    // loop through entries map
    for (const [key, value] of current_channel.members.entries()) {
        if(value.user.id == user_id) {
            guildMemberToRoughUp = value;
            user_real = true;
            break;
        }
    }

    // check to see if specified user is in the discord server
    if(!user_real) {
        return await interaction.reply({content: 'the specified user does not exists in your current voice channel - make sure to join the voice channel they are in', ephemeral: true})
    }

    // get all channels in discord server
    for (const [key, value] of channels.entries()) {
        if(value.type == 2) {
            voice_channel_ids.push({"channel_id": key, "guild_id": value.guild.id})
        }
    }

    // rough em up
    //console.log(voice_channel_ids)

    while(count != 0) {
        const randomElement = voice_channel_ids[Math.floor(Math.random() * voice_channel_ids.length)].channel_id;
        guildMemberToRoughUp.voice.setChannel(randomElement)
        count--;
    }

    await interaction.reply({content: 'they have been roughed up..', ephemeral: true});

}