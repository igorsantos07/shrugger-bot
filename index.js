var Bot = require('node-telegram-bot-api')
var bot

if (process.env.NODE_ENV == 'production') {
	bot = new Bot(process.env.BOT_TOKEN, { webHook: { port: process.env.PORT }});
	bot.setWebHook(process.env.HOST+':443/bot'+bot.token)
} else {
	bot = new Bot(process.env.BOT_TOKEN, { polling: true });
}
console.log(bot.options)

bot.onText(/^\/start$/, function(msg) {
	bot.sendMessage(msg.from.id, 'Sorry, there\'s not much I can to for you here. Use me inline, like:\n@shruggerbot I don\'t care\nOr get details about me through /about')
})

bot.onText(/^\/help$/, function(msg) {
	bot.sendMessage(msg.from.id, 'Simply use me inline, like: @shruggerbot I don\'t care\nYou can also get details about me on /about')
})

bot.onText(/^\/about$/, function(msg) {
	bot.sendMessage(msg.from.id,
		'*Bot creator*: @igorsantos07\n'+
		'*Source code*: [shrugger-bot@github](https://github.com/igorsantos07/shrugger-bot)\n'+
		'This bot was inspired by the [shrug command](https://get.slack.help/hc/en-us/articles/201259356-Using-slash-commands) from [Slack](https://slack.com)'
	, { parse_mode: 'Markdown' })
})

bot.on('inline_query', function(msg) {
	var shrug = '¯\\_(ツ)_/¯'
	var options = [];
	if (msg.query) {
		options = [
			{
				type: 'article',
				id: 'before',
				title: shrug+' '+msg.query,
				message_text: shrug+' '+msg.query,
				description: 'Shrug first'
			},
			{
				type: 'article',
				id: 'after',
				title: msg.query+' '+shrug,
				message_text: msg.query+' '+shrug,
				description: 'Surprise shrug at the end'
			}
		]
	} else {
		options = [{
			type: 'article',
			id: 'lonely',
			title: shrug,
			message_text: shrug,
			description: 'Lazy shrug'
		}]
	}

	bot.answerInlineQuery(msg.id, options)
})

console.log(bot.textRegexpCallbacks)
console.log(bot.onReplyToMessages)