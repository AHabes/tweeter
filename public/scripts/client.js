/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const createTweetElement = function(tweetData) {
  return $(`<article class="tweet">
                <header>
                    <div class="user-details-container">
                        <img class="userImage" src=${tweetData.user.avatars}>
                        <span class="name">${tweetData.user.name}</span>
                    </div>
                    <span class="username">${tweetData.user.handle}</span>
                </header>
                <p>
                    ${tweetData.content.text}
                </p>
                <footer>
                    <span class="date">${timeago.format(tweetData.created_at)}</span>
                    <div class="media-icons">
                        <span> <i class="fas fa-flag"></i></span>
                        <span> <i class="fas fa-retweet"></i></span>
                        <span> <i class="far fa-heart"></i></span>
                    </div>
                </footer>
            </article>`);
};

const renderTweets = function(tweets) {
  $(document).ready(function() {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
  });
};

const postTweets = function() {
  $(document).ready(function() {
    const form = $("form");
    form.submit(function(e) {
      e.preventDefault();
      $.ajax({
        type: form.attr('method'),
        url: form.attr('action'),
        data: form.serialize(),
      }).done(function() {
        console.log('The tweet has been posted.');
      })
        .fail(function() {
          console.log(`An error occurred.`);
        });
    });
  });
};

renderTweets(data);
postTweets();

