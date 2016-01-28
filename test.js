let a = [0,1,2,3,1,1,1,1,8,9,10,11,12,13,14,15];

const matchCells = (x,y) => {
  let r = [];
  const id = x * 4 + y;
  
  //right
  for(i=y+1; i<4; i++) {
    let newId = x * 4 + i;
    if(a[id] == a[newId]) {
      r.push([x,i]);
    }
  }
  //left
  for(i=y-1; i>=0; i--) {
    let newId = x * 4 + i;
    if(a[id] == a[newId]) {
      r.push([x,i]);
    }
  }  
  
  console.log(r);  
};

matchCells(1,3);
