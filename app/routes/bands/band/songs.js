import Route from '@ember/routing/route';

export default class BandsBandSongsRoute extends Route {
  resetController(controller) {
    controller.title = '';
    controller.showAddSong = true;
  }
  // model() {
  //   let band = this.modelFor('bands.band');
  //   return band.songs;
  // }
  // /*The method gets passed to the controller as the first param
  // and the resolved model as the second one. super is the default implementation that takes care of
  // setting the model property on the controller*/
  // setupController(controller) {
  //   super.setupController(...arguments);
  //   controller.set('band', this.modelFor('bands.band'));
  // }
  /*Since we know we also need to get hold of the band we create the songs for,
  it's easiest to change the route so that it returns the band object and loop through
  @model.songs in the template:

  */
}
