function generate_floors_buttons()
{
    item=document.getElementsByClassName('button-area')[0];
    for(let a=10;a>=0;a--)
        {
        const newButton = document.createElement('button'); 
        newButton.className = 'numbered-button'; 
        newButton.textContent = `${a}`;
        newButton.onclick=function() {   window.location.href='./another_page.html?floor='+ a; };
        item.appendChild(newButton);
        }
    
}

function open_floor()
{
    const urlParams = new URLSearchParams(window.location.search);
    const floor = parseInt(urlParams.get('floor'), 10);

    text=document.getElementById('greetings');
    text.textContent+=floor;
    item=document.getElementsByClassName('button-area')[0];
    const card = document.getElementById('card');
    for(let a=10;a>=0;a--)
        {
        const newButton = document.createElement('button'); 
        newButton.className = 'numbered-button'; 
        if(a==floor)
            newButton.id='active_b';
        newButton.textContent = `${a}`;
        newButton.onclick=function() {  window.location.href='./another_page.html?floor='+ a; };
        item.insertBefore(newButton, card);
        }
}