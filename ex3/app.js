window.load=take_photos();
async function take_photos()
{
    const response= await fetch("https://picsum.photos/v2/list");
    photos= await response.json();
    console.log(photos);
    authors=[];
    show_photos(photos);
}

function show_photos(photos)
{
   parent=document.getElementsByClassName('photos-area')[0];
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

function fill_select(authors){

}