import EmberRouter from '@ember/routing/router';
import config from 'rarwe/config/environment';

/* First, we import the configuration from rarwe/config/environment
which is the module created from the config/environment.js module via a relative import.
*/

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}
/* Let's generate two routes in our application,
one to display bands and another one to list songs.
*/
/* Next, we want to reflect the relation to the songs by the bands they belong to
in the URL. Nesting the routes at each level to create an accumulated path.
 */
/* So far this is what we see
  • / (the top-level, implicit, index route)
  • /bands (stepping down to the bands route)
  • /bands/songs (descending to the bands and then the songs route)
*/

/* Router.map(function () {
  this.route('bands', function () {
    this.route('songs');
  });
}); */

/* With this in place, the following paths are all mapped:
  •/
  • /bands
  • /bands/pearl-jam
  • /bands/led-zeppelin
  • /bands/pearl-jam/songs
  • /bands/led-zeppelin/songs
*/
/*
  Router.map(function () {
    this.route('bands', function () {
      this.route('band', { path: ':id' }, function () {
        this.route('songs');
      });
    });
  });
*/
/*The path option tells Ember's router what URL path to generate for that route.
By default, path is the route's name so this.route('bands')
is the same as this.route('bands', { path: 'bands' }, only shorter.
 */

Router.map(function () {
  this.route('bands', function () {
    this.route('band', { path: ':id' }, function () {
      this.route('songs');
    });
    this.route('new');
  });
});
