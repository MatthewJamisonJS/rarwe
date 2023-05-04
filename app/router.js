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
Router.map(function () {
  this.route('bands');
  this.route('songs');
});
