const baseLink = "http://joshkap.com/huset/wp-json/wp/v2/";

const listTemplate = document.querySelector(".eventslist-template").content;

// Creating the params object to be used later for queries within the search bar
const params = new URLSearchParams(window.location.search);

// Loading/fetching the groceries from the JSON file and then running the showAll function afterwards
// Make sure ?_embed is at the end in order to fetch the embedded featured image from wp later
function loadAll() {
  fetch(baseLink + "events?categories=15&_embed")
    .then(e => e.json())
    .then(showAll);
}

// Creating a function to show all data (appending the template clones to the main tag) //
function showAll(data) {
  console.log(data);

  //For Each list item it will change the tags content according to the the list item's field values. //
  data.forEach(event => {
    // Cloning the template and storing it into a constant variable called clone (to be appended later to main)
    const clone = listTemplate.cloneNode(true);
    const eventName = event.title.rendered;
    const eventVenue = event.acf.venue;
    const eventDate = event.acf.date;
    const eventTime = event.acf.time;
    const admissionType = event.acf.payment_type;
    const ticketPrice = event.acf.ticket_price;

    const ticketLink = event.acf.ticket_link;

    /* Picking 2nd item in array from categories (because each post has 2x categories) */
    const eventCats = event.categories[1];

    if (eventCats === 16) {
      clone.querySelector(".event-category-h3").textContent = "Stand Up";
    } else if (eventCats === 21) {
      clone.querySelector(".event-category-h3").textContent = "Storytelling";
    }

    console.log(eventVenue);

    clone.querySelector(".event-name-h2").textContent = eventName;

    clone.querySelector(".event-venue-p").textContent = eventVenue;
    clone.querySelector(".date-span").textContent = eventDate;
    clone.querySelector(".time-span").textContent = eventTime;
    clone.querySelector(".admission-span").textContent = admissionType;
    clone.querySelector(".price-span").textContent = ticketPrice;
    clone.querySelector(".event-buy-ticket-btn").href = ticketLink;

    if (admissionType === "FREE") {
      clone.querySelector(".end").remove();
      clone.querySelector(".event-buy-ticket-btn").remove();
    }

    // Changing the text content to be the fetched fields from JSON for each grocery

    // Setting Img to be the wordpress featured image assigned to each grocery posts (if it exists, otherwise removes <img> from html)
    if (event._embedded["wp:featuredmedia"]) {
      clone.querySelector("img").src =
        event._embedded[
          "wp:featuredmedia"
        ][0].media_details.sizes.medium.source_url;
    } else {
      /* clone.querySelector(".event-article").remove(); */
    }
    // appending the clone to the main tag
    document.querySelector("main").appendChild(clone);
  });
}

// Fetching categories from the JSON file, and then creating the category menu and appending it to the nav on the HTML

loadAll();

//loading all functions
