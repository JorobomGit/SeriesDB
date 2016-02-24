$(document).ready(function() { // Cuando la página se ha cargado por completo
    //Ponemos el foco en el primer input
    // Tenemos que setear la clase auto-focus en cada html que queramos
    $(".auto-focus").focus();

    $("form").on("submit", function() { // Cuando se intente enviar el formulario

    	// validacion del título
    	var title = $.trim( $("#title").val());

        if (title == "") {
            alert("El titulo no puede ser vacio");
            return false;
        }

        // validacion de URL
        var url = $.trim( $("#cover_url").val());
        // Expresion logica de la url
        var pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/ig;

        if (url != "" && pattern.test(url) == false){
        	alert("La URL de la caratula no se valida");
        	return false;
        }

        // validacion categorias
        var selectedCategories = $('input[name="category"]:checked');
        if(selectedCategories.length == 0){

        	alert("Selecciona al menos una categoría");
        	return false;
        }


        return true; //Si devolvemos true permitimos envio del formulario
    });
});
