import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { capitalize } from 'rarwe/helpers/capitalize';

export default class BandsBandSongsController extends Controller {
  @tracked showAddSong = true;
  @tracked title = '';
  @tracked sortBy = 'title';
  @tracked searchTerm = '';

  get hasNoTitle() {
    return !this.title;
  }

  @service catalog;

  get newSongPlaceholder() {
    let bandName = this.model.name;
    return `New ${capitalize([bandName])} song`;
  }

  get matchingSongs() {
    let searchTerm = this.searchTerm.toLowerCase();
    return this.model.songs.filter((song) => {
      return song.title.toLowerCase().includes(searchTerm);
    });
  }

  /*Defining a sortedSongs property that will hold the sorted list of songs derived from this.model.songs
   */

  get sortedSongs() {
    let sortBy = this.sortBy;
    let isDescendingSort = false;
    if (sortBy.charAt(0) === '-') {
      sortBy = this.sortBy.slice(1);
      isDescendingSort = true;
    }

    return this.matchingSongs.sort((song1, song2) => {
      if (song1[sortBy] < song2[sortBy]) {
        return isDescendingSort ? 1 : -1;
      }
      if (song1[sortBy] > song2[sortBy]) {
        return isDescendingSort ? -1 : 1;
      }
      return 0;
    });
  }

  /*The sort function in JavaScript takes a "compare" function. If the first item is smaller, it needs to return a negative value.
  If the second, a positive value. If they are equal, zero. Also, sort mutates the array it's called on, so to be safe,
  we make a copy. (It also returns the sorted array.)*/

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

  @action
  updateSearchTerm(event) {
    this.searchTerm = event.target.value;
  }

  @action
  async updateRating(song, rating) {
    song.rating = rating;
    this.catalog.update('song', song, { rating });
  }
  @action
  cancel() {
    this.title = '';
    this.showAddSong = true;
  }
}
