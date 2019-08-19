import Route from '@ember/routing/route';
import { task } from 'ember-concurrency';

export default Route.extend({
  model() {
    return { files: this.get('fetchModelData').perform() };
  },

  fetchModelData: task(function* () {
    return yield this.store.findAll('file');
  }).cancelOn('deactivate')
});
