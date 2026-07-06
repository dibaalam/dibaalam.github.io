---
layout: page
title : Portfolio
permalink: /portfolio/
---

<script src="https://unpkg.com/@phosphor-icons/web"></script>

<div class="portfolio-archive-container">
  <!-- Search bar (not implemented) -->
  <div class="search-wrapper">
    <span class="search-icon">🔍</span>
    <input type="text" id="archive-search" placeholder="Search experiences...">
  </div>

  <div class="view-controls">
    <!-- Category filter buttons -->
    <div class="filter-tags">
      <button class="filter-btn active" data-filter="all">All</button>
      <button class="filter-btn" data-filter="work-experience">Work</button>
      <button class="filter-btn" data-filter="research">Research</button>
      <button class="filter-btn" data-filter="projects">Projects</button>
      <button class="filter-btn" data-filter="education">Education</button>
      <button class="filter-btn" data-filter="leadership">Leadership</button>
      <button class="filter-btn" data-filter="awards">Awards</button>
      <button class="filter-btn" data-filter="volunteering">Volunteering</button>
    </div>
    <!-- Chronological filter controls -->
    <div class="sort-wrapper">
      <label for="timeline-sort">Sort by:</label>
      <select id="timeline-sort">
        <option value="recent">Most Recent</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  </div>

  <!-- Default sorting as reverse chronological -->
  {% assign sorted_timeline = site.data.timeline | sort: 'year' | reverse %}
  {% assign last_year = "" %}

  <div class="timeline-container">
    <!-- Read each entry and assign years -->
    {% for entry in sorted_timeline %}
      {% assign is_first_of_year = false %}
      {% if entry.year != last_year %}
        {% assign is_first_of_year = true %}
        {% assign last_year = entry.year %}
      {% endif %}
      <div class="timeline-row" data-year="{{ entry.year }}" data-category="{{ entry.category | downcase | slugify }}">
        <!-- Include year marker if first of year -->
        <div class="timeline-marker {% if is_first_of_year %}first-of-year{% endif %}">
          <span class="year">{{ entry.year }}</span>
          <div class="timeline-circle"></div>
          <div class="timeline-line"></div>
        </div>
        <!-- Insert card content -->
        <div class="timeline-card" data-year="{{ entry.year }}" data-title="{{ entry.title | downcase }}">
          <div class="card-left {{ entry.category | downcase | slugify}}">
            {% assign category_slug = entry.category | downcase | slugify %}
            {% if category_slug == 'work-experience' %}
              <i class="ph ph-briefcase"></i>
            {% elsif category_slug == 'research' %}
              <i class="ph ph-microscope"></i>
            {% elsif category_slug == 'projects' %}
              <i class="ph ph-gear"></i>
            {% elsif category_slug == 'education' %}
              <i class="ph ph-graduation-cap"></i>
            {% elsif category_slug == 'leadership' %}
              <i class="ph ph-users-three"></i>
            {% elsif category_slug == 'awards' %}
              <i class="ph ph-certificate"></i>
            {% elsif category_slug == 'volunteering' %}
              <i class="ph ph-hand-heart"></i>
            {% else %}
              <i class="ph ph-calendar-blank"></i>
            {% endif %}
          </div>
          <div class="card-body">
            <div class="card-details">
              <span class="category-tag {{ entry.category | downcase | slugify}}">{{ entry.category }}</span>
              <div class="card-title">{{ entry.title }}</div>
              <p class="company">{{ entry.company }}</p>
            </div>
            <div class="card-divider">
              <div class="perforated-line"></div>
            </div>
            <div class="card-meta">
              <div class="card-middle">
                <span class="date-range">{{ entry.date_range }}</span>
              </div>
              <div class="card-right">
                <div class="skills-list">
                  {% for skill in entry.skills %}
                    <span class="skill-badge">{{ skill }}</span>
                  {% endfor %}
                </div>
                {% if entry.link %}
                  <a href="{{ entry.link }}" class="arrow-link">→</a>
                {% endif %}
              </div>
            </div>
          </div>
        </div>
      </div>
    {% endfor %}
  </div>
</div>

