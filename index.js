require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Bot is online!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

const STOCKIE_PREFIX = process.env.STOCKIE_PREFIX;
const WATCHIE_PREFIX = process.env.WATCHIE_PREFIX;

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) { // Setup each command for client
  const command = require(`./commands/${file}`);
  client.commands.set(file.split('.').slice(0, -1).join('.'), command);
}

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
});


client.on('message', async msg => {
  const content = msg.content;
  const parts = content.split(' ');
  if (content === 'ping!') {
    await client.commands.get('ping').execute(msg);
    return;
  }
  if (parts[0] === STOCKIE_PREFIX || parts[0] === WATCHIE_PREFIX) {
    if (parts.length === 1) {
      msg.reply("Hey There!! i am online!");
    } else if (parts[1] === 'help') {
      await client.commands.get('help').executeStockieHelp(msg);
    }
    else if (parts[1] === 'get') {
      if (parts[2] === 'help') {
        await client.commands.get('get').help(msg);
      } else if (parts[2] != null) {
        await client.commands.get('get').execute(msg, parts[2]);
      } else {
        await client.commands.get('get').help(msg);
      }
    }
    else if (parts[1] === 'add') {
      if (parts[2] === 'help') {
        await client.commands.get('add').help(msg);
      } else if (parts[2] != null && parts[3] != null && parts[4] != null) {
        await client.commands.get('add').execute(msg, parts[2], parseFloat(parts[3]), parseFloat(parts[4]));
      } else {
        await client.commands.get('add').help(msg);
      }
    }
    else if (parts[1] === 'edit') {
      if (parts[2] === 'help') {
        await client.commands.get('edit').help(msg);
      } else if (parts[2] != null && parts[3] != null && parts[4] != null) {
        await client.commands.get('edit').execute(msg, parts[2], parseFloat(parts[3]), parseFloat(parts[4]));
      } else {
        await client.commands.get('edit').help(msg);
      }
    }
    else if (parts[1] === 'list') {
      if (parts[2] === 'help') {
        await client.commands.get('list').help(msg);
      } else if (parts[2] != null) {
        await client.commands.get('list').execute(msg, parseInt(parts[2]));
      } else {
        await client.commands.get('list').help(msg);
      }
    }
    else if (parts[1] === 'remove') {
      if (parts[2] === 'help') {
        await client.commands.get('remove').help(msg);
      } else if (parts[2] != null) {
        client.commands.get('remove').execute(msg, parts[2]);
      } else {
        await client.commands.get('remove').help(msg);
      }
      
    }
    else if (parts[1] === 'status') {
      if (parts[2] === 'help') {
        await client.commands.get('status').help(msg);
      } else if (parts[2] != null && parts[3] != null) {
        client.commands.get('status').execute(msg, parts[2], parts[3]);
      } else {
        await client.commands.get('status').help(msg);
      }
      
    }
    else if (parts[1] === 'suggestor') {
      if (parts[2] === 'help') {
        await client.commands.get('suggestor').help(msg);
      } else if (parts[2] != null && parts[3] != null) {
        client.commands.get('suggestor').execute(msg, parts[2], parts[3]);
      } else {
        await client.commands.get('suggestor').help(msg);
      }
      
    }
    else if (parts[1] === 'note') {
      if (parts[2] === 'help') {
        await client.commands.get('note').help(msg);
      } else if (parts[2] != null && parts[3] != null) {
        client.commands.get('note').execute(msg, parts[2], parts[3]);
      } else {
        await client.commands.get('note').help(msg);
      }
      
    }
  } else {
    return;
  }
})

client.login(process.env.BOT_TOKEN)