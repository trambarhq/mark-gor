function convertAttributes(tagName, attrs, options) {
  if (!attrs) {
    return;
  }
  const props = {};
  for (let [ name, value ] of Object.entries(attrs)) {
    if (/^on/i.test(name)) {
      // omit handlers
      continue;
    }
    if (value != undefined) {
      name = getDOMName(name);
      if (name === 'style') {
        value = parseStyle(value);
      } else if (isBooleanProp(tagName, name, attrs)) {
        value = true;
      } else if (name === 'width' || name === 'height') {
        if (tagName === 'img' || tagName === 'image') {
          if (!/^\d+$/.test(value)) {
            const { omitInvalidDimensions } = options;
            let newValue;
            if (value.endsWith('%')) {
              if (omitInvalidDimensions) {
                continue;
              }
            } else {
              const number = parseInt(value);
              if (!isNaN(number)) {
                value = number.toString();
              } else {
                if (omitInvalidDimensions) {
                  continue;
                }
              }
            }
          }
        }
      }
      props[name] = value;
    }
  }
  return props;
}

const camelCaseNames = {
  class: 'className',
  checked: 'defaultChecked',
  colspan: 'colSpan',
  contenteditable: 'contentEditable',
  contextmenu: 'contextMenu',
  for: 'htmlFor',
  maxlength: 'maxLength',
  minlength: 'minLength',
  novalidate: 'noValidate',
  readonly: 'readOnly',
  rowspan: 'rowSpan',
  tabindex: 'tabIndex',
};

function getDOMName(name) {
  name = name.toLowerCase();
  return camelCaseNames[name] || name;
}

const booleanAttributes = [
  'checked',
  'disabled',
  'hidden',
  'multiple',
  'open',
  'readOnly',
  'muted',
  'noValidate',
  'preload',
  'selected',
  'spellcheck',
  'translate',
  'wrap',
];

function isBooleanProp(tagName, attrName) {
  if (booleanAttributes.indexOf(attrName) !== -1) {
    return true;
  }
  return false;
}

function parseStyle(styleText) {
  const style = {};
  const items = styleText.split(';');
  for (let item of items) {
    item = item.trim();
    if (item) {
      const cap = /([^:\s]*)\s*:\s*(.*)/.exec(item);
      if (cap) {
        const name = cap[1];
        const value = cap[2];
        let domName = name.toLowerCase().replace(/-(\S{2})/g, function(m, letters) {
          if (letters !== 'ms') {
            letters = letters.charAt(0).toUpperCase() + letters.charAt(1);
          }
          return letters;
        });
        const acceptableValue = value.replace(/\s*!important/i, '');
        style[domName] = acceptableValue;
      }
    }
  }
  return style;
}

export {
  convertAttributes,
};
