import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import fetch from 'fetch';

export default class BandsBandSongsController extends Controller {
  @tracked showAddSong = true;
  @tracked title = '';
  @service catalog;

  get hasNoTitle() {
    return !this.title;
  }

  @action
  updateTitle(event) {
    this.title = event.target.value;
  }

  @action
  async saveSong() {
    let song = await this.catalog.create(
      'song',
      { title: this.title },
      { band: { data: { id: this.model.id, type: 'bands' } } }
    );
  }

  /*We refactored the below action to utilize the function in catalog.create*/
  // @action
  // async saveSong() {
  //   let payload = {
  //     data: {
  //       type: 'songs',
  //       attributes: { title: this.title },
  //       relationships: {
  //         band: {
  //           data: {
  //             id: this.model.id,
  //             type: 'bands',
  //           },
  //         },
  //       },
  //     },
  //   };
  //   let response = await fetch('/songs', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/vnd.api+json' },
  //     body: JSON.stringify(payload),
  //   });
  //   let json = await response.json();
  //   let { id, attributes, relationships } = json.data;
  //   let rels = {};
  //   for (let relationshipName in relationships) {
  //     rels[relationshipName] = relationships[relationshipName].links.related;
  //   }
  //   let song = new Song({ id, ...attributes }, rels);
  //   this.catalog.add('song', song);
  //   this.model.songs = [...this.model.songs, song];
  //   this.title = '';
  //   this.showAddSong = true;
  // }
  /*Resembles the same thing we did in controllers/band/new.js
   We are creating a proper band relationship from the start.

   We are doing what's called "resource linkage" (JSON:API vocab) by
  specifying the id and type.

  We know that since we duplicated a lot of code throughout that we will be refactoring
  soon. But let's convert back-end operations of updating song ratings first. We're going
  to do this by writing an action handler function
   */

  /*In similar fashion, we created an updateRating method on the service catalog. We are refactoring
  the code below to utilize these changes*/
  @action
  async updateRating(song, rating) {
    song.rating = rating;
    this.catalog.update('song', song, { rating });
    // let payload = {
    //   data: {
    //     id: song.id,
    //     type: 'songs',
    //     attributes: {
    //       rating,
    //     },
    //   },
    // };
    // await fetch(`/songs/${song.id}`, {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/vnd.api+json',
    //   },
    //   body: JSON.stringify(payload),
    // });
  }
  @action
  cancel() {
    this.title = '';
    this.showAddSong = true;
  }
}
