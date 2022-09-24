function searchMovie() {
  $("#movie-list").html("");

  $.ajax({
    type: "GET",
    url: "http://www.omdbapi.com/",
    dataType: "json",
    data: {
      apikey: "c1d2e72b",
      s: $("#search-input").val(),
    },
    success: function (result) {
      if (result.Response == "True") {
        let movies = result.Search;
        $.each(movies, function (i, data) {
          $("#movie-list").append(`
         <div class="col-md-4 col-lg-3 mt-4">
         <div class="card">
         <img src="${data["Poster"]}" class="card-img-top" alt="...">
         <div class="card-body">
           <h5 class="card-title">${data["Title"]}</h5>
           <p class="card-text">${data["Year"]}</p>
           <a href="#" class="card-link see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${data["imdbID"]}">Watch Detail</a>
         </div>
         </div>
         </div>
         `);
        });

        $("#search-input").val("");
      } else {
        $("#movie-list").html(`<h2 class="text-center fw-bold text-danger">${result.Error}</h2>`);
      }
    },
  });
}
$("#search-button").on("click", function () {
  searchMovie();
});

$("#search-input").on("keyup", function (e) {
  if (e.keyCode === 13) {
    searchMovie();
  }
});

$("#movie-list").on("click", ".see-detail", function () {
  $.ajax({
    type: "GET",
    url: "http://www.omdbapi.com/",
    dataType: "json",
    data: {
      apikey: "c1d2e72b",
      i: $(this).data("id"),
    },
    success: function (movieDetail) {
      if (movieDetail.Response == "True") {
        $(".modal-body").html(`
        <div class="container-fluid">
         <div class="row">
          <div class="col-12  d-flex justify-content-center align-item-center">
           <img heigh="100px" src="${movieDetail.Poster}" class="img-fluid" alt="Image ${movieDetail.Title}">
          </div>
          <div class="col-12">
            <h4 class="text-dark fw-bold text-center">${movieDetail.Title}</h4>
            <table class="table">
             <tbody>
               <tr>
                 <td class="text-start">Genre</td>
                 <td class="text-end">${movieDetail.Genre}</td>
               </tr>
               <tr>
                 <td class="text-start">Director</td>
                 <td class="text-end">${movieDetail.Director}</td>
               </tr>
               <tr>
                 <td class="text-start">Actors</td>
                 <td class="text-end">${movieDetail.Actors}</td>
               </tr>
               <tr>
                 <td class="text-start">Year</td>
                 <td class="text-end">${movieDetail.Year}</td>
               </tr>
               <tr>
                 <td class="text-start">Realised</td>
                 <td class="text-end">${movieDetail.Released}</td>
               </tr>
             </tbody>
             <p class="text-muted">${movieDetail.Plot}</p>
           </table>
          </div>
         </div>
        </div>
      `);
      }
    },
  });
});
