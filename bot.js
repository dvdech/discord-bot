// https://discordjs.guide/creating-your-bot/command-deployment.html#command-registration
// https://github.com/CodingTrain/Discord-Bot-Examples/blob/main/01-discordjs/README.md
// https://discord.com/developers/docs/reference
// https://discord.com/developers/applications

import { Client, Events, GatewayIntentBits, Guild } from 'discord.js';
import { config } from 'dotenv';

// ./ specifies its in the root directory
import * as hello from './commands/hello-world.js'
import * as tts from './commands/tts.js'
import * as rtu from './commands/rough-them-up.js'

// it will now place everything in .env into process.env as we can see in the console.log statement
config();

// authenticate and log into discord form the bot itself
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});


function readyDiscord() {
    console.log('discord bot is ready: ' + client.user.tag)
}

async function handleInteraction(interaction) {

    // check if the interaction that was passed in was actually a real command
    if (!interaction.isCommand()) {
        return;
    }

    // check command name and if it is hello-world from hello-world.js in commands folder
    // call the exectute function from the hello-world.js file
    // which will say hello-world
    // if(interaction.commandName === "hello-world") {
    //     await hello.execute(interaction);
    // } else if (interaction.commandName === 'tts') {
    //     await tts.execute(interaction);
    // } else 
    if(interaction.commandName == 'rtu') {
        const channels = client.channels.cache;
        await rtu.execute(interaction, channels)
    }

}

// client.once is for events that can only happen once
client.once(Events.ClientReady, readyDiscord)

// actually log in and activate the bot
client.login(process.env.TOKEN);

// client.on is for events that can happen more than once
client.on(Events.InteractionCreate, handleInteraction);