const API_URL="https://picsum.photos/v2/list";
const photosPerPage=12;
let currentPage=1;
window.load=takePhotos();
var photos;
let currentPhotos=null;
let lastPage=0;
async function takePhotos()
{
    try{  
    const response= await fetch(API_URL);
    photos= await response.json();
    currentPhotos=photos
    console.log(photos);
    showPhotos(photos,0);
    fillSelect(photos);
    lastPage=photos.length/photosPerPage;
    console.log('Total pages= '+ lastPage);
    }
    catch(e)
    {
        alert(e);
    }
}

function showPhotos(photos)
{
   showPageController(currentPage);
   document.getElementsByClassName('loading')[0].classList.toggle('hidden-class', true);  
   parent=document.getElementsByClassName('photos-area')[0];
   document.getElementsByClassName('entire_photo')[0].classList.toggle('hidden-class', true);
   document.getElementsByClassName('author')[0].classList.toggle('hidden-class', false);

   parent.innerHTML = '';

   var startIndex = (currentPage - 1) * photosPerPage;
   var endIndex = Math.min(startIndex + photosPerPage, photos.length);
   
   for (var i = startIndex; i < endIndex; i++) {
       let entry = photos[i];
       
       var frame = document.createElement('div');
       frame.className = 'photo-frame';
   
       var image = document.createElement('img');
       image.src = entry['download_url'];
       image.className = 'photo-preview';
       image.addEventListener('click', function () {
           showFullPhoto(entry['download_url']);
       });
   
       var author = document.createElement('p');
       author.className = 'title';
       author.textContent = entry['author'];
   
       var desc = document.createElement('p');
       desc.className = 'description';
       var w = entry['width'];
       var h = entry['height'];
       var link = entry['url'];
       desc.textContent = 'This photo has ' + h + ' px height and ' + w + ' px width. You can download it from: ' + link;
   
       frame.appendChild(image);
       frame.appendChild(author);
       frame.appendChild(desc);
   
       parent.appendChild(frame);
   }
}

function fillSelect(data){
    authors=new Set();
    data.forEach(item=>{
        authors.add(item['author']);
    });
    console.log(authors);
    var selectNode=document.createElement("select");
    selectNode.className='selectS';

    authors.forEach(author=>
    {
        var newOption=document.createElement("option");
        newOption. value = author;
        newOption. text = author;
        selectNode.appendChild(newOption);
    }
    );
    allOption=document.createElement("option");
    allOption.value='all';
    allOption.text='all';
    selectNode.appendChild(allOption);
    selectNode.value = 'all';
    selectNode.addEventListener('change', handleAuthorSelect);

    var field=document.getElementsByClassName('select-area')[0];
    field.appendChild(selectNode);
}

function handleAuthorSelect(event)
{
    const selectedAuthor = event.target.value; 
    if(selectedAuthor!='all')
    photosByAuthor=photos.filter(item=>{ return item['author']==selectedAuthor });
    else
        photosByAuthor=photos;
    currentPhotos=photosByAuthor;
    currentPage=1;
    lastPage=photosByAuthor.length/photosPerPage;
    console.log('nrPages= '+ lastPage);
    showPageController(currentPage);
    showPhotos(photosByAuthor);
}

function showFullPhoto(link)
{
    console.log('link is '+ link);
    elem=document.getElementsByClassName('entire_photo')[0];
    elem.classList.toggle('hidden-class', false);
    elem.innerHTML = '<button class="close-btn" onclick="closePhoto()">X</button>';
    full_size=document.createElement('img');
    full_size.className='full-photo';
    full_size.src=link;
    elem.appendChild(full_size);
}

function closePhoto()
{
    document.getElementsByClassName('entire_photo')[0].classList.toggle('hidden-class', true);
}

function nextPage()
{
    console.log('next page pressed');
    currentPage++;
    showPhotos(currentPhotos);
}
function prevPage()
{
    console.log('prev page pressed');
    currentPage--;
    showPhotos(currentPhotos);
}

function showPageController(page)
{   
    console.log('showPage '+ page);
    if(currentPhotos.length<=12)
    {
        controller=document.getElementsByClassName('pagination-controls')[0].classList.toggle('hidden-class',true);
    }
    else
    {
    controller=document.getElementsByClassName('pagination-controls')[0];
    nextPageButton=document.getElementById('next-btn');
    prevPageButton=document.getElementById('prev-btn');
    if(page===1)
    {
        prevPageButton.classList.toggle('hidden-class', true);
        nextPageButton.classList.toggle('hidden-class', false);
    }
    else if(page>=lastPage)
    {
        console.log('here');
        prevPageButton.classList.toggle('hidden-class', false);
        nextPageButton.classList.toggle('hidden-class', true);
    }
    else
    {
        nextPageButton.classList.toggle('hidden-class', false);
        prevPageButton.classList.toggle('hidden-class', false);
    }
    let pageNumber = document.getElementById('page-number');

    if (pageNumber) {
        pageNumber.textContent = 'Page ' + page;
    } else {
        pageNumber = document.createElement('span');
        pageNumber.id = 'page-number';
        pageNumber.textContent = 'Page ' + page;
        controller.insertBefore(pageNumber, nextPageButton);
    }
    controller.classList.toggle('hidden-class', false);
   }
}