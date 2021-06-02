const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    let address = search.value;
    fetch(`/wather?address=${address}`)
    .then((res)=>{
        res.json().then(data=>{
            if(data.error){
                messageOne.textContent='';
                messageTwo.textContent='Unbale to Find Location Try another search';
                return;        
            }
            messageOne.innerHTML= '<p>'+data.location+'</p><p>'+data.forecast+'</p>'
        })
    }).catch(err=>{
        messageOne.textContent='';
        messageTwo.textContent='Error in fetching weather';
    });
});