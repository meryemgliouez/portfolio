/**
 * Portfolio JavaScript - Meryem Gliouez
 * Handles Theme Toggling (Dark/Light), Mobile Navigation,
 * Scroll Spy, Smooth Scrolling, and Project Detail Modals.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNav();
  initScrollSpy();
  initProjectModal();
  updateCurrentYear();
});

/* ----------------------------------------------------
 * Theme Toggler (Dark / Light Mode)
 * Persists user preference via localStorage
 * ---------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIconSun = document.getElementById('icon-sun');
  const themeIconMoon = document.getElementById('icon-moon');

  // Check saved preference or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  applyTheme(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(activeTheme);
      localStorage.setItem('theme', activeTheme);
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      if (themeIconSun) themeIconSun.style.display = 'none';
      if (themeIconMoon) themeIconMoon.style.display = 'block';
    } else {
      if (themeIconSun) themeIconSun.style.display = 'block';
      if (themeIconMoon) themeIconMoon.style.display = 'none';
    }
  }
}

/* ----------------------------------------------------
 * Mobile Navigation Drawer Toggle
 * ---------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      navMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ----------------------------------------------------
 * Scroll Spy for Active Navigation Links
 * ---------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length === 0 || navLinks.length === 0) return;

  function onScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ----------------------------------------------------
 * Project Detail Modal Management
 * ---------------------------------------------------- */
function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const detailButtons = document.querySelectorAll('[data-project-trigger]');

  if (!modal) return;

  const projectDetails = {
    nexus: {
      title: "Nexus AI — Enterprise AI Assistant",
      content: `
        <h4>Overview</h4>
        <p>An enterprise-oriented AI assistant designed to answer questions based on internal documents using Retrieval-Augmented Generation (RAG), large language models, semantic search, and an interactive dashboard.</p>
        
        <h4>Architecture & Core Capabilities</h4>
        <ul>
          <li><strong>Document Parsing & Ingestion:</strong> Processes corporate documentation, reports, and knowledge bases into clean semantic chunks.</li>
          <li><strong>Semantic Embeddings:</strong> Utilizes Sentence Transformers for dense vector representation.</li>
          <li><strong>Vector Retrieval:</strong> ChromaDB vector store enables fast nearest-neighbor similarity search.</li>
          <li><strong>Contextual Generation:</strong> Groq API provides ultra-low latency LLM inference.</li>
          <li><strong>Orchestration:</strong> Structured multi-step workflows driven by LangGraph.</li>
          <li><strong>Evaluation Framework:</strong> Quality and hallucination tracking using RAGAS.</li>
          <li><strong>User Interface:</strong> Streamlit interactive dashboard for intuitive conversational querying.</li>
        </ul>

        <div class="modal-notice">
          <strong>Project Status Notice:</strong> This project is under active engineering and research. Deployment, benchmark results, and production credentials are intentionally kept configurable and verified against the official repository.
        </div>

        <h4>Links</h4>
        <p>Explore code and repository updates on GitHub: <a href="https://github.com/meryemgliouez" target="_blank" rel="noopener noreferrer" style="color: var(--accent-primary); text-decoration: underline;">github.com/meryemgliouez</a></p>
      `
    },
    analytics: {
      title: "Data Analytics Project (Template)",
      content: `
        <h4>Project Placeholder</h4>
        <p>This section is reserved for an upcoming end-to-end Data Analytics case study.</p>
        
        <h4>Suggested Focus Areas</h4>
        <ul>
          <li>Exploratory Data Analysis (EDA) on real-world business datasets</li>
          <li>Interactive KPI Dashboards (Power BI / Tableau / Plotly)</li>
          <li>Statistical hypothesis testing and actionable insights extraction</li>
        </ul>

        <div class="modal-notice">
          <strong>Note:</strong> Update this placeholder with your dataset details, analytical findings, and live demo link once ready.
        </div>
      `
    },
    python: {
      title: "Python Data Analysis Project (Template)",
      content: `
        <h4>Project Placeholder</h4>
        <p>This slot is reserved for a specialized Python-based data engineering or machine learning pipeline.</p>
        
        <h4>Suggested Focus Areas</h4>
        <ul>
          <li>Automated data cleaning and transformation pipeline (Pandas & NumPy)</li>
          <li>Feature engineering and machine learning model evaluation (Scikit-Learn)</li>
          <li>Data visualization and report generation</li>
        </ul>

        <div class="modal-notice">
          <strong>Note:</strong> Replace with your specific Python analysis repository, methodology, and results.
        </div>
      `
    }
  };

  detailButtons.forEach(button => {
    button.addEventListener('click', () => {
      const projectId = button.getAttribute('data-project-trigger');
      const data = projectDetails[projectId];

      if (data) {
        modalTitle.textContent = data.title;
        modalBody.innerHTML = data.content;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ----------------------------------------------------
 * Dynamic Copyright Year
 * ---------------------------------------------------- */
function updateCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
