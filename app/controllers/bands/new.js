import Controller from '@ember/controller';
import { action } from '@ember/object';
import { dasherize } from '@ember/string';
import { tracked } from '@glimmer/tracking';
import Band from 'rarwe/models/band';
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
  @action
  saveBand() {
    let band = new Band({ name: this.name, id: dasherize(this.name) });
    this.catalog.add('band', band);
    this.router.transitionTo('bands.band.songs', band.id);
  }
  /*The way to get access to services in the app is to inject them (the verb "inject" refers to the underlying dependency injection mechanism).
   A common way to do this is to alias the imported "inject" function as "service". */
}
/*Right now, we're mutating the bands array */
