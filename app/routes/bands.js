import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class BandsRoute extends Route {
  @service catalog;
  /*This way we can now extract the relationships for each band
  Each relationship is under a nested key in the response below
  'relationships.<relationshipName>.link.related'

  What's happening underneath is the code is assigning each relationship
  link under the 'relationships' attribute of the Band model instances. Making 'songs'
  found at 'relationships.songs'
  */
  model() {
    return this.catalog.fetchAll('bands');
    /* REFACTOR, utilized the function fetchAll() created on the catalog*/
  }
  /*Now that we have armed the async to link to fetch data for the 'songs' relationship
we can now update the 'model' hook of the bands.band.songs route  */
}

/*Using REST conventions the list of bands needs to be retrieved
by starting ember with the proxy option, we launched Ember CLI that takes care of it
fetch returns a promise and the data in the response can be had by calling its json method
(which also returns a promise)*/
