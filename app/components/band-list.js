import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class BandListComponent extends Component {
  @service router;
  get bands() {
    return this.args.bands.map((band) => {
      return { band, isActive: this.router.isActive('bands.band', band) };
    });
  }
}
/*The idea is to augment each band item in the list with an isActive property
This way, each item will have access both to the band itself (via the band property)
and whether it's the active route*/
