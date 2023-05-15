import { tracked } from '@glimmer/tracking';

export default class Band {
  @tracked name;
  @tracked songs;
  constructor({ id, name, songs }, relationships = {}) {
    this.id = id;
    this.name = name;
    this.songs = songs || [];
    this.relationships = relationships;
  }
}
/*In order to have each band's songs properly loaded to render the 'songs' template,
it makes sense to add that to the 'bands.band.songs' route.

Which is why we are adding 'relationships' to the constructor for the band model.
we need to stor the relationship link for each band when we create them.
This way, we can load the data for the related relationship when we need to by fetching the data
from the stored URL*/
