import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import page from 'project/tests/pages/file-list';
import EmberObject from '@ember/object';

const file1 = EmberObject.create({
  name: 'smss.exe',
  device: 'Stark',
  path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe',
  status: 'scheduled',
  isAvailable: false
});

const file2 = EmberObject.create({
  name: 'netsh.exe',
  device: 'Targaryen',
  path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe',
  status: 'available',
  isAvailable: true
});

const file3 = EmberObject.create({
  name: 'uxtheme.dll',
  device: 'Lanniester',
  path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll',
  status: 'available',
  isAvailable: true
});

module('Integration | Component | file-list', function(hooks) {
  setupRenderingTest(hooks);

  test('component functions properly', async function(assert) {
    assert.expect(50);

    window.alert = () => assert.ok(true, 'Alert was triggered by download link');

    this.set('files', [file1, file2, file3]);
    await render(hbs`<FileList @files={{this.files}} />`);
    assert.equal(page.files.length, 3);
    assert.equal(page.files.objectAt(0).name, 'smss.exe');
    assert.equal(page.files.objectAt(0).device, 'Stark');
    assert.equal(page.files.objectAt(0).path, '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe');
    assert.equal(page.files.objectAt(0).status, 'Scheduled');
    assert.equal(page.files.objectAt(1).name, 'netsh.exe');
    assert.equal(page.files.objectAt(1).device, 'Targaryen');
    assert.equal(page.files.objectAt(1).path, '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe');
    assert.equal(page.files.objectAt(1).status, 'Available');
    assert.equal(page.files.objectAt(2).name, 'uxtheme.dll');
    assert.equal(page.files.objectAt(2).device, 'Lanniester');
    assert.equal(page.files.objectAt(2).path, '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll');
    assert.equal(page.files.objectAt(2).status, 'Available');
    assert.ok(page.file1CheckboxIsHidden);
    assert.ok(page.file2CheckboxIsVisible);
    assert.ok(page.file3CheckboxIsVisible);
    assert.ok(page.file1AvailableIconIsHidden);
    assert.ok(page.file2AvailableIconIsVisible);
    assert.ok(page.file3AvailableIconIsVisible);
    assert.ok(page.selectAllIsUnchecked);
    assert.equal(page.selectedCounter, 'None Selected');

    await page.click1st();
    assert.ok(page.selectAllIsPartial);
    assert.equal(page.selectedCounter, 'Selected 1');
    assert.ok(page.firstIsChecked);
    assert.ok(page.secondIsUnchecked);

    await page.click2nd();
    assert.ok(page.selectAllIsChecked);
    assert.equal(page.selectedCounter, 'Selected 2');
    assert.ok(page.firstIsChecked);
    assert.ok(page.secondIsChecked);

    await page.click2nd();
    assert.ok(page.selectAllIsPartial);
    assert.equal(page.selectedCounter, 'Selected 1');
    assert.ok(page.firstIsChecked);
    assert.ok(page.secondIsUnchecked);

    await page.click1st();
    assert.ok(page.selectAllIsUnchecked);
    assert.equal(page.selectedCounter, 'None Selected');
    assert.ok(page.firstIsUnchecked);
    assert.ok(page.secondIsUnchecked);

    await page.selectAll();
    assert.ok(page.selectAllIsChecked);
    assert.equal(page.selectedCounter, 'Selected 2');
    assert.ok(page.firstIsChecked);
    assert.ok(page.secondIsChecked);

    await page.selectAll();
    assert.ok(page.selectAllIsUnchecked);
    assert.equal(page.selectedCounter, 'None Selected');
    assert.ok(page.firstIsUnchecked);
    assert.ok(page.secondIsUnchecked);

    await page.click2nd();
    assert.ok(page.selectAllIsPartial);
    assert.equal(page.selectedCounter, 'Selected 1');
    await page.selectAll();
    assert.ok(page.selectAllIsChecked);
    assert.equal(page.selectedCounter, 'Selected 2', 'clicking on undertermined state selects all');
    page.download();
  });
});
