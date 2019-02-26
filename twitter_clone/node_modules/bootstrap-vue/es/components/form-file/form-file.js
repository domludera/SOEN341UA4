"use strict";

exports.__esModule = true;
exports.default = void 0;

var _id = require("../../mixins/id");

var _form = require("../../mixins/form");

var _formState = require("../../mixins/form-state");

var _formCustom = require("../../mixins/form-custom");

var _array = require("../../utils/array");

var _looseEqual = require("../../utils/loose-equal");

// @vue/component
var _default = {
  name: 'BFormFile',
  mixins: [_id.default, _form.default, _formState.default, _formCustom.default],
  props: {
    value: {
      // type: Object,
      default: null
    },
    accept: {
      type: String,
      default: ''
    },
    // Instruct input to capture from camera
    capture: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: 'No file chosen' // Chrome default file prompt

    },
    browseText: {
      type: String,
      default: null
    },
    dropPlaceholder: {
      type: String,
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    directory: {
      type: Boolean,
      default: false
    },
    noTraverse: {
      type: Boolean,
      default: false
    },
    noDrop: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      selectedFile: null,
      dragging: false,
      hasFocus: false
    };
  },
  computed: {
    selectLabel: function selectLabel() {
      // Draging active
      if (this.dragging && this.dropPlaceholder) {
        return this.dropPlaceholder;
      } // No file choosen


      if (!this.selectedFile || this.selectedFile.length === 0) {
        return this.placeholder;
      } // Multiple files


      if (this.multiple) {
        if (this.selectedFile.length === 1) {
          return this.selectedFile[0].name;
        }

        return this.selectedFile.map(function (file) {
          return file.name;
        }).join(', ');
      } // Single file


      return this.selectedFile.name;
    }
  },
  watch: {
    selectedFile: function selectedFile(newVal, oldVal) {
      if ((0, _looseEqual.default)(newVal, oldVal)) {
        return;
      }

      if (!newVal && this.multiple) {
        this.$emit('input', []);
      } else {
        this.$emit('input', newVal);
      }
    },
    value: function value(newVal) {
      if (!newVal || (0, _array.isArray)(newVal) && newVal.length === 0) {
        this.reset();
      }
    }
  },
  methods: {
    focusHandler: function focusHandler(evt) {
      // Bootstrap v4.beta doesn't have focus styling for custom file input
      // Firefox has a borked '[type=file]:focus ~ sibling' selector issue,
      // So we add a 'focus' class to get around these "bugs"
      if (this.plain || evt.type === 'focusout') {
        this.hasFocus = false;
      } else {
        // Add focus styling for custom file input
        this.hasFocus = true;
      }
    },
    reset: function reset() {
      try {
        // Wrapped in try in case IE < 11 craps out
        this.$refs.input.value = '';
      } catch (e) {} // IE < 11 doesn't support setting input.value to '' or null
      // So we use this little extra hack to reset the value, just in case
      // This also appears to work on modern browsers as well.


      this.$refs.input.type = '';
      this.$refs.input.type = 'file';
      this.selectedFile = this.multiple ? [] : null;
    },
    onFileChange: function onFileChange(evt) {
      var _this = this;

      // Always emit original event
      this.$emit('change', evt); // Check if special `items` prop is available on event (drop mode)
      // Can be disabled by setting no-traverse

      var items = evt.dataTransfer && evt.dataTransfer.items;

      if (items && !this.noTraverse) {
        var queue = [];

        for (var i = 0; i < items.length; i++) {
          var item = items[i].webkitGetAsEntry();

          if (item) {
            queue.push(this.traverseFileTree(item));
          }
        }

        Promise.all(queue).then(function (filesArr) {
          _this.setFiles((0, _array.from)(filesArr));
        });
        return;
      } // Normal handling


      this.setFiles(evt.target.files || evt.dataTransfer.files);
    },
    setFiles: function setFiles(files) {
      if (!files) {
        this.selectedFile = null;
      } else if (this.multiple) {
        // Convert files to array
        var filesArray = [];

        for (var i = 0; i < files.length; i++) {
          filesArray.push(files[i]);
        } // Return file(s) as array


        this.selectedFile = filesArray;
      } else {
        // Return single file object
        this.selectedFile = files[0];
      }
    },
    onReset: function onReset() {
      // Triggered when the parent form (if any) is reset
      this.selectedFile = this.multiple ? [] : null;
    },
    onDragover: function onDragover(evt) {
      evt.preventDefault();
      evt.stopPropagation();

      if (this.noDrop || !this.custom) {
        return;
      }

      this.dragging = true;
      evt.dataTransfer.dropEffect = 'copy';
    },
    onDragleave: function onDragleave(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      this.dragging = false;
    },
    onDrop: function onDrop(evt) {
      evt.preventDefault();
      evt.stopPropagation();

      if (this.noDrop) {
        return;
      }

      this.dragging = false;

      if (evt.dataTransfer.files && evt.dataTransfer.files.length > 0) {
        this.onFileChange(evt);
      }
    },
    traverseFileTree: function traverseFileTree(item, path) {
      var _this2 = this;

      // Based on http://stackoverflow.com/questions/3590058
      return new Promise(function (resolve) {
        path = path || '';

        if (item.isFile) {
          // Get file
          item.file(function (file) {
            file.$path = path; // Inject $path to file obj

            resolve(file);
          });
        } else if (item.isDirectory) {
          // Get folder contents
          item.createReader().readEntries(function (entries) {
            var queue = [];

            for (var i = 0; i < entries.length; i++) {
              queue.push(_this2.traverseFileTree(entries[i], path + item.name + '/'));
            }

            Promise.all(queue).then(function (filesArr) {
              resolve((0, _array.from)(filesArr));
            });
          });
        }
      });
    }
  },
  render: function render(h) {
    // Form Input
    var input = h('input', {
      ref: 'input',
      class: [{
        'form-control-file': this.plain,
        'custom-file-input': this.custom,
        focus: this.custom && this.hasFocus
      }, this.stateClass],
      attrs: {
        type: 'file',
        id: this.safeId(),
        name: this.name,
        disabled: this.disabled,
        required: this.required,
        form: this.form || null,
        capture: this.capture || null,
        accept: this.accept || null,
        multiple: this.multiple,
        webkitdirectory: this.directory,
        'aria-required': this.required ? 'true' : null
      },
      on: {
        change: this.onFileChange,
        focusin: this.focusHandler,
        focusout: this.focusHandler,
        reset: this.onReset
      }
    });

    if (this.plain) {
      return input;
    } // Overlay Labels


    var label = h('label', {
      class: ['custom-file-label', this.dragging ? 'dragging' : null],
      attrs: {
        for: this.safeId(),
        'data-browse': this.browseText || null
      }
    }, this.selectLabel); // Return rendered custom file input

    return h('div', {
      class: ['custom-file', 'b-form-file', this.stateClass],
      attrs: {
        id: this.safeId('_BV_file_outer_')
      },
      on: {
        dragover: this.onDragover,
        dragleave: this.onDragleave,
        drop: this.onDrop
      }
    }, [input, label]);
  }
};
exports.default = _default;