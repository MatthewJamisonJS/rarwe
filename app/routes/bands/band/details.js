import Route from '@ember/routing/route';

export default class BandsBandDetailsRoute extends Route {}
/*
export default class BandsBandDetailsRoute extends Route {
  model() {
    return this.modelFor('bands.band');
  }
}
/*We use modelFor to fetch the model of the parent route, because we want to show some properties
of band on this tab*/

/* We'll only remove the model hook for now since we'll need to add code to this route 
later*/
