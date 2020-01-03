import imports from 'marked/src/defaults';

const defaults = getDefaults();

function getDefaults() {
  return {
    decodeEntities: true,
    normalizeTags: true,
    ...imports.getDefaults()
  };
}

function changeDefaults(options) {
  for (let [ name, value ] of Object.entries(options)) {
    defaults[name] = value;
  }
}

export {
    defaults,
    getDefaults,
    changeDefaults
};
