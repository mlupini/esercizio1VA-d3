const d3 = require('d3');

const numbers = [5,10,15];

//selettore di d3
d3.select('#app')
//dentro al container app appendi h1
  .append('h1')
  //con testo inerente
  .text('My first d3.js application')

const ul = d3.select('#app')
  .append('ul')

function redraw() {
//select all because we have multiple elements
  let lis = ul.selectAll('li')
  //andiamo a specificare dentro o parametri di data i dati a disposizione
    .data(numbers)

//    exit
//rimuovo gli elementi visuali che non interessano i dati che ho
  lis.exit().remove();

//    enter
  lis = lis.enter()
    .append('li')
    //effettuo il merge con le cose che c'erano prima.
    .merge(lis);

//    update
//lis.text(function (d, i) {
//  return 'Element numbers is ' + d;
//});
  lis.text((d, i) => ('Element number is ' + d));
}

d3.select('#btnAdd')
  .on('click', function () {
    console.log('Add a number');
  });

d3.select('#btnRemove')
  .on('click', function () {
    console.log('Remove a number');
  });

redraw();
