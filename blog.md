---
layout: blog
title: Blog
permalink: /blog/
---

<head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>

<script src="https://unpkg.com/@phosphor-icons/web"></script>

<!-- Buttons to filter by category (e.g. travel, projects, school, etc.) which will be tags, as well as chronological, and search bar. -->

<!-- Search bar -->
<div class="search-wrapper">
  <i class="ph-bold ph-magnifying-glass search-icon"></i>
  <input type="text" id="archive-search" placeholder="Search experiences...">
</div>

<div class="blog-controls-bar">
  <!-- Left Side: Clean Category Text Links -->
  <div class="category-links">
    <span class="category-item active" data-filter="all">All</span>
    <span class="category-item" data-filter="ai">AI</span>
    <span class="category-item" data-filter="robotics">Robotics</span>
    <span class="category-item" data-filter="tech">Tech</span>
    <span class="category-item" data-filter="tutorials">Tutorials</span>
    <span class="category-item" data-filter="career">Career</span>
    <span class="category-item" data-filter="leadership">Leadership</span>
    <span class="category-item" data-filter="engineering">Engineering</span>
    <span class="category-item" data-filter="life">Life</span>
  </div>
  <!-- Right Side: Custom Dropdown for Chronological Sorting -->
  <div class="blog-sort-wrapper">
    <div class="custom-sort-trigger" id="sort-trigger-btn" data-value="recent">
      <span class="trigger-text">Most Recent</span>
      <span class="trigger-chevron"></span>
    </div>
    <!-- The custom dropdown list overlay -->
    <ul class="custom-sort-options" id="sort-options-list">
      <li class="sort-option active" data-value="recent">Most Recent</li>
      <li class="sort-option" data-value="oldest">Oldest</li>
    </ul>
  </div>
</div>


<script>
(function() {
  if (window.blogEngineInitialized) return;
  window.blogEngineInitialized = true;

  // Track all three core states globally within the scope
  let currentFilter = "all";
  let currentSearchQuery = "";

  // Visibility evaluation function for filtering and searching
  function applyBlogFilteringAndSearch() {
    const cards = document.querySelectorAll(".blog-entry-wrapper");
    
    cards.forEach(card => {
      // 1. Get data from the card wrapper attributes
      const cardCategory = card.dataset.category || "";
      
      // 2. Extract text for search (Scrapes title, tags, or description inside card)
      const cardText = card.textContent.toLowerCase();

      // Check Category Match
      const matchesCategory = (currentFilter === "all" || cardCategory === currentFilter);
      
      // Check Text Search Match
      const matchesSearch = cardText.includes(currentSearchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = ""; 
      } else {
        card.style.display = "none"; 
      }
    });
  }

  function initBlogEngine() {
    const filterContainer = document.querySelector(".category-links");
    const gridContainer = document.querySelector(".blog-terminal-grid");
    const triggerBtn = document.getElementById("sort-trigger-btn");
    const optionsList = document.getElementById("sort-options-list");
    
    // Find your existing search input bar (Targeting standard input selectors)
    const searchInput = document.getElementById("archive-search");

    if (!gridContainer) return;

    // Get input changes
    if (searchInput) {
      searchInput.addEventListener("input", function(e) {
        currentSearchQuery = e.target.value.toLowerCase().trim();
        applyBlogFilteringAndSearch();
      });
    }

    // Check for filter container and set up click events
    if (filterContainer) {
      const items = filterContainer.querySelectorAll(".category-item");

      items.forEach(item => {
        item.addEventListener("click", function() {
          const selected = this.dataset.filter;
          
          items.forEach(i => i.classList.remove("active"));
          this.classList.add("active");

          currentFilter = selected;
          applyBlogFilteringAndSearch();
        });
      });
    }

    // Dropdown and sorting logic
    if (triggerBtn && optionsList) {
      const triggerText = triggerBtn.querySelector(".trigger-text");
      const options = optionsList.querySelectorAll(".sort-option");

      triggerBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        optionsList.classList.toggle("open");
      });

      document.addEventListener("click", function(e) {
        if (!e.target.closest(".blog-sort-wrapper")) {
          optionsList.classList.remove("open");
        }
      });

      options.forEach(option => {
        option.addEventListener("click", function() {
          const sortOrder = this.dataset.value;

          triggerText.textContent = this.textContent;
          triggerBtn.setAttribute("data-value", sortOrder);

          options.forEach(opt => opt.classList.remove("active"));
          this.classList.add("active");

          const cards = Array.from(gridContainer.querySelectorAll(".blog-entry-wrapper"));

          cards.sort((cardA, cardB) => {
            const dateStrA = cardA.dataset.date;
            const dateStrB = cardB.dataset.date;
            
            const dateA = new Date(dateStrA);
            const dateB = new Date(dateStrB);

            return sortOrder === "recent" ? (dateB - dateA) : (dateA - dateB);
          });

          gridContainer.innerHTML = "";
          cards.forEach(card => gridContainer.appendChild(card));
          
          applyBlogFilteringAndSearch();
        });
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBlogEngine);
  } else {
    initBlogEngine();
  }
})();
</script>