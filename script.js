var converter = new showdown.Converter()

// Function to create the accordion with the JSON data
function createAccordion(jsonData) {
  var template = document.getElementById('accordion-template').innerHTML;
  var container = document.getElementById('accordion-container');

  jsonData.forEach(function(section) {
    // Replace placeholders in the template with actual data
    var accordionItem = template
      .replace('{title}', section.service.title)
      .replace('{desc}', converter.makeHtml(section.service.desc))
      .replace('{body}', converter.makeHtml(section.service.body))
      .replace('{ideas}', converter.makeHtml(section.ideas))
      

    // Append the item to the container
    container.innerHTML += accordionItem;
  });

  // Accordion functionality
  var acc = document.getElementsByClassName("accordion");
  for (var i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }
}

// Fetch the JSON file and then create the accordion
fetch('./result.json')
  .then(response => response.json())
  .then(data => createAccordion(data))
  .catch(error => console.error('Error fetching the JSON data:', error));
