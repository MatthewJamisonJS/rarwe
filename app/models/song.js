import { tracked } from '@glimmer/tracking';

export default class Song {
  @tracked rating;

  constructor({ id, title, rating, band }, relationships = {}) {
    this.id = id;
    this.title = title;
    this.rating = rating ?? 0;
    this.band = band;
    this.relationships = relationships;
  }
}
/*Enhancing the Song class to take an id and relationships */
/*Now, we add the rating to be tracked so that the updateRating function would work
 */
