class Algorithm {
    constructor(gridObj, dimension, block_class) {
        const grid = new Array();
        let block = gridObj.querySelectorAll('.{0}'.format(block_class));
        for (let i = 0; i < block.length; i += dimension[0]) {
            let row = new Array();
            for (let j = 0; j < dimension[1]; j++) {
                let b = block[i + j];
                if (b.attributes.start.value === "true") {
                    this.start = [i, j];
                    row.push('s');
                } else if (b.attributes.end.value === "true") {
                    this.end = [i, j];
                    row.push('x');
                } else if (b.attributes.wall.value === '1') {
                    row.push('1');
                } else if (b.attributes.wall.value === '2') {
                    row.push('2');
                } else if (b.attributes.wall.value === '0') {
                    row.push('0');
                }
            }
            grid.push(row);
        }
        this.grid = grid;
    }

    dijkster() {
        let que = new Array()

        que.push(Dijkster(this.grid, this.start, new_position = [start[0] + 1, start[1]]));
        que.push(Dijkster(this.grid, this.start, new_position = [start[0] - 1, start[1]]));
        que.push(Dijkster(this.grid, this.start, new_position = [start[0], start[1] + 1]));
        que.push(Dijkster(this.grid, this.start, new_position = [start[0], start[1] - 1]));

        while (que.length != 0) {
            let d = Dijkster(this.grid,)
        }


    }
}


class Dijkster {
    status = false
    end = false
    cordinate = [[0,1],[0,-1],[1,0],[-1,0]]
    constructor(grid, current_node, previous = null) {
        this.grid = grid; 
        this.current_node = current_node;
        this.previous = previous;

    }

    __check(next_cordinate){
        if (this.grid[next_cordinate[0]][next_cordinate[1]] !== '1' || this.grid[next_cordinate[0]][next_cordinate[1]] !== '2' || this.grid[next_cordinate[0]][next_cordinate[1]] !== 's') {
            this.status = true;
        }else if(grid[next_cordinate[0]][next_cordinate[1]] === 'x'){
            this.end = true;
        }
    }

    find_next_nodes(){
        let rv = new Array();
        for(let i=0;i<this.cordinate.length;i++){
            let next_cordinate = [
                this.current_node[0]+this.cordinate[i][0],
                this.current_node[1] + this.cordinate[i][1]
            ]
            
        }
    }
}