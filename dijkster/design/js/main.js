// Settings Css global variable from ../data/dijkster.json.js
if (DATA.css) {
  for (i in DATA.css) {
    document.documentElement.style.setProperty(i, DATA.css[i]);
  }
}



let GRID_BLOCK_COUNT = [15, 13];

window.onload = () => {

  /* Creating Grid using Js in div#grid */

  document.documentElement.style.setProperty("--gridwidth", GRID_BLOCK_COUNT[0]);
  let total_grid_block_count = GRID_BLOCK_COUNT[0] * GRID_BLOCK_COUNT[1];
  let start_pos = Math.floor(Math.random() * (total_grid_block_count - 1) + 1);
  let end_pos = Math.floor(Math.random() * (total_grid_block_count - 1) + 1);
  if (end_pos == start_pos) end_pos += 1;
  let grid = document.getElementById("grid");
  let grid_block = createElement({
    element: "div",
    attribute: "start=false:?:end=false:?:wall=0:?:class=block",
  });

  let start = createElement({
    element: 'i',
    attribute: (function () {
      let rv = "";
      if (Math.ceil(start_pos / GRID_BLOCK_COUNT[0]) > Math.ceil(end_pos / GRID_BLOCK_COUNT[0])) {
        rv += 'class=fad fa-angle-up fa-2x';
      } else if (Math.ceil(start_pos / GRID_BLOCK_COUNT[0]) < Math.ceil(end_pos / GRID_BLOCK_COUNT[0])) {
        rv += 'class=fad fa-angle-down fa-2x';
      } else if (Math.ceil(start_pos / GRID_BLOCK_COUNT[0]) === Math.ceil(end_pos / GRID_BLOCK_COUNT[0])) {
        if (start_pos > end_pos) {
          rv += 'class=fad fa-angle-left fa-2x'
        } else {
          rv += 'class=fad fa-angle-right fa-2x';
        }
      }
      return rv;
    }),
  });
  let end = createElement({
    element: 'i',
    attribute: 'class=fad fa-dot-circle fa-2x',
  });
  for (let i = 1; i <= total_grid_block_count; i++) {
    let grid_block_clone = grid_block.cloneNode();
    if (i === start_pos) {
      grid_block_clone.setAttribute('start', 'true');
      grid_block_clone.append(start.cloneNode());
    } else if (i === end_pos) {
      grid_block_clone.setAttribute('end', 'true');
      grid_block_clone.append(end.cloneNode());
    }
    addMouseEvent(grid_block_clone);
    grid.appendChild(grid_block_clone);
  }

  /* Creating Navigation Menu from the Data in ..data/dijkster.json.js */
  if (DATA.navbar) {
    let navbar = document.querySelector('nav ul');
    navbar.innerHTML = "";
    for (i in DATA.navbar) {
      let navigation_link = createElement({
        'element': 'li',
        'htmlObj': [createElement({
          'element': 'a',
          'attribute': 'href={0}'.format(DATA.navbar[i]),
          'innerhtml': i,
        })]
      });
      navbar.append(navigation_link);
    }
  }



};
let gridObj;
function addMouseEvent(element) {

  element.addEventListener('mousedown', (e) => {
    let not_allowed = [
      'fa-angle-right',
      'fa-angle-left',
      'fa-angle-up',
      'fa-angle-down',
      'fa-dot-circle',
    ];
    let class_name = '';
    let wall_value = '0';
    if (window.event.ctrlKey) {
      class_name = 'fas fa-stop fa-2x icon_wall';
      wall_value = '2';
      not_allowed.push('fa-chimney');
    } else {
      class_name = 'fas fa-chimney fa-2x';
      wall_value = '1';
      not_allowed.push('fa-stop');

    }
    gridObj = new editGrid(e.target, class_name, not_allowed, wall_value);
    gridObj.toggle(e);
  });
  element.addEventListener('mouseenter', (e) => {
    if (gridObj) {
      if (gridObj.mousedown) {
        gridObj.toggle(e);
      }
    }
  });


}
window.addEventListener('mouseup', (e) => {
  if (gridObj) {
    if (gridObj.mousedown) {
      gridObj.mousedown = false;
    }
  }
});