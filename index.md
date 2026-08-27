---
layout: home-experience
hide_footer: true
full_width: true
title: Home
permalink: /
destinations:
  - { name: "Home", id: "hero" }
  - { name: "Experience", id: "flight-path" }
  - { name: "Projects", id: "destinations" }
  - { name: "Blogs", id: "travel-logs" }
  - { name: "Contact", id: "contact" }
---

<head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
<script src="https://unpkg.com/@phosphor-icons/web"></script>

<section class="home-section" id="hero">
<div class="sky-container"></div>

  <!-- Desktop Version -->
  <div class="passport-desktop">
  <div class="passport-card">
    <div class="passport-inner">
      <div class="passport-left">
        <div class="profile-photo-area">
          <div class="sheen-layer"></div> <img src="assets\images\id_headshot.jpg" alt="Your Name">
        </div>
        <div class="passport-id-code">P<CAN<<<<<<ALAM<<DIBA<<<<<<<<<<<<<<<<2026<<<</div>
      </div>
      <div class="passport-right">
        <div class="passport-column">
          <div class="field-group">
            <span class="field-label">NAME // SURNAME</span>
            <h1 class="passport-name">Diba Alam</h1>
          </div>
          <div class="field-group">
            <span class="field-label">SPECIALIZATION // CORE_SYSTEMS</span>
            <p class="passport-subtitle">Machine Intelligence, Robotics, & Systems Design Engineering</p>
          </div>      
        </div>
          <div class="field-group">
            <span class="field-label">BIOMETRIC_DATA // BIO</span>
            <div class="passport-description-box">
              <p>Engineering Science student at the University of Toronto specializing in autonomy. Focused on bridging the gap between intelligent algorithms and physical robotic systems. Experience in space robotics applications.</p>
            </div>
          </div>
        <div class="passport-actions">
          <a href="{{ '/blog/' | relative_url }}" class="btn-stamp">RESUME</a>
          <a href="{{ '/blog/' | relative_url }}" class="btn-stamp">BLOG</a>
          <a href="{{ '/contact/' | relative_url }}" class="btn-stamp">CONTACT</a>
        </div>
      </div>
    </div>
  </div>
  </div>

  <!-- Mobile Version -->
  <div class="passport-mobile">
  <div class="passport-card">
    <div class="passport-inner">
      <div class="passport-top">
        <div class="profile-photo-area">
          <div class="sheen-layer"></div> <img src="assets\images\id_headshot.jpg" alt="Your Name">
        </div>
        <div class="passport-id-code">P<CAN<<<<<<ALAM<<DIBA<<<<<<<<<<<<<<<<2026<<<</div>
        <div class="passport-column">
          <div class="field-group">
            <span class="field-label">NAME // SURNAME</span>
            <h1 class="passport-name">Diba Alam</h1>
          </div>
          <div class="field-group">
            <span class="field-label">SPECIALIZATION // CORE_SYSTEMS</span>
            <p class="passport-subtitle">Machine Intelligence, Robotics, & Systems Design</p>
          </div>      
        </div>
      </div>
      <div class="passport-bottom">
        <div class="field-group" id="biometric-data-group">
          <span class="field-label" id="biometric-data">BIOMETRIC_DATA // BIO</span>
          <div class="passport-description-box">
            <p>Engineering Science student at the University of Toronto specializing in autonomy. Focused on bridging the gap between intelligent algorithms and physical robotic systems. Experience in space robotics applications.</p>
          </div>
        </div>
        <div class="passport-actions">
          <button class="btn-stamp">RESUME</button>
          <button class="btn-stamp">BLOG</button>
          <button class="btn-stamp">CONTACT</button>
        </div>
      </div>
    </div>
  </div>
  </div>


</section>

