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
  const eventName = event.title.rendered;
  const eventVenue = event.acf.venue;
  const eventDate = event.acf.date;
  const eventTime = event.acf.time;
  const admissionType = event.acf.payment_type;
  const ticketPrice = event.acf.ticket_price;
  const doorPrice = event.acf.door_price;
  const eventImg = clone.querySelector(".event-img");
  const description = event.content.rendered;
  const youtubeLink = event.acf.youtube_link;
  const facebookLink = event.acf.facebook_link;

  const ticketLink = event.acf.ticket_link;

  /* Picking 2nd item in array from categories (because each post has 2x categories) */
  const eventCats = event.categories[2];

  if (eventCats === 16) {
    clone.querySelector(".event-category-h3").textContent = "Stand Up";
  } else if (eventCats === 21) {
    clone.querySelector(".event-category-h3").textContent = "Storytelling";
  }

  clone.querySelector(".event-name-h2").textContent = eventName;
  clone.querySelector(".event-venue-p").textContent = eventVenue;
  clone.querySelector(".date-span").textContent =
    eventDate.substring(6, 8) + "/" + eventDate.substring(4, 6);
  clone.querySelector(".time-span").textContent = eventTime;
  clone.querySelector(".admission-span").textContent = admissionType;
  clone.querySelector(".event-description p").innerHTML = description;

  // Checking to see if there is a ticket price or door price, setting price accordingly.
  if (ticketPrice) {
    clone.querySelector(".price-span").textContent = ticketPrice;
  } else if (doorPrice) {
    clone.querySelector(".price-span").textContent = doorPrice;
  } else if (ticketPrice && doorPrice) {
    clone.querySelector(".price-span").textContent =
      ticketPrice + " + " + doorPrice + " at Door";
  }

  clone.querySelector(".event-buy-ticket-btn").href = ticketLink;

  if (admissionType === "FREE") {
    clone.querySelector(".end").remove();
    clone.querySelector(".event-buy-ticket-btn").remove();
  } else if (admissionType === "PAY AT DOOR") {
    clone.querySelector(".event-buy-ticket-btn").remove();
  }

  if (admissionType === "BUY TICKET") {
    clone.querySelector(".admission-span").remove();
    clone.querySelector(".dash-span").remove();
  }

  if (event._embedded["wp:featuredmedia"][0].media_details.sizes.large) {
    eventImg.src =
      event._embedded[
        "wp:featuredmedia"
      ][0].media_details.sizes.large.source_url;
  } else {
    eventImg.src =
      event._embedded[
        "wp:featuredmedia"
      ][0].media_details.sizes.full.source_url;
  }

  //If theres extra buttons
  if (youtubeLink) {
    clone.querySelector(".yt-a").href = youtubeLink;
  } else {
    clone.querySelector(".yt-a").remove();
  }

  if (facebookLink) {
    clone.querySelector(".fb-a").href = facebookLink;
  } else {
    clone.querySelector(".fb-a").remove();
  }

  document.querySelector("main").appendChild(clone);
}

loadOne(eventID);
