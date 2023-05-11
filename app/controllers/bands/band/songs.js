import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Song from 'rarwe/models/song';
import { service } from '@ember/service';

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
  saveSong() {
    let song = new Song({ title: this.title, band: this.model });
    this.model.songs = [...this.model.songs, song];
    this.catalog.add('song', song);
    this.title = '';
    this.showAddSong = true;
  }
  @action
  cancel() {
    this.title = '';
    this.showAddSong = true;
  }
}
