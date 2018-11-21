const baseLink = "http://joshkap.com/huset/wp-json/wp/v2/";
const template = document.querySelector("#event-details-template").content;
const params = new URLSearchParams(window.location.search);
const eventID = params.get("eventid");

function loadOne(eventID) {
  fetch(baseLink + "events/" + eventID + "?_embed")
    .then(e => e.json())
    .then(showOne);
}

function showOne(event) {
  console.log(event);
  const clone = template.cloneNode(true);
  const eventDetailsImg = clone.querySelector(".event-details-img-div img");

  if (event._embedded["wp:featuredmedia"][0].media_details.sizes.large) {
    eventDetailsImg.src =
      event._embedded[
        "wp:featuredmedia"
      ][0].media_details.sizes.large.source_url;
  } else {
    eventDetailsImg.src =
      event._embedded[
        "wp:featuredmedia"
      ][0].media_details.sizes.full.source_url;
  }

  /*

  clone.querySelector("h2").textContent = grocery.title.rendered;
  clone.querySelector(".price span").textContent = grocery.acf.price;
  clone.querySelector(".unitsize span").textContent = grocery.acf.unit_size;
  clone.querySelector("#description").innerHTML = grocery.content.rendered;
  */
  document.querySelector("main").appendChild(clone);
}

loadOne(eventID);
