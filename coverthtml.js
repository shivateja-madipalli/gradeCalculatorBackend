//convert cmpe 235 html to responsive web page
var read = require('node-readability');

read('http://www.openloop.com/education/classes/sjsu_engr/engr_mobile_dev/spring2016/index.php', function(err, article, meta) {
  // Main Article
  console.log('article content: '+article.content);
  // Title
  console.log('article title: ' + article.title);

  // HTML Source Code
  console.log('article html: ' + article.html);
  // DOM
  console.log('article html: ' + article.document);

  // Response Object from Request Lib
  console.log('Response Object from Request Lib: ' + meta);

  // Close article to clean up jsdom and prevent leaks
  article.close();
});