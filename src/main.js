const d3 = require('d3');

let numbers = [5,10,15];

//selettore di d3
d3.select('#app')
//dentro al container app appendi h1
  .append('h1')
  //con testo inerente
  .text('My first d3.js application')

const ul = d3.select('#app')
  .append('ul')

const svg = d3.select('#viz')
  .append('svg')
  .attr('width', 600)
  .attr('height', 300);

function redraw() {
//select all because we have multiple elements
  let lis = ul.selectAll('li')
  //andiamo a specificare dentro o parametri di data i dati a disposizione
    .data(numbers)

//    exit
//rimuovo gli elementi visuali che non interessano i dati che ho
  lis.exit().remove();

//    enter
  lis = lis
    .enter()
    .append('li')
    //effettuo il merge con le cose che c'erano prima.
    .merge(lis);

//    update
//lis.text(function (d, i) {
//  return 'Element numbers is ' + d;
//});
  lis.text((d, i) => ('Element number is ' + d));
}

//funzioni di redraw del dell'svg
function svgRedraw(){
  let lines = svg.selectAll('line').data(numbers);

  //exit
  lines.exit().remove();

  //enter
  lines = lines.enter()
    .append('line')
    .attr('stroke-width', 1)
    .attr('stroke', 'red')
    .merge(lines);

  //update
  //change the appearence of the lines.
  lines
    .attr('x1', 10)
    .attr('y1', (d,i) => (10 + i *10) )
    //coordinate di arrivo nel div della linea
    .attr('x2', (d,i) => (10 +d) )
    .attr('y2', (d,i) => (10 + i *10) );
}

d3.select('#btnAdd')
  .on('click', function () {
    console.log('Add a number');
    const n = Math.floor(Math.random()*100);
    numbers.push(n);
    redraw();
    svgRedraw();
  });

d3.select('#btnRemove')
  .on('click', function () {
    console.log('Remove a number');
    //remove the first one element
    numbers = numbers.slice(1);
    redraw();
    svgRedraw();
  });

redraw();
svgRedraw();
