import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class BandsNewController extends Controller {
  @service catalog;
  @service router;

  @tracked name;

  get hasNoName() {
    return !this.name;
  }
  /*router.transitionTo implicitly cancels the current transition (if there's one) and starts a new one.
So in our case, the clicking of the band link initiates a transition from bands.new to bands.band.index
and then the router.transitionTo aborts that one and starts one from bands.new to bands.band.songs
(or bands.band.details, depending on the band). That's why the confirm dialog is brought up twice.
Let's add some code to make sure confirming once is enough.
[the confirmedLeave conditionals]

However, we have to make sure that when the user revisits the bands.new page, the warning code will run again.
If this.confirmedLeave is still true, it'll be short-circuited which is not what we want.

A good place to reset the property is the resetController hook we're now familiar with

Turns out when transition.abort() is called, an aborted transition is created and that also triggers the
routeWillChange event
Consequently, we have to check whether the transition is an aborted one, and then bail out early:
*/
  constructor() {
    super(...arguments);
    this.router.on('routeWillChange', (transition) => {
      if (transition.isAborted) {
        return;
      }
      if (this.confirmedLeave) {
        return;
      }
      if (transition.from.name === 'bands.new') {
        if (this.name) {
          let leave = window.confirm('You have unsaved changes. Are you sure?');
          if (leave) {
            this.confirmedLeave = true;
          } else {
            transition.abort();
          }
        }
      }
    });
  }

  @action
  updateName(event) {
    this.name = event.target.value;
  }

  @action
  async saveBand() {
    let band = await this.catalog.create('band', { name: this.name });
    this.confirmedLeave = true;
    this.router.transitionTo('bands.band.songs', band.id);
  }
  /*We should also take care to allow clicking the Save button. As it stands now,
  we also get the confirmation dialog in that case, since it also triggers a router transition.
  Simply setting the confirmedLeave property will do*/
}
/*The on method creates a listener that can be torn down by calling off on the same object, with the same method
The advantage of having added our listener on the controller is that we don't have to bother tearing it down.
The controller is only created once and lives as long as the app is not closed, so we're fine.
However, if we added the listener on a component, we'd have to take care to properly unregister it.
*/
