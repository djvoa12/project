import {
  clickable,
  create,
  collection,
  isHidden,
  isVisible,
  text
} from 'ember-cli-page-object';

export default create({
  files: collection('.files-row', {
    checkbox: text('td', { at: 0 }),
    name: text('td', { at: 1 }),
    device: text('td', { at: 2 }),
    path: text('td', { at: 3 }),
    status: text('td', { at: 4 })
  }),

  file1CheckboxIsHidden: isHidden('.files-row:eq(0) .fa-square'),
  file2CheckboxIsVisible: isVisible('.files-row:eq(1) .fa-square'),
  file3CheckboxIsVisible: isVisible('.files-row:eq(2) .fa-square'),
  file1AvailableIconIsHidden: isHidden('.files-row:eq(0) .fa-circle'),
  file2AvailableIconIsVisible: isVisible('.files-row:eq(1) .fa-circle'),
  file3AvailableIconIsVisible: isVisible('.files-row:eq(2) .fa-circle'),

  selectAll: clickable('.checkbox'),
  click1st: clickable('.checkbox-container:eq(1) svg'),
  click2nd: clickable('.checkbox-container:eq(2) svg'),
  selectedCounter: text('.selected-counter'),
  firstIsChecked: isVisible('.checkbox-container:eq(1) .fa-check-square'),
  firstIsUnchecked: isVisible('.checkbox-container:eq(1) .fa-square'),
  secondIsChecked: isVisible('.checkbox-container:eq(2) .fa-check-square'),
  secondIsUnchecked: isVisible('.checkbox-container:eq(2) .fa-square'),

  selectAllIsUnchecked: isVisible('.checkbox.fa-square'),
  selectAllIsChecked: isVisible('.checkbox.fa-check-square'),
  selectAllIsPartial: isVisible('.checkbox.fa-minus-square'),

  download: clickable('.download-link')
});