<div class="wrapper">
  <section class="home-section" id="flight-path">
    <div class="home-header-container">
      <div class="header-wrapper">
        <h1 class="header-title">Experience</h1>
          <div class="header-line"></div>
        <span class="header-caption">Highlights of My Journey</span>
      </div>
    </div>
    <div class="departure-board">
      {% assign sorted_timeline = site.data.timeline | sort: "order" %}
      {% for entry in sorted_timeline %}
        {% if entry.featured == true %}
          <div class="flight-row">
            <div class="logo-col">
              <div class="logo-box">
                <img src="{{ entry.logo }}" class="logo-img">
              </div>
            </div>
            <div class="destination-col">
              <div class="company">{{ entry.company }}</div>
              <div class="description">{{ entry.description }}</div>
              <div class="role">{{ entry.title }}</div>
            </div>
            <div class="time-col">{{ entry.date_range }}</div>
          </div>
        {% endif %}
      {% endfor %}
    </div>
  </section>
</div>

<div class="wrapper">
  <section class="home-section" id="destinations">
    <div class="home-header-container">
      <div class="header-wrapper">
        <h1 class="header-title">Projects</h1>
          <div class="header-line"></div>
        <span class="header-caption">Things I've Built</span>
      </div>
    </div>
    <div class="airport-terminal">
      <div class="cargo-bay entry"></div>
      <div class="cargo-bay exit"></div>
      <div class="conveyor-belt">
        <div class="belt-track" id="beltTrack">
          {% assign featured_projects = site.data.projects | where: "featured", true %}
          {% for project in featured_projects offset: 1 %}
          <div class="postcard-wrapper clone">
            <div class="postcard-card">
              <span class="postmark">{{ project.location }} — {{ project.date }}</span>
              <h3>{{ project.title }}</h3>
              <p class="typewriter-text">{{ project.description }}</p>
              <a href="{{ project.link | relative_url }}" class="ticket-link">View Itinerary</a>
            </div>
          </div>
          {% endfor %}
          {% for project in featured_projects %}
          <div class="postcard-wrapper">
            <div class="postcard-card">
              <span class="postmark">{{ project.location }} — {{ project.date }}</span>
              <h3>{{ project.title }}</h3>
              <p class="typewriter-text">{{ project.description }}</p>
              <a href="{{ project.link | relative_url }}" class="ticket-link">View Itinerary</a>
            </div>
          </div>
          {% endfor %}
          {% for project in featured_projects limit: 2%}
          <div class="postcard-wrapper clone">
            <div class="postcard-card">
              <span class="postmark">{{ project.location }} — {{ project.date }}</span>
              <h3>{{ project.title }}</h3>
              <p class="typewriter-text">{{ project.description }}</p>
              <a href="{{ project.link | relative_url }}" class="ticket-link">View Itinerary</a>
            </div>
          </div>
          {% endfor %}
        </div>
      </div>
    </div>

    <div class="carousel-controls">
      <button class="nav-btn prev" onclick="moveCarousel(-1)">
        <span class="label">REV</span>
      </button>
      
      <button class="nav-btn next" onclick="moveCarousel(1)">
        <span class="label">FWD</span>
      </button>
    </div>


  </section>
</div>

<div class="wrapper">
  <section class="home-section" id="travel-logs">
    <div class="home-header-container">
      <div class="header-wrapper">
        <h1 class="header-title">Logbook</h1>
          <div class="header-line"></div>
        <span class="header-caption">Notes & Stories</span>
      </div>
    </div>

      <div class="postcard-grid">
        {% assign featured_posts = site.posts | where: "featured", true %}
        {% for post in featured_posts limit: 4 %}
        {% assign brand = site.series_settings[post.category] %}
        {% assign current_color = brand.color | default: "blue" %}
        {% assign category_posts = site.categories[post.category] %}
        {% assign total_category_posts = category_posts | size %}

        {% for c_post in category_posts %}
            {% if c_post.url == post.url %}
            {% assign display_index = total_category_posts | minus: forloop.index | plus: 1 %}
            {% if display_index < 10 %}
                {% assign final_index = display_index | prepend: '0' %}
            {% else %}
                {% assign final_index = display_index %}
            {% endif %}
            {% endif %}
        {% endfor %}
          <div class="postcard-item">
            {% include blog-card.html 
              title=post.title 
              show_image=false
              color=current_color
              date=post.date 
              url=post.url 
              description=post.excerpt
              index=final_index
              hide_stub=true
              hide_banner_right=true %}
          </div>
        {% endfor %}
      </div>
  </section>
