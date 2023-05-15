import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class BandsBandSongsRoute extends Route {
  @service catalog;

  async model() {
    let band = this.modelFor('bands.band');
    // let url = band.relationships.songs;
    // let response = await fetch(url);
    // let json = await response.json();
    // let songs = [];
    // for (let item of json.data) {
    //   let { id, attributes, relationships } = item;
    //   let rels = {};
    //   for (let relationshipName in relationships) {
    //     rels[relationshipName] = relationships[relationshipName].links.related;
    //   }
    //   let song = new Song({ id, ...attributes }, rels);
    //   songs.push(song);
    //   this.catalog.add('song', song);
    // }
    // band.songs = songs;
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
