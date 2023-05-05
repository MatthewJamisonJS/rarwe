import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';

/*define a model method (commonly known as the model hook) on your route
and Ember makes the value you return from this method available to the template as @model.
*/

/* Part 4 {Nested Routes} adapting the code to the relationship between bands and songs */

class Band {
  @tracked name;
  constructor({ id, name, songs }) {
    this.id = id;
    this.name = name;
    this.songs = songs;
  }
}
/* Defining the classes of Song & Band */
class Song {
  constructor({ title, rating, band }) {
    this.title = title;
    this.rating = rating ?? 0;
    this.band = band;
  }
}
/* updating the data that is to be exported for bands & songs */
export default class BandsRoute extends Route {
  model() {
    let blackDog = new Song({
      title: 'Black Dog',
      band: 'Led Zeppelin',
      rating: 3,
    });
    let yellowLedbetter = new Song({
      title: 'Yellow Ledbetter',
      band: 'Pearl Jam',
      rating: 4,
    });
    let pretender = new Song({
      title: 'The Pretender',
      band: 'Foo Fighters',
      rating: 2,
    });
    let daughter = new Song({
      title: 'Daughter',
      band: 'Pearl Jam',
      rating: 5,
    });
    let ledZeppelin = new Band({
      id: 'led-zeppelin',
      name: 'Led Zeppelin',
      songs: [blackDog],
    });
    let pearlJam = new Band({
      id: 'pearl-jam',
      name: 'Pearl Jam',
      songs: [yellowLedbetter, daughter],
    });
    let fooFighters = new Band({
      id: 'foo-fighters',
      name: 'Foo Fighters',
      songs: [pretender],
    });
    return [ledZeppelin, pearlJam, fooFighters];
  }
}
