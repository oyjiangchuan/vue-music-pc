export const EMPTY_IMG = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

export const hasParent = (dom, parentDom) => {
  parentDom = Array.isArray(parentDom) ? parentDom : [parentDom]
  while (dom) {
    if (parentDom.find(p => p === dom)) {
      return true
    } else {
      dom = dom.parentNode
    }
  }
}

const elementStyle = document.createElement('div')

const vendor = (() => {
  const transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export const prefixStyle = (style) => {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
