console.log('composer-char-counter.js');

const MAX_CHARS = 140;
const callback = function() {
  const remainingChars = MAX_CHARS - $(this).val().length;

  $(this).parent().siblings().find('output').text(remainingChars).css('color', '');

  if (remainingChars < 0) {
    $(this).parent().siblings().find('output').css('color', 'red');
  }
};
$(document).ready(function() {
  $('#tweet-text').on('input', callback);
});