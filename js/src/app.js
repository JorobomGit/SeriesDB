$(document).ready(function() { // Cuando la página se ha cargado por completo
    //Ponemos el foco en el primer input
    // Tenemos que setear la clase auto-focus en cada html que queramos
    $(".auto-focus").focus();

    $("form").on("submit", function() { // Cuando se intente enviar el formulario

        // validacion del título
        var title = $.trim($("#title").val());

        if (title == "") {
            alert("El titulo no puede ser vacio");
            return false;
        }

        // validacion de URL
        var url = $.trim($("#cover_url").val());
        // Expresion logica de la url
        var pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/ig;

        if (url != "" && pattern.test(url) == false) {
            alert("La URL de la caratula no se valida");
            return false;
        }

        // validacion categorias
        var selectedCategories = $('input[name="category"]:checked');
        if (selectedCategories.length == 0) {

            alert("Selecciona al menos una categoría");
            return false;
        }


        //Si he llegado aqui he formulario esta validado
        //Vamos a hacer una peticion POST para guardar un dato
        //Asincrono
        $.ajax({
            method: 'POST',
            url: "/api/series/",
            data: JSON.stringify({
                title: title,
                url: url
            }),
            contentType: 'application/json',
            success: function() {
                alert("Guardado con éxito!");
                reloadSeries();
            },
            error: function() {
                alert("Se ha producido un error");
            }
        });

        return false;
    });


    function reloadSeries() {
        console.log("Funciona el boton")
        $.ajax({
            method: 'GET', //No hace falta ponerlo, por defecto es GET
            url: "/api/series",
            //Por defecto el tipo es JSON
            success: function(data) {
                console.log("Series recuperadas", data);
                var html = "";
                for (var i in data) {
                    var id = data[i].id;
                    var title = data[i].title;
                    var url = data[i].url || "";
                    html += "<li>";
                    html += title;
                    if (url.length > 0)
                        html += " (" + url + ")";
                    html += '<button data-serieid="' + id + '">Eliminar</button>';
                    html += "</li>";
                }
                $('#seriesList').html(html); //innerHTML = html
            },
            error: function() {
                alert("Se ha producido un error");
            }
        });
    }

    $("#reloadSeriesButton").on("click", reloadSeries);

    reloadSeries();


    $("#seriesList").on("click", "button", function() {
        console.log("Elimino la serie");
        var self = this;
        var id = $(self).data("serieid"); //cojo el valor del atributo data-serieid del boton
        $.ajax({
            method: 'DELETE',
            url: "/api/series/" + id,
            success: function() {
                alert("Borrado con éxito!");
                //Si aqui llamamos a this, no coge el button, sino la funcion
                $(self).parent().remove();
            },
            error: function() {
                alert("Se ha producido un error");
            }
        });

    });

    //    reloadSeries();
});
