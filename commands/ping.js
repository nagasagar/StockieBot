// Test example
async function execute(message) {
  await message.channel.send("pong!").catch(console.error);
}
module.exports.execute = execute;