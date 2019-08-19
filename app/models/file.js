import Model, { attr } from '@ember-data/model';
import { equal } from '@ember/object/computed';

export default Model.extend({
  device: attr('string'),
  name: attr('string'),
  path: attr('string'),
  status: attr('string'),

  // Computed Properties:
  isAvailable: equal('status', 'available')
});
