var SlackBot = require('slackbots');
var axios = require('axios');
var fs = require('fs');
var express = require('express');

var channel = 'bots_setup'; //channel to post to 
var subreddit = ['ProgrammerHumor', 'me_irl']; //subreddits to scrape from add


//communication with heroku 
var port = process.env.PORT || 3000;        
var app = express();
app.get('/', function (req, res) {
 res.send('Running...');
});
app.listen(port, function () {

 });

var bot = new SlackBot({
    token: 'xoxb-85202238740-456015486690-dP7EbMbojSXQD04IBsxpBk83', //change token based on workspace 
    name: 'memebot' //name chosen in bot setup in workspace

});


bot.on('start', () => {
    //bot.postMessageToChannel('bots_setup', 'memebot online');    
});

bot.on('message', data => {
    //console.log(data.type);
    if (data.type == 'message')
    {
        console.log(data.text);
        if (data.text.includes("<@UDE0FEALA")) //if the bots tag is mentioned in the chat (id: may change based on workspace)
        {
            getMeme();
        }
    
    }
});

function selectSubreddit()
{
    var subreddit_index = Math.floor(Math.random()*((subreddit.length-1)-0+1)+0);
    return subreddit[subreddit_index];
}



function getMeme()
{
   axios.get('https://www.reddit.com/r/' + selectSubreddit(subreddit) + '/top/.json') //works with any subreddit
    .then(res => { 
        
        var post_index = Math.floor(Math.random()*(10-0+1)+0); //get a random post index from the top 10 on the page
        var title = res.data.data.children[post_index].data.title;
        bot.postMessageToChannel(channel, title);
        
        var meme = res.data.data.children[post_index].data.url;  
        if (meme.includes("imgur"))     
        {
            meme += ".jpg"  //imgur links dont go directly to a file so we can try to append .jpg
        }
        bot.postMessageToChannel(channel, meme);

    });

}
