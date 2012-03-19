/**
* Copyright 2012 Facebook, Inc.
*
* You are hereby granted a non-exclusive, worldwide, royalty-free license to
* use, copy, modify, and distribute this software in source code or binary
* form for use in connection with the web services and APIs provided by
* Facebook.
*
* As with any software that integrates with the Facebook platform, your use
* of this software is subject to the Facebook Developer Principles and
* Policies [http://developers.facebook.com/policy/]. This copyright notice
* shall be included in all copies or substantial portions of the software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
* THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
* DEALINGS IN THE SOFTWARE.
*/

var express = require('express');

var app = express.createServer(express.logger());

var appid = 294113397324835;

var dishes = {
  'lasagne': {
    'title': 'Lasagne',
    'description': 'A beef dish made with wide and flat pasta.',
    'image': 'http://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Lasagne_-_stonesoup.jpg/220px-Lasagne_-_stonesoup.jpg',
    'ingredients': ['beef', 'pasta']
  },
  'pizza': {
    'title': 'Pizza',
    'description': 'An oven-baked, flat, round bread typically topped with a tomato sauce, cheese and various toppings.',
    'image': 'http://upload.wikimedia.org/wikipedia/commons/thumb/8/88/HotPizza.jpg/220px-HotPizza.jpg',
    'ingredients': ['beef', 'tomato', 'cheese']
  },
  'beef_curry': {
    'title': 'Beef Curry',
    'description': 'A meat dish featuring the incorporation of complex combinations of spices and herbs.',
    'image': 'http://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Thai_Village_-_Dinner.jpg/260px-Thai_Village_-_Dinner.jpg',
    'ingredients': ['beef', 'potato']
  }
};

var ingredients = {
  'beef': {
    'title': 'Beef',
    'description': 'Meat from a cow.',
    'image': 'http://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/US_Beef_cuts.svg/400px-US_Beef_cuts.svg.png'
  },
  'pasta': {
    'title': 'Pasta',
    'description': 'A staple food of traditional Italian cuisine, now of worldwide renown.',
    'image': 'http://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Pasta_2006_5.jpg/120px-Pasta_2006_5.jpg'
  },
  'tomato': {
    'title': 'Tomato',
    'description': 'A round, red fruit.',
    'image': 'http://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Bright_red_tomato_and_cross_section02.jpg/250px-Bright_red_tomato_and_cross_section02.jpg'
  },
  'cheese': {
    'title': 'Cheese',
    'description': 'A generic term for a diverse group of milk-based food products.',
    'image': 'http://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Cheese_platter.jpg/300px-Cheese_platter.jpg'
  },
  'potato': {
    'title': 'Potato',
    'description': 'A starchy, tuberous crop.',
    'image': 'http://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Patates.jpg/220px-Patates.jpg'
  }
};

var objectUrl = function (type, object) {
  return 'https://cookline.herokuapp.com/' + type + '/' + object
}

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set('view options', {
    layout: false
  });
  app.helpers({
    objectUrl: objectUrl
  });
});

app.get('/', function(request, response) {
  response.send('Welcome to CookLine!');
});

app.get('/dish/:dish', function(request, response) {
  var dish = dishes[request.params.dish];
  if (dish) {
    dish.type = 'cookline:dish'
    dish.url = objectUrl('dish', request.params.dish);
    dish.dishes = dishes;
    dish.appid = appid;
    response.render('object', dish)
  } else {
    response.send(404);
  }
});

app.get('/ingredient/:ingredient', function(request, response) {
  var ingredient = ingredients[request.params.ingredient];
  if (ingredient) {
    ingredient.type = 'cookline:ingredient'
    ingredient.url = objectUrl('ingredient', request.params.ingredient);
    ingredient.ingredients = null;
    ingredient.dishes = dishes;
    dish.appid = appid;
    response.render('object', ingredient)
  } else {
    response.send(404);
  }
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
