async function replyToMessage(msg, text) {
    await msg.reply(text).catch(console.error);
}
async function respondToChannel(msg, text) {
    await msg.channel.send(">>> " + text).catch(console.error);
}


module.exports.replyToMessage = replyToMessage;
module.exports.respondToChannel = respondToChannel;
