import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class BandsBandRoute extends Route {
  @service catalog;
  model(params) {
    return this.catalog.find('band', (band) => band.id === params.id);
  }
  /*Providing a lookup in our catalog by switching the data lookups from the model hook of roots */
}
