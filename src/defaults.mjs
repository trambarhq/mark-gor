import imports from 'marked/src/defaults';

const defaults = getDefaults();

function getDefaults() {
  return {
    decodeEntities: true,
    normalizeTags: true,
    ...imports.getDefaults()
  };
}

function mergeDefaults(options) {
  return Object.assign({}, defaults, options);
}

function changeDefaults(options) {
  Object.assign(defaults, options);
}

export {
    defaults,
    getDefaults,
    mergeDefaults,
    changeDefaults,
};
