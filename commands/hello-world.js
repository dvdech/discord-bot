import { SlashCommandBuilder } from "discord.js";

// create slash command builder to handle our 'hello-world' slash command

// need to use specific var names of 'data' and 'execute' because the deploy code in deploy-commands.js is looking for those var names specifically line 17 in deploy-commands.js

export const data = new SlashCommandBuilder()
    .setName("hello-world")
    .setDescription("hello-world test");

// create a function that will handle any internation with this slash command
// using "export" allows us to use hello-world.js as a module
export async function execute(interaction) {
    await interaction.reply("hello-world");
}