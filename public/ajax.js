
let xhttp;

function showPlayers(club) {
        document.getElementById('ausgabeClubs').innerHTML = "";
        let input = document.getElementById("items").value;
        let encodedInput = encodeURI(club);
        xhttp = new XMLHttpRequest();


        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                let players = this.responseText;
                document.getElementById('ausgabeSpieler').innerHTML = players;
            } else {
                console.log('FEHLER:' + xhttp.responseText);
            }
        };

        xhttp.open('GET',`/show?items=${encodedInput}`,true);
        xhttp.send();
}



function showClubs() {
    let input = document.getElementById("items").value;
    let encodedInput = encodeURI(input);
    if(input.length > 0){
        document.getElementById('ausgabeSpieler').innerHTML = "";
    }


    if (input.length < 3){
        document.getElementById('ausgabeClubs').innerHTML = "";
        return;
    }
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200){
                let clubs = this.responseText;
                document.getElementById('ausgabeClubs').innerHTML = clubs;
            }
            else{
                console.log('FEHLER:' + xhttp.responseText);
            }
        };

        xhttp.open('GET',`/search?items=${encodedInput}`,true);
        xhttp.send();

}