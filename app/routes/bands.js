import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';

/*define a model method (commonly known as the model hook) on your route
and Ember makes the value you return from this method available to the template as @model.
*/

class Band {
  @tracked name;
  constructor(name) {
    this.name = name;
  }
}
export default class BandsRoute extends Route {
  model() {
    return [
      { name: 'Led Zeppelin' },
      { name: 'Pearl Jam' },
      { name: 'Foo Fighters' },
    ];
  }
}
