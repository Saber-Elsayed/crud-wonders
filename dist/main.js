const source = $("#wonders-template").html();
const template = Handlebars.compile(source);

const render = function (wonders) {
  $("#wonders").empty();
  let newHtml = template({ wonders });
  $("#wonders").append(newHtml);
};

const fetch = function () {
  $.get("/wonders", function (response) {
    render(response);
  });
};

const addWonder = function () {
  let newWonder = $("#new-wonder-input").val();
  let newLocation = $("#new-location-input").val();
  //POST the newWonder to the server
  let data = { name: newWonder, location: newLocation };
  console.log(data);
  $.post("/wonder", data, function (response) {
    fetch();
    console.log("POST complete");
  });
};

const updateVisited = function (wonder) {
  console.log(wonder);
  $.ajax({
    url: `wonders/${wonder}`,
    method: "PUT",
    success: function (response) {
      console.log("PUT complete");
    },
  });
  fetch();
};

$.ajax({
  url: "/wonder/Colosseum",
  method: "DELETE",
  success: function () {},
});

$("#wonders").on("click", ".visit", function () {
  let wonder = $(this).closest(".wonder").find(".name").text();
  updateVisited(wonder.split("-")[0].trim());
  //PUT this to the server: update the wonder's `visited` status to `true`
});

fetch(); //load the data on page load
