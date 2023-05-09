import Route from '@ember/routing/route';

export default class BandsBandRoute extends Route {
  model(params) {
    // This route was generated with a dynamic segment. Implement data loading
    // based on that dynamic segment here in the model hook.
    // return params;

    /* {Pt. 4 Nested Routing} Since we want the individual band information
    to populate once they're selected */

    /* modelFor fetches the model of a parent route that had already been activated. */
    /* find() returns the value of the first element that passes a test
    - (band) => band.id === params.id  [passes the band id that matches params.id into (band)]
    */

    let bands = this.modelFor('bands');
    return bands.find((band) => band.id === params.id);
  }
}
// FIXED ROUTING ISSUE/ERROR
