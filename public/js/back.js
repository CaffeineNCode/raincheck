const Wform = document.querySelector('form');
const search = document.getElementById('search');

Wform.addEventListener('submit', (e) => {
    e.preventDefault();
   const place = search.value;
   document.getElementById('location').innerHTML = "Loading....";
   
    fetch('/weather?search='+place).then((response)=> {
        response.json().then((data) => {
            if(data.error)
            document.getElementById('location').innerHTML = data.error;
            else{
                document.getElementById('location').innerHTML = data.Place;
                document.getElementById('temperature').innerHTML = data.Temperature+" ℃";
                document.getElementById('rain').innerHTML = data.Precip+" %";
                document.getElementById('status').innerHTML = data.Status;
                

            }
        })
    })
 });