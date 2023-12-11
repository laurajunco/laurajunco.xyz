const buttons = document.querySelectorAll(".work-nav a");

init();

function init() {
  // Add event listeners
  for (const button of buttons) {
    button.addEventListener("click", (event) => {
      updateCategories(event.target.dataset.link);
      event.preventDefault();
    });
  }
}

function updateCategories(category) {
  filterSelection(category);
  updateMenuButtons(category);
}

// hide and unhide elements in each category
function filterSelection(cat) {
  const projects = document.querySelectorAll("a.project");

  for (const project of projects) {
    const category = project.dataset.category;

    if (!cat || category === cat) {
      project.classList.remove("hidden");
    } else {
      project.classList.add("hidden");
    }
  }
}

// update style for the category links
function updateMenuButtons(cat) {
  for (const button of buttons) {
    const category = button.dataset.link;

    if (category === cat) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  }
}
