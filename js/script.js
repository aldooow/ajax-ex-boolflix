// 8269547e83cd87d7a77b566ccaff24bd
//  https://api.themoviedb.org/3/movie/550?api_key=8269547e83cd87d7a77b566ccaff24bd

$(document).ready(
  function(){


    $("#js_button-search").on("click", function(){
      $(".wrapper-film").text("");
      var value = $("#js_search").val()
      var queryValue = "'" + value + "'"
      console.log(queryValue)
      $.ajax(
      {
        url: 'https://api.themoviedb.org/3/search/movie',
        method: 'GET',
        data: {
          api_key: '8269547e83cd87d7a77b566ccaff24bd',
          query: queryValue
        },
        success: function(data){


          // Variante pagina Corrente
          $(".page").text(data.page)
          // Handlebars.
          var source = $("#film-template").html();
          var template = Handlebars.compile(source);

          // Variante dei risultati del Inpunt dei Films
          var films = data.results;
          // Ciclo FOR con Lunghezza della Variante che contiene tutta la risposta URL.
             for(var i = 0; i<films.length; i++){
               // Variante di singolo Film che è dentro l'Array.
               var film = data.results[i];
               // TEMPLATE da Appendere.
               var html = template(film);
               // Appendere TEMPLATE HTML nel Elemento desiderato.
               $(".wrapper-film").append(html);
             }

         // Alla fine Resettare il Search.
         $("#js_search").val("");

        },
        error: function(){
            alert('ERROR');
        }
        }
    );
    });



  });
