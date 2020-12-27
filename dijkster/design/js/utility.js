const createElement = (obj) => {
  //if element parameter is defined
  if (obj.element) {
    var elmnt = document.createElement(obj.element);
  } else {
    if (DEBUG) console.log("obj.element is not defined" + obj);
    return undefined;
  }

  //if element attributes are defined else no attribute will be set

  if (obj.attribute) {

    let attr = obj.attribute;
    let l = attr.length;

    if (typeof attr === 'function') {
      attr = attr();
    }
    if (attr.substr(l - 3, l) === ":?:") {
      attr = attr.substr(0, l - 3);
    }

    var b = attr.split(":?:");
    b.forEach(function (e) {
      var c = e.split("=");
      var att = document.createAttribute(c[0]);
      att.value = c[1];
      elmnt.setAttributeNode(att);
    })
  }

  //if innerhtml is defined
  if (obj.innerhtml) {
    elmnt.innerHTML = obj.innerhtml;
  }

  //if htmlobject is given to append in the element
  if (obj.htmlObj) {
    obj.htmlObj.forEach(function (e) {
      elmnt.appendChild(e);
    })

  }
  return elmnt;
};


// First, checks if it isn't implemented yet.
if (!String.prototype.format) {
  String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
        ;
    });
  };
}