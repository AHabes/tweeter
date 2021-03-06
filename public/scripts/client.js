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
  const  MAX_CHARS  =140;
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
      </div>
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
        const currentError = $('.parent-of-main').find('.error-long-tweet');
        if (currentError) {
          currentError.remove();
        }
        const error = $(`<div>
          Tweets can't be empty. A tweet should be 1-140 characters long.
        </div>`).addClass('error-empty-tweet');
        $('.textareaBottom').after(error);
        return false;

      } else if (tweetText.length > MAX_CHARS) {
        const currentError = $('.parent-of-main').find('.error-empty-tweet');
        if (currentError) {
          currentError.remove();
        }
        const error = $(`<div>
          The tweet is too long. A tweet should be 1-140 characters long.
        </div>`).addClass("error-long-tweet");
        $('.textareaBottom').after(error);
        return false;

      } else {
        $('.error-empty-tweet, .error-long-tweet').remove();
        $.post({
          type: "POST",
          url: form.attr('action'),
          data: form.serialize(),
        })
          .done(function() {
            $('output').text(MAX_CHARS)
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

  const collapseInputForm = function() {
    $(function() {
      const form = $('form');
      $('#collapseButton').on('click', function() {
        if (form.is(':hidden')) form.show();
        form.animate({
          'height': form.height() === 130 ? '0px' : '130px'
        }, 'slow', function() {
          if (form.height() === 0) form.hide();
        });
      });
    });
  };

  const displayArrowOnScroll = function() {
    $("span[href='#top']").on('click', function() {
      $("html, body").animate({scrollTop: 0}, "slow");
      return false;
    });

    $(document).scroll(function() {
      const y = $(this).scrollTop();
      if (y > 500) {
        $('.scrollUp').fadeIn();
      } else {
        $('.scrollUp').fadeOut();
      }
    });
  };

  displayArrowOnScroll();
  collapseInputForm();
  postTweets();
  loadTweets();
});
