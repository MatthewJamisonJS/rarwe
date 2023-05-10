import Route from '@ember/routing/route';

export default class BandsNewRoute extends Route {
  resetController(controller) {
    controller.name = '';
  }
}

/*There is one problem, though. Just as it was the case when we created songs, the band will not appear in the list. However, here, we have a harder challenge to solve: the model hook of the bands route, responsible for showing the list of bands in the sidebar returns a static list of three bands.
When we made new songs appear, we also saw that manually updating a route's model (especially if it's not even the current route's) is an anti-pattern. We also can't tweak the model to return a relationship we can add to – like we did for songs.
Somehow the model hook would need to be made reactive. More precisely, the collection it returns would
need to be made to react to changes by re-rendering.

A fresh new approach is needed. We'll come up with a mechanism to store bands and songs and access that store in a way that reacts instantly to updates.
*/
