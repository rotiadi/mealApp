const searchButton = document.getElementById("submit");
const searchContainer = document.querySelector('.search-container');
const searchType = document.getElementById('searchType');
const messageBox = document.querySelector('.message-result');

const resultCardContainer =  document.querySelector('.results-cards-container');


//add event for button click
searchButton.addEventListener('click',() => {
    let keyword = "";
    switch (searchType.value) {
        case 'Name':
            keyword = document.getElementById('searchBox').value;
            break;
        case 'Category':
            keyword = document.getElementById('selectCategory').value;
            break;
        case 'Area':
            keyword = document.getElementById('selectArea').value;
            break;    
        default:
            break;
    }
    //TODO -- SEARCH METHOD
    loadMealsByType(searchType.value, keyword)
        .then(data => {
            console.log(data);
            
            // write the message of search

            if(!data){
                messageBox.innerText = `No data found for the ${searchType.value} - ${keyword}`
            } else if (data.length === 1) {
                messageBox.innerText = `There is only 1 result for ${searchType.value} - ${keyword}` 
            } else {
                messageBox.innerText = `There are ${data.length} for ${searchType.value} - ${keyword}`
            }

            //clear the container
            while(resultCardContainer.firstChild){
                resultCardContainer.removeChild(resultCardContainer.firstChild)
            }

            data.forEach(meal => {
               
                const cardMeal = document.createElement('div');
                cardMeal.classList.add('card-meal');
                
                const cardImg = document.createElement('img');
                cardImg.src = meal.strMealThumb;

                const cardTitle = document.createElement('h2');
                cardTitle.innerText = meal.strMeal;

                const cardCategory = document.createElement('h3');
                cardCategory.innerText = !meal.strCategory ? "" : meal.strCategory;

                const cardArea = document.createElement('h4');
                cardArea.innerText = !meal.strArea  ? "" : meal.strArea;
                
                
                cardMeal.appendChild(cardImg);
                cardMeal.appendChild(cardTitle);
                cardMeal.appendChild(cardCategory);
                cardMeal.appendChild(cardArea);

                resultCardContainer.appendChild(cardMeal);
            });

            
        })
        .catch(err => {
            console.log(err);
        
        })
});


// add event for enter when you are in search container
//when in press enter simulate the button click
searchContainer.addEventListener('keypress', (event)=>{
    if(event.key === 'Enter'){
        searchButton.click();
    }   
});

// setting the elements visible based on the search type selection

const searchName = document.querySelectorAll(".searchName");
const searchCateg = document.querySelectorAll(".searchCateg");
const searchArea = document.querySelectorAll(".searchArea");

searchType.addEventListener('change', (event) =>{
    switch (searchType.value) {
        case 'Name':
            searchName.forEach(element => {
                element.classList.remove('hidden');                
            });
            
            searchCateg.forEach(element => {
                element.classList.add('hidden');                
            });
           
            searchArea.forEach(element => {
                element.classList.add('hidden');                
            });
            break;
        case 'Category':
            searchCateg.forEach(element => {
                element.classList.remove('hidden');                   
            });
            
            searchName.forEach(element => {
                element.classList.add('hidden');                
            });
           
            searchArea.forEach(element => {
                element.classList.add('hidden');                
            });

            // display Categories
            loadCategories().then(data => {
                const listCategories = document.getElementById('selectCategory');
                
                Array.from(listCategories).forEach(elem => {
                    elem.remove();
                })

                let categoriesHtml = "";
                data.forEach(categ => {
                    categoriesHtml += `<option value="${categ.strCategory}" class="search">${categ.strCategory}</option>`;
                });
                
                listCategories.insertAdjacentHTML('beforeend',categoriesHtml)
                
            })     
                            .catch(err => console.log(err))        

            break;
        case 'Area':
            searchArea.forEach(element => {
                element.classList.remove('hidden');                
            });
            
            searchName.forEach(element => {
                element.classList.add('hidden');                
            });
           
            searchCateg.forEach(element => {
                element.classList.add('hidden');                
            });

            //display area
            loadAreas().then(data => {
                const listAreas = document.getElementById('selectArea');
                                
                Array.from(listAreas).forEach(elem => {
                    elem.remove();
                })

                let areasHtml = "";
                data.forEach(area => {
                    areasHtml += `<option value="${area.strArea}" class="search">${area.strArea}</option>`;
                });
                
                listAreas.insertAdjacentHTML('beforeend',areasHtml);
                
            })     
                            .catch(err => console.log(err)) 


            break;
    
        default:
            break;
    }
})

