'use strict';

console.log('app,js loaded');

function Animal(animal) {
  this.image_url = animal.image_url;
  this.title = animal.title;
  this.description = animal.description;
  this.keyword = animal.keyword;
  this.horns = animal.horns;
}

Animal.prototype.render = function () {
  let $animalClone = $('#photo-template').clone();
  $('main').append($animalClone);

  $animalClone.find('h2').text(this.title);
  $animalClone.find('img').attr('src', this.image_url);
  $animalClone.find('p').text(this.description);
  $animalClone.find('img').attr('atl', this.keyword);
  
  $animalClone.removeAttr('id');
  $animalClone.attr('class', this.keyword);
};

Animal.prototype.addOption = function () {
  if (($('select').find('.option-' + this.keyword)).length){
    return;
  } 
  let $option = $(`<option value='${this.keyword}' class='option-${this.keyword}'>${this.keyword}</option>`);
  $('select').append($option);
}

Animal.readJson = (pgNum) => {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };
    
    $.ajax(`data/page-${pgNum}.json`, ajaxSettings)
    .then(data => {
        data.forEach(item => {
            let animal = new Animal(item);
            animal.render();
            animal.addOption();
        });
        $('section').show();
        $('#photo-template').hide();
    })
};

$(() => Animal.readJson(1));


$('select').on('change', function(){
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

$('button').on('click', function(){
    $("section").not("[id = 'photo-template']").remove();
    $(() => Animal.readJson(this.value));
});