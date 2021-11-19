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

$(document).ready(function() {
  const createTweetElement = function(tweetData) {
    const tweet = $(`<article class="tweet">
                <header>
                    <div class="user-details-container">
                        <img class="userImage" src=${tweetData.user.avatars}>
                        <span class="name">${tweetData.user.name}</span>
                    </div>
                    <span class="username">${tweetData.user.handle}</span>
                </header>
                <!-- Tweet text goes here-->
                <footer>
                    <span class="date">${timeago.format(tweetData.created_at)}</span>
                    <div class="media-icons">
                        <span> <i class="fas fa-flag"></i></span>
                        <span> <i class="fas fa-retweet"></i></span>
                        <span> <i class="far fa-heart"></i></span>
                    </div>
                </footer>
            </article>`);

    const userText = $("<p>").text(tweetData.content.text).addClass("tweet-text");
    tweet.find('header').after(userText);
    return tweet;
  };

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  };

  const postTweets = function() {
    const form = $("form");
    form.submit(function(e) {
      const tweetText = $('#tweet-text').val();
      if (tweetText === "" || tweetText === null) {
        alert('There is a problem with the tweet content.');
        return false;
      } else if (tweetText.length > MAX_CHARS) {
        alert(`Tweets should be ${MAX_CHARS} long!`);
        return false;
      } else {
        $.post({
          type: "POST",
          url: form.attr('action'),
          data: form.serialize(),
        })
          .done(function() {
            $.ajax({
              url: "/tweets",
              type: 'GET',
              dataType: 'json',
            }).done(function(res) {
              const currentTweet = res[res.length - 1];
              const $tweet = createTweetElement(currentTweet);
              $('#tweets-container').prepend($tweet);
            });
            form.trigger("reset");
          })
          .fail(function() {
            console.log(`An error occurred.`);
          });
        e.preventDefault();
      }
    });
  };

  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      type: 'GET',
      dataType: 'json',
      success: function(res) {
        renderTweets(res);
      }
    });
  };

  postTweets();
  loadTweets();
});