<script>
(function() {
  // Prevent double injection if script runs twice
  if (window.portfolioFilterAndSortInitialized) return;
  window.portfolioFilterAndSortInitialized = true;

  // Array of active filters for tracking
  let activeFilters = ["all"];

  function updateFiltering(container) {
    const rows = container.querySelectorAll(".timeline-row");

    // Handle basic category visibility stacking
    rows.forEach(row => {
      const rowCategory = row.dataset.category; 

      if (activeFilters.includes("all")) {
        row.style.display = ""; 
      } else {
        if (activeFilters.includes(rowCategory)) {
          row.style.display = ""; 
        } else {
          row.style.display = "none"; 
        }
      }
      
      // Strip any existing first-of-year marker classes before recalculating
      const marker = row.querySelector(".timeline-marker");
      if (marker) marker.classList.remove("first-of-year");
    });

    // Track which years have already had their first visible dot placed
    const renderedYears = new Set();

    rows.forEach(row => {
      // Skip checking rows that we just hid
      if (row.style.display === "none") return;

      const currentYear = row.dataset.year;
      const marker = row.querySelector(".timeline-marker");

      if (marker && !renderedYears.has(currentYear)) {
        // First visible card for the year, render the year marker
        marker.classList.add("first-of-year");
        renderedYears.add(currentYear);
      }
    });
  }

  function initFiltersAndSorting() {
    const filterContainer = document.querySelector(".filter-tags");
    const container = document.querySelector(".timeline-container");
    const sortDropdown = document.getElementById("timeline-sort");

    if (!filterContainer || !container) return;

    const filterBtns = filterContainer.querySelectorAll(".filter-btn");

    filterBtns.forEach(btn => {
      btn.addEventListener("click", function(e) {
        e.preventDefault();
        const clickedFilter = this.dataset.filter;

        // CASE A: User clicks "All", clear all filters and reset to default
        if (clickedFilter === "all") {
          console.log("All button clicked. Resetting filters.");
          activeFilters = ["all"];
          filterBtns.forEach(b => b.classList.remove("active"));
          this.classList.add("active");
        } 
        // CASE B: User clicks a specific category tag (Work, Research, etc.)
        else {
          console.log(`Category button clicked: ${clickedFilter}`);
          
          // Drop "all" from our tracking array if it was there
          if (activeFilters.includes("all")) {
            activeFilters = [];
            const allBtn = filterContainer.querySelector('[data-filter="all"]');
            if (allBtn) allBtn.classList.remove("active");
          }

          // Toggle the button in the tracking array stack
          if (activeFilters.includes(clickedFilter)) {
            activeFilters = activeFilters.filter(item => item !== clickedFilter);
            this.classList.remove("active"); 
          } else {
            activeFilters.push(clickedFilter);
            this.classList.add("active"); 
          }

          // Fallback: If user untoggles everything, automatically revert to "All"
          if (activeFilters.length === 0) {
            activeFilters = ["all"];
            const allBtn = filterContainer.querySelector('[data-filter="all"]');
            if (allBtn) allBtn.classList.add("active");
          }
        }

        console.log("Active Filters:", activeFilters);
        updateFiltering(container);
      });
    });

    // Sorting dropdown event listener
    if (sortDropdown) {
      sortDropdown.addEventListener("change", function () {
        const sortBy = this.value;
        const rows = Array.from(container.querySelectorAll(".timeline-row"));

        // Calculate sorting based on year data attribute of the timeline cards
        rows.sort((rowA, rowB) => {
          const cardA = rowA.querySelector(".timeline-card");
          const cardB = rowB.querySelector(".timeline-card");
          if (!cardA || !cardB) return 0;

          const yearA = parseInt(cardA.dataset.year);
          const yearB = parseInt(cardB.dataset.year);

          return sortBy === "recent" ? (yearB - yearA) : (yearA - yearB);
        });

        container.innerHTML = "";
        rows.forEach(row => container.appendChild(row));
        updateFiltering(container);
      });
    }
  }

  // Safe Execution Engine lifecycle block
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFiltersAndSorting);
  } else {
    initFiltersAndSorting();
  }
})();
</script>