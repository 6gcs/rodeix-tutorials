module.exports = {
    name: 'hi',
    description: 'امر يرسل pong',
    execute(message, args, client){
        message.delete()
        message.reply(`Hello ${message.author}`)
    }
}