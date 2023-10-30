function myFunction(){
        localStorage.setItem("name", "Bob");
        var x = localStorage.getItem("name");
	var name = document.getElementById('info').value;
	alert(x);
	alert(name);
}

document.getElementById("myButton").addEventListener("click", myFunction);