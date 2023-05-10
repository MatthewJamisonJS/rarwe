import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { Song } from 'rarwe/routes/bands';

export default class BandsBandSongsController extends Controller {
  @tracked showAddSong = true;
  @tracked title = '';
  /* the {action} decorator correctly binds the context of the template to the backing class.
  It makes sure that when we use this.saveSong in the template, it refers to the instance in the
  controller.*/

  get hasNoTitle() {
    return !this.title;
  }

  @action
  updateTitle(event) {
    this.title = event.target.value;
  }
  @action
  saveSong() {
    /*the default implementation of the model hook is to return the model of the parent route.
  Since we need the band as the model, that suits us perfectly. Now, to adjust the controller
  and template */
    // let song = new Song({ title: this.title, band: this.band });
    // this.band.songs = [...this.band.songs, song];
    let song = new Song({ title: this.title, band: this.model });
    this.model.songs = [...this.model.songs, song];

    this.title = '';
    this.showAddSong = true;
  }
  @action
  cancel() {
    this.title = '';
    this.showAddSong = true;
  }
}
