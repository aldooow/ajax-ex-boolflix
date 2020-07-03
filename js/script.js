// 8269547e83cd87d7a77b566ccaff24bd
//  https://api.themoviedb.org/3/movie/550?api_key=8269547e83cd87d7a77b566ccaff24bd

$(document).ready(
  function(){


    $("#js_button-search").on("click", function(){
      $("#wrapper-film").html ("");
      var searchValue = $("#js_search").val();

      console.log()

      var valuePage = $(".page").val();
      var valuePageData = parseInt(valuePage)

      $.ajax(
      {
        url: 'https://api.themoviedb.org/3/search/multi',
        method: 'GET',
        data: {
          api_key: '8269547e83cd87d7a77b566ccaff24bd',
          query: searchValue,
          language: 'it-IT'
        },
        success: function(data){
          console.log(data)
          printMovies(data.results);


        },
        error: function(){
            var messageError = "Inserire una chiave giusta";
            printMessageError(messageError);
        }
      }
    );
    });

  });

// -----------------------
// FUNZIONE: printMovies()
// Questa funzione stampa nel html i film contenuti dentro l'Array dato.
// --> moviesArray: è un Array di Objects
function printMovies(moviesArray){
  // Handlebars.
  var source = $("#film-template").html();
  var template = Handlebars.compile(source);
  // Ciclo FOR con Lunghezza della Variante che contiene tutta la risposta URL.
     for(var i = 0; i < moviesArray.length; i++){
       // Variante di singolo Film che è dentro l'Array.
       var film = moviesArray[i];
       var context = {
         title: film.title || film.name,
         original_title: film.original_title || film.original_name,
         language: printFlags(film.original_language),
         vote: printStars(film.vote_average),
         url_poster: printPoster(film.poster_path),
         overview: film.overview
       }
       // TEMPLATE da Appendere.
       var html = template(context)
       // Appendere TEMPLATE HTML nel Elemento desiderato.
       $("#wrapper-film").append(html);
     }
 // Alla fine Resettare il Search.
 $("#js_search").val("");
};

// -----------------------
// FUNZIONE: printMessageError()
// Questa funzione stampa nel html un messaggio nel caso ci fosse un Errore.
// --> message: è una stringa, con un messaggio di Errore.
function printMessageError(message){
  var source = $("#error-template").html();
  var template = Handlebars.compile(source);
  var context = {
    message: message
  };
  var html = template(context);
  $("#wrapper-film").append(html);
};

// -----------------------
// FUNZIONE: printStars()
// Questa funzione crea 5 stelle nel HTML, colorate in percentuale del argomento.
// --> voto: è una numero del 1 al 10.
// RETURN: Stelle da stampare.
function printStars(voto){
  var metaVoto =  Math.floor(voto/2);
  var starHTML = "";
  for(var i = 1; i <= 5; i++){
    if(i <= metaVoto){
      starHTML += '<i class="fas fa-star"></i>';
    }else{
      starHTML += '<i class="far fa-star"></i>';
    }
  }
  return starHTML
}

// -----------------------
// FUNZIONE: printFlags()
// Questa funzione stampa un icona nel HTML,
// --> lingua: è una stringa esp. es, it, en, fr .
// RETURN: una icona da stampare.
function printFlags(lingua){
  var language = lingua;
  var languageArray = ["es", "it", "en", "de", "pt", "fr"]
  var flag = '';
  for(var i=0;i<languageArray.length;i++){
    // se Lingua è uguale a una delle lingue dentro l'Array.
    if(lingua==languageArray[i]){
      // stampo questa icona.. e mi FERMO,
      flag = '<img src="img/flags/' + lingua + '.ico" alt="ico">';
      break
    }
    // altrementi stampo una icona universale.
    else{
      flag = '<img src="img/flags/world.ico" alt="ico">';
    }
  }
  return flag
}

// -----------------------
// FUNZIONE: printPoster()
// Questa funzione stampa la copertina dei Film/SerieTv nel HTML,
// --> poster: è una Stringa URL.
// RETURN: una Stringa URL.
function printPoster(poster){
  var posterImage = 'https://image.tmdb.org/t/p/w342' + poster;
  // Se l'argomento "Poster" è uguale a "Null"
  if(poster == null){
    // Stampo questa URL(NotImage)
    posterImage = 'img/not_img/not-available.png';
  }
  return posterImage
}
