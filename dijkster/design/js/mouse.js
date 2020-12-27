class editGrid {
    mousedown = false;
    contains(e, class_list) {
        let rv = false;
        for (let i = 0; i < class_list.length; i++) {
            if (e.classList.contains(class_list[i])) {
                rv = true;
            }
            e.childNodes.forEach(element => {
                if (element.classList.contains(class_list[i])) {
                    console.log('not allowed class');
                    rv = true;
                }
            });


        }
        return rv
    }

    constructor(element, className, notAllowed, wall_value) {
        if (this.contains(element, notAllowed)) this.mousedown = false;
        this.mousedown = true;
        this.element = element;
        this.className = className.split(' ');
        this.notAllowed = notAllowed;
        this.wall_value = wall_value;
    }

    setcallback(callback) {
        if (typeof callback === 'function') this.callback = callback;
    }

    toggle(e) {
        if (this.contains(e.target, this.notAllowed)) {
            return false;
        }
        if (this.mousedown === true) {
            for (let i = 0; i < this.className.length; i++) {
                e.target.classList.toggle(this.className[i]);

            }
            if (e.target.classList.contains(this.className[0])) {
                e.target.setAttribute('wall', this.wall_value);
            } else {
                e.target.setAttribute('wall', '0');
            }
        }
    }
    add(e) {
        for (let i = 0; i < this.className.length; i++) {
            if (!e.target.classList.contains(this.className[i])) {
                e.target.classList.add(this.className[i]);
            }
        }
    }
}




