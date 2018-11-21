const baseLink = "http://joshkap.com/huset/wp-json/wp/v2/";

const volunteerTemplate = document.querySelector("#volunteer-page-template")
  .content;

function loadPage() {
  fetch(baseLink + "pages/71")
    .then(e => e.json())
    .then(showPage);
}
function showPage(data) {
  console.log(data);
  const clone = volunteerTemplate.cloneNode(true);

  clone.querySelector(".test").innerHTML = data.content.rendered;

  /* if (event._embedded["wp:featuredmedia"]) {
      clone.querySelector("img").src =
        event._embedded[
          "wp:featuredmedia"
        ][0].media_details.sizes.medium.source_url;
    } else {
      /* clone.querySelector(".event-article").remove();
    } */
  // appending the clone to the main tag
  document.querySelector("main").appendChild(clone);
}

loadPage();
