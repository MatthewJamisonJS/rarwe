import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class BandsBandRoute extends Route {
  @service catalog;
  // @service router;

  model(params) {
    return this.catalog.find('band', (band) => band.id === params.id);
  }
  /*Providing a lookup in our catalog by switching the data lookups from the model hook of roots */
  /*   redirect(band) {
    if (band.description) {
      this.router.transitionTo('bands.band.details');
    } else {
      this.router.transitionTo('bands.band.songs');
    }
  }
  /*Making the redirection in bands.band route based on whether the band has a description or not

  However, we changed this because the way we set up the LinkTo(<LinkTo @route="bands.band") in the HBS
  will make ember transition from bands.band.details to bands.band.index
  But, since we don't need this transition to pass by the common parent route bands.band to complete
  the transition, the redirect code we wrote is not executed.
  
  so we generated bands/band/index in route and cut the commented code out and pasted there.*/
}
