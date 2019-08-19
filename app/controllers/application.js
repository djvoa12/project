import Controller from '@ember/controller';
import { reads } from '@ember/object/computed';

export default Controller.extend({
  files: reads('model.files.value'),
  isLoading: reads('model.files.isRunning')
});
