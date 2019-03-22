const d3 = require('d3');

let numbers = [5000,7761,3452];

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

  //define a scale
  const xScale = d3.scaleLinear()
  //dominio della scala, nel nostro caso 0,100 ma questo ci permette di gestire meglio le situazioni
    .domain([0,10000])
    //il range dice quanto range va riservato
    .range([10,200]);

  const yScale = d3.scaleLinear()
    //10 different numbers mapped into lines
    .domain([0,19])
    //altezza del div
    .range([10,290]);

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
  //SCALES, IN A COMPACT WAY NOT LIKE THIS
    .attr('x1', xScale(0))
    .attr('y1', (d,i) => yScale(i) )
    //coordinate di arrivo nel div della linea
    //usando lo scale, posso modificare in maniera piu semplice la scalata delle variabili andando a toccare il concetto di range nella scalata
    .attr('x2', (d,i) => xScale(d))
    .attr('y2', (d,i) => yScale(i) );
}

d3.select('#btnAdd')
  .on('click', function () {
    console.log('Add a number');
    const n = Math.floor(Math.random()*10000);
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
