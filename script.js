
var displayDefaultList = document.querySelector('.movie_list')

var search = document.getElementById('search');


var page = document.getElementById("page");
//console.log(page);


movieList(1);



async function movieList(pageNumber){

    if(search.value=='')
    {
     const result = await fetch(`http://www.omdbapi.com/?s=Iron&page=${pageNumber}&apikey=51dc8ff4`);
     const data = await result.json(); 
     displayDefault(data.Search);   
    }
    else
    {
        const result = await fetch(`http://www.omdbapi.com/?s=${search.value}&page=${pageNumber}&apikey=51dc8ff4`);
        const data = await result.json(); 
        displayDefault(data.Search);   
    }
    

    
}


async function searchMovie(pageNumber){
    if(search.value=='')
    movieList(1);
    const result = await fetch(`http://www.omdbapi.com/?s=${search.value}&page=${pageNumber}&apikey=51dc8ff4`);
        const data = await result.json();
        if(data.Search!==undefined)
        displayDefault(data.Search);
    
}




function displayDefault(movie){
        
        displayDefaultList.innerHTML="";
    for(var i=0;i<movie.length;i++){
        movieItem = document.createElement('li');
        movieItem.innerHTML = `<div class='flex'><div        class="movie_poster">
                                    <img src=${movie[i].Poster} width='200px' height='300px'>
                               </div>
                               <div class="movie_name">${movie[i].Title}</div></div>`
        displayDefaultList.append(movieItem);
        }
        
}



function nextPage() {
    let elPage = page.innerText;
    let pageNum = Number(elPage);
    movieList(pageNum+1);
    page.innerHTML = `
        <a onclick="previousPage()">
        <i class="fa fa-angle-double-left">
        </i>
        </a>
    ${pageNum + 1}
        <a onclick="nextPage()">
        <i class="fa fa-angle-double-right">
        </i>
        </a>
    `;

}

function previousPage() {
    let elPage = page.innerText;
    let pageNum = Number(elPage);
    movieList(pageNum-1);
    if (pageNum === 2) {
        page.innerHTML = `${pageNum-1}
        <a onclick="nextPage()">
        <i class="fa fa-angle-double-right">
        </i>
        </a>
    `;
    } else {
        page.innerHTML = `
        <a onclick="previousPage()">
        <i class="fa fa-angle-double-left">
        </i>
        </a>
    ${pageNum-1}
        <a onclick="nextPage()">
        <i class="fa fa-angle-double-right">
        </i>
        </a>
    `;
    }
}
