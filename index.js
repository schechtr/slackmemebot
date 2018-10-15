const SlackBot = require('slackbots');
const axios = require('axios');
const fs = require('fs');


var bot = new SlackBot({
    token: 'xoxb-451879041059-452016292354-nBs4wDMAlzFiu84vb3oD5TMU', //change token based on workspace 
    name: 'memebot' //name chosen at bot setup in workspace

});


bot.on('start', () => {
    bot.postMessageToChannel('1_memes', 'memebot online');    
});

bot.on('message', data => {
    //console.log(data.type);
    if (data.type == 'message')
    {
        console.log(data.text);
        if (data.text.includes("<@UDA0G8LAE")) //if user mentions the bot 
        {
            getMeme();
        }
    }
});


function getMeme()
{
   axios.get('https://www.reddit.com/r/ProgrammerHumor/top/.json') //works with any subreddit
    .then(res => { 
        
        var post_index = Math.floor(Math.random()*(10-0+1)+0); //get a random post index from the top 10
        var title = res.data.data.children[post_index].data.title;
        bot.postMessageToChannel('1_memes', title);
        
        var meme = res.data.data.children[post_index].data.url;  
        if (meme.includes("imgur"))     
        {
            meme += ".jpg"  //imgur links dont go directly to a file so we append .jpg
        }
        bot.postMessageToChannel('1_memes', meme);

    });

}
