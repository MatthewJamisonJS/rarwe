import Route from '@ember/routing/route';

export default class BandsNewRoute extends Route {
  resetController(controller) {
    controller.name = '';
    controller.confirmedLeave = false;
  }
}
/*A good place to reset the property is the resetController hook we're now familiar with ^^ */
