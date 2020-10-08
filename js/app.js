'use strict';

console.log('app,js loaded');

let photoTemplateId = "#photo-template";
let animals = [];

function Animal(animal) {
  for (let key in animal)
    this[key] = animal[key];
};

Animal.prototype.toHtml = function () {
  let template = $(photoTemplateId).html();

  let html = Mustache.render(template, this);

  return html;
};

Animal.prototype.addOption = function () {
  if (($('#animalType').find('.option-' + this.keyword)).length) {
    return;
  }
  let $option = $(`<option value='${this.keyword}' class='option-${this.keyword}'>${this.keyword}</option>`);
  $('#animalType').append($option);
};

Animal.readJson = (pgNum) => {

  $.getJSON(`data/page-${pgNum}.json`)
    .then(data => {
      data.forEach(animal => {
        let thisAnimal = new Animal(animal);
        thisAnimal.addOption();
        animals.push(thisAnimal);
        // $('main').append(thisAnimal.toHtml());
    });
    $('#animalSort').trigger('change');
    })
};

// read in page-1.json intitially
$(() => Animal.readJson(1));

// event for select drop-down menu
$('#animalType').on('change', function () {
  if (this.value === 'default') {
    $('section').show();
    $('#photo-template').hide();
  }
  else {
    $('section').hide();
    $(`.${this.value}`).show();
    console.log(this.value);
  }
});

// event for clicking on page1 | page2 buttons
$('button').on('click', function () {
  $("section").remove();
  animals = [];
  $(() => Animal.readJson(this.value));
});

$('#animalSort').on('change', function(){

    $('section').remove();
    console.log(this.value)

    if (this.value === 'sortByTitle'){
        animals.sort((a,b) => a.title > b.title ? 1:-1);
        
    }else if (this.value === 'sortByHornAscend'){
        animals.sort((a,b) => a.horns - b.horns);

    }else if (this.value === 'sortByHornDescend'){
        animals.sort((a,b) => b.horns - a.horns);
    };

    animals.forEach(animal => $('main').append(animal.toHtml()));
    $('#animalType').trigger('change');
    
});