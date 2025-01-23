const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const cakesListItems = document.querySelectorAll('.cakes-list-item');

const categoryFilter = document.getElementById('category-filter');
const priceMinInput = document.getElementById('price-min');
const priceMaxInput = document.getElementById('price-max');
const weightMinInput = document.getElementById('weight-min');
const weightMaxInput = document.getElementById('weight-max');
const applyFiltersButton = document.getElementById('apply-filters');
let buttonFilter = document.querySelector('.filter-button');
let filterContainer = document.querySelector('.filter-container');
let buttonFilterClose  = document.querySelector('.filter-close');
let resetFiltersButton = document.querySelector('.reset');

buttonFilter.onclick = function(){
  filterContainer.classList.remove('hidden');
}
buttonFilterClose.onclick = function () {
  filterContainer.classList.add('hidden');
};

function resetFilters() {
  
  categoryFilter.value = 'all';
  priceMinInput.value = '';
  priceMaxInput.value = '';
  weightMinInput.value = '';
  weightMaxInput.value = '';


  cakeItems.forEach((item) => {
    item.style.display = 'block';
  });
}


resetFiltersButton.addEventListener('click', resetFilters);

const cakeItems = document.querySelectorAll('.cakes-list-item');


function applyFilters() {
  let titles=document.querySelectorAll('.cakes-list-name h3');
  for (i of titles){
    i.classList.add('hidden');
  }
  const selectedCategory = categoryFilter.value;
  const priceMin = parseInt(priceMinInput.value) || 0;
  const priceMax = parseInt(priceMaxInput.value) || Infinity;
  const weightMin = parseInt(weightMinInput.value) || 0;
  const weightMax = parseInt(weightMaxInput.value) || Infinity;


  cakeItems.forEach((item) => {
    const category = item.dataset.category;
    const price = parseInt(item.dataset.price);
    const weight = parseInt(item.dataset.weight);

    const matchesCategory = selectedCategory === 'all' || category === selectedCategory;
    const matchesPrice = price >= priceMin && price <= priceMax;
    const matchesWeight = weight >= weightMin && weight <= weightMax;

    if (matchesCategory && matchesPrice && matchesWeight) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

applyFiltersButton.addEventListener('click', applyFilters);

function searchItems() {
  let titles=document.querySelectorAll('.cakes-list-name h3');
  for (i of titles){
    i.classList.add('hidden');
  }
  const query = searchInput.value.trim().toLowerCase(); 
  cakesListItems.forEach((item) => {
    const title = item.querySelector('h4').textContent.toLowerCase(); 
    if (title.includes(query)) {
      item.style.display = 'block'; 
    } else {
      item.style.display = 'none'; 
    }
  });
}


searchButton.addEventListener('click', searchItems);
searchInput.addEventListener('input', searchItems);

