import Component from '@glimmer/component';

export default class StarRatingComponent extends Component {
  get maxRating() {
    return this.args.maxRating ?? 5;
  }
  /*In the stars getter, each array item (representing a star) has a rating
  (going from 1 to maxRating) and a full property to decide whether the star
  should be drawn full or empty. */
  get stars() {
    let stars = [];
    for (let i = 1; i <= this.maxRating; i++) {
      stars.push({
        rating: i,
        full: i <= this.args.rating,
      });
    }
    return stars;
  }
}
