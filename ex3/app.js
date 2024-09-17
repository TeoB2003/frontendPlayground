const API_URL="https://picsum.photos/v2/list";  
window.load=takePhotos();
var photos;

async function takePhotos()
{
    try{  
    const response= await fetch(API_URL);
    photos= await response.json();
    console.log(photos);
    showPhotos(photos);
    fillSelect(photos);
    }
    catch(e)
    {
        alert(e);
    }
}

function showPhotos(photos)
{
   document.getElementsByClassName('loading')[0].classList.toggle('hidden-class', true);  
   parent=document.getElementsByClassName('photos-area')[0];
   document.getElementsByClassName('entire_photo')[0].classList.toggle('hidden-class', true);
   document.getElementsByClassName('author')[0].classList.toggle('hidden-class', false);

   parent.innerHTML = '';

   photos.forEach(entry=>{
        frame=document.createElement('div');
        frame.className='photo-frame';
        image=document.createElement('img');
        image.src=entry['download_url'];
        image.className='photo-preview';
        image.addEventListener('click', function () {
            showFullPhoto(entry['download_url']);
        });


        author=document.createElement('p');
        author.className='title';
        author.textContent=entry['author'];

        desc=document.createElement('p');
        desc.className='description';
        w=entry['width'];
        h=entry['height'];
        link=entry['url'];

        desc.textContent='This photo has '+h+' px height and '+ w+ ' px width. You can download it from: '+link;

        frame.appendChild(image);
        frame.appendChild(author);
        frame.appendChild(desc);

        parent.appendChild(frame);
   })
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
    showPhotos(photosByAuthor);
}

function showFullPhoto(link)
{
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
