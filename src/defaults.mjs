import imports from 'marked/src/defaults';

const defaults = getDefaults();

function getDefaults() {
  return {
    decodeEntities: true,
    fixBrokenTags: true,
    normalizeTags: true,
    omitLinefeed: true,
    omitComment: true,
    omitTags: [ 'script', 'style', 'link', 'meta' ],
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
