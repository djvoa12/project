import Component from '@ember/component';
import { computed } from '@ember/object';
import { equal, filterBy, reads } from '@ember/object/computed';
import ObjectProxy from '@ember/object/proxy';

export default Component.extend({
  classNames: ['file-list'],

  files: null,
  isLoading: null,

  availableFilesCount: reads('availableProxyFiles.length'),
  availableProxyFiles: filterBy('proxyFiles', 'isAvailable'),
  noFilesSelected: equal('selectedFilesCount', 0),
  selectedFilesCount: reads('selectedProxyFiles.length'),
  selectedProxyFiles: filterBy('availableProxyFiles', 'isChecked'),

  proxyFiles: computed('files', {
    get() {
      const files = this.files;
      if (!files) return [];
      return files.map((file) => {
        return ObjectProxy.create({ content: file, isChecked: false });
      });
    }
  }).readOnly(),

  actions: {
    downloadFiles() {
      const notification = this.availableProxyFiles
        .filterBy('isChecked')
        .map((file) => {
          return `Device: ${file.get('device')}\nPath: ${file.get('path')}`;
        })
        .join('\n');
      alert(`Downloading:\n${notification}`);
    },

    selectAllAvailableFiles(boolean) {
      this.availableProxyFiles.setEach('isChecked', boolean);
    }
  }
});
