import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class BandsNewController extends Controller {
  @service catalog;
  @service router;

  @tracked name;

  get hasNoName() {
    return !this.name;
  }
  @action
  updateName(event) {
    this.name = event.target.value;
  }
  /*JSON:API demands that create requests specify the JSON:API media type, 'application/vnd.api+json'
  and that the payload be a JSON:API representation of the resource to be created. Other than that,
  the code is really similar to how we extracted client-side records when we fetched all bands.

  This is a hint of a possible refactoring to clear things up.
  */
  /*We're changing the save function since we added the create function in the catalog*/
  @action
  async saveBand() {
    let band = await this.catalog.create('band', { name: this.name });
    this.router.transitionTo('bands.band.songs', band.id);
  }
  // @action
  // async saveBand() {
  //   let response = await fetch('/bands', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/vnd.api+json',
  //     },
  //     body: JSON.stringify({
  //       data: {
  //         type: 'bands',
  //         attributes: {
  //           name: this.name,
  //         },
  //       },
  //     }),
  //   });
  //   let json = await response.json();
  //   let { id, attributes } = json.data;
  //   let record = new Band({ id, ...attributes });
  //   this.catalog.add('band', record);
  //   this.router.transitionTo('bands.band.songs', id);
  // }
  /*We already established that the URL that represents the collection of bands is /bands
  So, we know we need to send a POST request there*/

  /*One thing to notice is that creating the id of the band has now become
the responsibility of the back-end: the response contains a top-level 'id' and the 'attributes.'
[It's by putting these two together that we can create our Band object.]*/
}