</div>

<div class="wrapper">
  <section class="home-section" id="contact">
    <div class="home-header-container">
      <div class="header-wrapper">
        <h1 class="header-title">Beyond the Desk</h1>
          <div class="header-line"></div>
        <span class="header-caption">The Human Element</span>
      </div>
    </div>

    <div class="contact-terminal-area">
      <p></p>
    </div>

    <section class="funfacts-section">
      <!-- Wavy Dotted Path Background -->
      <div class="wavy-line-container">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M 0,60 Q 120,-35 240,40 T 480,40 T 720,40 T 960,40 T 1200,60" 
                fill="none" 
                stroke="#bdbdbd" 
                stroke-width="2" 
                stroke-dasharray="6,6" />
        </svg>
      </div>

      <div class="funfacts-grid">
        {% for fact in site.data.funfacts %}
          <div class="funfact-item">
            <!-- Icon Circle Container -->
            <div class="icon-circle" style="background-color: {{ fact.color }};">
              {% if fact.icon == 'swimmer' %}
                <i class="fa-solid fa-person-swimming fa-lg"></i>
              {% elsif fact.icon == 'music' %}
                <i class="fa-solid fa-music fa-lg"></i>
              {% elsif fact.icon == 'globe' %}
                <i class="fa-solid fa-globe fa-lg"></i>
              {% elsif fact.icon == 'plane' %}
                <i class="fa-solid fa-plane fa-lg"></i>
              {% elsif fact.icon == 'feather' %}
                <i class="fa-solid fa-feather fa-lg"></i>
              {% elsif fact.icon == 'camera' %}
                <i class="fa-solid fa-camera fa-lg"></i>
              {% endif %}
            </div>
            
            <!-- Text content -->
            <h3 class="fact-title">{{ fact.title }}</h3>

            <!-- Fixed height wrapper for description text -->
            <div class="fact-text-container">
              <p class="fact-description">{{ fact.description }}</p>
            </div>

            <!-- Check if this specific fact entry has a custom link assigned -->
            {% if fact.link_url %}
              <a href="{{ fact.link_url }}" class="fact-cta-btn">
                <span class="btn-text-desktop">{{ fact.link_text | default: "Learn More" }}</span>
                <span class="btn-text-mobile">Explore!</span>
                <i class="ph ph-arrow-up-right"></i>
              </a>
            {% endif %}
          </div>
        {% endfor %}
      </div>
    </section>

    <section class="contact-cta-section">
      <div class="contact-cta-container">
        <div class="cta-text">
          <h2>Let's build something together.</h2>
          <p>Whether you want to talk robotics, explore collaboration opportunities, exchange travel tips, or just say hello, my inbox is always open.</p>
        </div>
        
        <div class="cta-action">
          <a href="mailto:diba.alam@mail.utoronto.ca" class="cta-button">
            Get in Touch <i class="ph-bold ph-caret-right"></i>
          </a>
          
          <!-- Social icons placed cleanly right beneath your main button -->
          <div class="cta-socials">
            <a href="https://github.com/dibaalam" target="_blank" aria-label="GitHub">
              <i class="ph ph-github-logo"></i>
            </a>
            <a href="https://linkedin.com/in/diba-alam" target="_blank" aria-label="LinkedIn">
              <i class="ph ph-linkedin-logo"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  </section>
</div>


<script src="{{ '/assets/js/main.js' | relative_url }}"></script>
