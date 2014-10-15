// JavaScript Document
 
	
$(document).on("click", "#boton2" ,function (event) {
   alert("desea eliminar?");
}); 

$(document).on("click", "#boton1" ,function (event) {
   alert("desea eliminar?");
}); 

function Mostrar(n) {
	Procesos = n;
	switch(n)
	{
	case 1:
		$.mobile.changePage("#generaAutos");
		prueba1();	
		break;
	case 2:
	//pop slidedown flip
		$.mobile.changePage("#autogenera", {transition: 'flip', role: 'dialog'}); 
		
		prueba2();	
		break;
	case 3:
		$.mobile.changePage("#autogenera");
		prueba2();	
		break;
		
	}
		
}


function prueba1(){
	
	$("#lista").empty();
	 	for (var i=0; i<3; i++){
			$("#lista").append('<li data-inset="true""><h2>Accesorios de autos</h2><p>Artículos</p></li>');
    	}
		
		$("#lista").listview("refresh");	
	
	
	}
	
	function prueba2(){
	
	
	switch(Procesos)
	{
	//case de facultad
	case 2:
		$("#pag").empty();
	 	for (var i=0; i<3; i++){
			$("#pag").append('<li data-role="list-divider">CENTRO</li><li><img src="imagenes/upse.png"><h3>AUTO'+i+'</h3><p>Descripcion del vehiculo</p></li>');
    	}
		
		$("#pag").listview("refresh");	
		break;
	
	case 3:
		$("#pag").empty();
	 	for (var i=0; i<3; i++){
			$("#pag").append('<li data-inset="true""><h2>jjjj</h2><p>iiii</p></li>');
			
    	}
		
		$("#pag").listview("refresh");	
		break;
		
		
		
		break;		
	
	default:
  		
	}

	}
	
	function prueb(){
		$.mobile.changePage("#generaAutos");
	$("#lista").empty();
	 	for (var i=0; i<4; i++){
			$("#lista").append('<li data-inset="true" value="'+i+'"><h3>Programas</h3><p>Descripcion total</p></li>'); 
    	}
		
		$("#lista").listview("refresh");	
	
	
	}
	
	
$(document).on("click", "#lista li" ,function(event) {
	 var Codigo= $(this).val();
	//alert(Codigo);
	Mostrar(Codigo);
}); 