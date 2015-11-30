import Ember from 'ember';
import layout from '../templates/components/searchable-select-option';

export default Ember.Component.extend({
  layout,
  tagName: 'li',
  classNameBindings:  [
    ':Searchable-select__option',
    'isDisabled:Searchable-select__option--disabled',
    'isSelected:Searchable-select__option--selected'
  ],
  attributeBindings: ['tabindex'],

  option: null,
  optionLabelKey: 'title',
  optionDisabledKey: null,
  selectedArray: Ember.A([]),
  searchText: '',

  isDisabled: Ember.computed('option', 'optionDisabledKey', function() {
    if (this.get('optionDisabledKey')) {
      return Ember.get(this.get('option'), this.get('optionDisabledKey'));
    }
  }),
  isSelected: Ember.computed('option', 'selectedArray', function() {
    return this.get('selectedArray').contains(this.get('option'));
  }),
  tabindex: Ember.computed('isDisabled', function() {
    if (!this.get('isDisabled')) {
      return -1;
    }
  }),

  keyDown(event) {
    // enter key selects item
    if (event.keyCode === 13) {
      this.send('selectItem');
    }
  },

  click() {
    this.send('selectItem');
  },

  actions: {
    selectItem() {
      this.attrs['select-item'](this.get('option'));
    }
  }
});
