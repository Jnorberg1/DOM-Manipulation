// script.js
function $(sel) {
  return document.querySelector(sel);
}
function $all(sel) {
  return Array.from(document.querySelectorAll(sel));
}

function showFilter() {
  const filter = $("#filterContent");
  const form = $("#newContent");

  // hide add form if open
  if (form) form.style.display = "none";

  // toggle filter menu
  if (!filter) return;
  const isOpen = filter.style.display === "block" || filter.style.display === "";
  filter.style.display = isOpen ? "none" : "block";
}

function showAddNew() {
  const filter = $("#filterContent");
  const form = $("#newContent");

  // hide filter if open
  if (filter) filter.style.display = "none";

  // toggle add form (flex so layout stays consistent)
  if (!form) return;
  const isOpen = form.style.display === "flex";
  form.style.display = isOpen ? "none" : "flex";
}

function filterArticles() {
  const showOpinion = $("#opinionCheckbox")?.checked ?? true;
  const showRecipe = $("#recipeCheckbox")?.checked ?? true;
  const showUpdate = $("#updateCheckbox")?.checked ?? true;

  $all("#articleList article").forEach((article) => {
    const isOpinion = article.classList.contains("opinion");
    const isRecipe = article.classList.contains("recipe");
    const isUpdate = article.classList.contains("update");

    let shouldShow = true;
    if (isOpinion && !showOpinion) shouldShow = false;
    if (isRecipe && !showRecipe) shouldShow = false;
    if (isUpdate && !showUpdate) shouldShow = false;

    article.style.display = shouldShow ? "" : "none";
  });
}

function addNewArticle() {
  const title = $("#inputHeader")?.value.trim() ?? "";
  const text = $("#inputArticle")?.value.trim() ?? "";

  let typeClass = "";
  let typeLabel = "";

  if ($("#opinionRadio")?.checked) {
    typeClass = "opinion";
    typeLabel = "Opinion";
  } else if ($("#recipeRadio")?.checked) {
    typeClass = "recipe";
    typeLabel = "Recipe";
  } else if ($("#lifeRadio")?.checked) {
    typeClass = "update";
    typeLabel = "Update";
  }

  if (!title) {
    alert("Please enter a title.");
    return;
  }
  if (!typeClass) {
    alert("Please select a type.");
    return;
  }
  if (!text) {
    alert("Please enter article text.");
    return;
  }

  const articleList = $("#articleList");
  if (!articleList) return;

  const article = document.createElement("article");
  article.className = typeClass;

  const marker = document.createElement("span");
  marker.className = "marker";
  marker.textContent = typeLabel;

  const h2 = document.createElement("h2");
  h2.textContent = title;

  const pText = document.createElement("p");
  pText.textContent = text;

  const pLink = document.createElement("p");
  const a = document.createElement("a");
  a.href = "moreDetails.html";
  a.textContent = "Read more...";
  pLink.appendChild(a);

  article.appendChild(marker);
  article.appendChild(h2);
  article.appendChild(pText);
  article.appendChild(pLink);

  articleList.prepend(article);

  $("#inputHeader").value = "";
  $("#inputArticle").value = "";
  $("#opinionRadio").checked = false;
  $("#recipeRadio").checked = false;
  $("#lifeRadio").checked = false;

  filterArticles();
}

document.addEventListener("DOMContentLoaded", () => {
  // filter is visible by default (matches example), but apply filtering once
  if ($("#articleList")) filterArticles();
});
