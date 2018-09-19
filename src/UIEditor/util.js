let _removeClass = (dom, className) => {
  let aClass = dom.className.split(' ');
  let index = aClass.indexOf(className);
  if (index !== -1) {
    aClass.splice(index, 1);
    dom.className = aClass.join(' ');
  }
}

let _addClass = (dom, className) => {
  let oldClass = dom.className;
  dom.className = oldClass + ' ' + className;
}

let _hasClass = (dom, className) => {
  let aClass = dom.className.split(' ');
  let index = aClass.indexOf(className);
  if (index !== -1) {
    return true;
  }else {
    return false;
  }
}

const $mo = {

  removeClass: (dom, className) => {
    let length = dom.length;
    if( className === '' || typeof className !== "string") {
      return false;
    }
    if( length === undefined ) {
      _removeClass(dom, className);
    }else {
      for(let i=0; i<length; i++) {
        _removeClass(dom[i], className);
      }
    }
  },

  addClass: (dom, className) => {
    let length = dom.length;
    if( className === '' || typeof className !== "string") {
      return false;
    }
    if( length === undefined ) {
      _addClass(dom, className);
    }else {
      for(let i=0; i<length; i++) {
        _addClass(dom[i], className);
      }
    }
  },

  hasClass: (dom, className) => {
    let length = dom.length;
    if( className === '' || typeof className !== "string") {
      return false;
    }
    if( length === undefined ) {
      return _hasClass(dom, className);
    }else {
      for(let i=0; i<length; i++) {
        if( !_hasClass(dom[i], className) ) {
          return false;
        }
      }
      return true;
    }
  },

  index: (aDom, dom) => {
    let length = aDom.length;
    let index = -1;
    for(let i=0; i<length; i++) {
      if( aDom[i] === dom ){
        index = i;
        break;
      }
    }
    return index;
  },

  map: (aDom, callback) => {
    let length = aDom.length;
    for(let i=0; i<length; i++) {
      callback.call(aDom[i], i);
    }
  }
}



export default $mo;