import Route from '@ember/routing/route';
import { service } from '@ember/service';
// import wait from 'rarwe/utils/wait'; Deleting this since we want the wait function to simulate
//network latency

export default class BandsBandSongsRoute extends Route {
  @service catalog;
  queryParams = {
    sortBy: {
      as: 's',
    },
    searchTerm: {
      as: 'q',
    },
  };

  async model() {
    let band = this.modelFor('bands.band');
    await this.catalog.fetchRelated(band, 'songs');
    return band;
  }
  /* This queries the url to retrieve the songs

  *UPDATE - we updated the model to utilize the fetchRelated method from the catalog
  service.

    */

  resetController(controller) {
    controller.title = '';
    controller.showAddSong = true;
  }
}
