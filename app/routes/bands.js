import Route from '@ember/routing/route';
import { service } from '@ember/service';
// import wait from 'rarwe/utils/wait'; Deleting this since we want the wait function to simulate
//network latency

/*
function wait(delay) {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay);
  });
}

Exported from a created folder titled 'utils'
titled the import 'wait'

*/

export default class BandsRoute extends Route {
  @service catalog;

  async model() {
    // await wait(3000);
    return this.catalog.fetchAll('bands');
    /* simulating network latency using an async model and the function "wait"*/
  }
}
