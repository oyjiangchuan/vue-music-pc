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
