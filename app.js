const searchButton = document.getElementById("submit");
const searchContainer = document.querySelector('.search-container');

//add event for button click
searchButton.addEventListener('click',() => {
    //TODO -- SEARCH METHOD
});


// add event for enter when you are in search container
//when in press enter simulate the button click
searchContainer.addEventListener('keypress', (event)=>{
    if(event.key === 'Enter'){
        searchButton.click();
    }   
});

const searchType = document.getElementById('searchType');
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
            break;
    
        default:
            break;
    }
})