export function astar(grid,startNode,finishNode){
    const AllUnvisitedNodes=[];
    const visitedNodes=[];
    startNode.g=0;
    startNode.h=heuristic(startNode,finishNode);
    startNode.f=startNode.g+startNode.h;
    AllUnvisitedNodes.push(startNode);
    while(AllUnvisitedNodes.length>0){
        AllUnvisitedNodes.sort((a,b)=>a.f-b.f);
        let current = AllUnvisitedNodes.shift();
        if(current==finishNode){
            return pathfound(grid,finishNode);
        }
        visitedNodes.push(current);
         //finding neighbor of current node

         for(const neighbor of getneighbors(current,grid)){
            if(visitedNodes.includes(neighbor)||neighbor.isWall){
                continue;
            }
            const distanceG=current.g+1;
            if(distanceG<neighbor.g){
                neighbor.g = distanceG;
                neighbor.h = heuristic(neighbor,finishNode);
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.previous= current;
            
            if(!AllUnvisitedNodes.includes(neighbor))
            AllUnvisitedNodes.push(neighbor);
            }

         }
    }

return [];
}

function getneighbors(node,grid)
{
    if (!node) {
    console.error("getneighbors called with undefined node");
    return [];
  }

    const neighbors = [];
    
    if(node.row>0) neighbors.push(grid[node.row-1][node.col]);
       

    if(node.row<grid.length-1)neighbors.push(grid[node.row+1][node.col]);
    if(node.col>0)neighbors.push(grid[node.row][node.col-1]);
    if(node.col<grid[0].length-1)neighbors.push(grid[node.row][node.col+1]);
    return neighbors;
    
}

function heuristic(a,b){if (!a || !b) {
    console.error("Heuristic got undefined node:", a, b);
    return Infinity;
  }

    return Math.abs(a.row-b.row)+Math.abs(a.col-b.col);
}

function pathfound(grid,node){
    const path = [];
    let current = node;
    while(current!=null && current!=undefined){
        path.push(current);
        current = current.previous;
    }
    return path;
}