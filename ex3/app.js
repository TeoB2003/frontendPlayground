window.load=take_photos();
var photos;
async function take_photos()
{
    const response= await fetch("https://picsum.photos/v2/list");
    photos= await response.json();
    console.log(photos);
    show_photos(photos);
    fill_select(photos);
}

function show_photos(photos)
{
   parent=document.getElementsByClassName('photos-area')[0];
   parent.innerHTML = '';
   photos.forEach(entry=>{
        frame=document.createElement('div');
        frame.className='photo-frame';
        image=document.createElement('img');
        image.src=entry['download_url'];
        image.className='photo-preview';

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

function fill_select(data){
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
    show_photos(photosByAuthor);
}