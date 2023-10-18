import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class BandNavigationComponent extends Component {
  @service router;
  get isActive() {
    return {
      details: this.router.isActive('bands.band.details', this.args.band),
      songs: this.router.isActive('bands.band.songs', this.args.band),
    };
  }
}
/*We'll have to write some JavaScript so we need to create the backing class, too
We'll define a single isActive property that tells which link is active.
That means we can use isActive.details and isActive.songs in the component template*/
