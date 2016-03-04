var Bot = require('node-telegram-bot-api')
var bot = new Bot(process.env.BOT_TOKEN, (process.env.NODE_ENV == 'production')?
	{ webHook: { host: 'localhost', port: process.env.PORT }} :
	{ polling: true }
)
console.log(bot)

bot.onText(/\/start/, function(msg) {
	bot.sendMessage(msg.from.id, 'Sorry, there\'s nothing I can to for you here. Use me inline, like:\n@shruggerbot I don\'t care')
})

bot.onText(/\/help/, function(msg) {
	bot.sendMessage(msg.from.id, 'Simply use me inline, like: @shruggerbot I don\'t care')
})

bot.on('inline_query', function(msg) {
	var shrug = '¯\\_(ツ)_/¯'
	var options = [];
	if (msg.query) {
		options = [
			{
				type: 'article',
				id: msg.id+1,
				title: shrug+' '+msg.query,
				message_text: shrug+' '+msg.query,
				description: 'Shrug first'
			},
			{
				type: 'article',
				id: msg.id+2,
				title: msg.query+' '+shrug,
				message_text: msg.query+' '+shrug,
				description: 'Surprise shrug at the end'
			}
		]
	} else {
		options = [{
			type: 'article',
			id: msg.id+3,
			title: shrug,
			message_text: shrug,
			description: 'Lazy shrug'
		}]
	}

	bot.answerInlineQuery(msg.id, options)
})