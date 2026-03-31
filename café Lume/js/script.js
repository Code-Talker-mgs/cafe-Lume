"use strict";
{
  
  // ブラウザのスクロール復元挙動を制御（戻った時にトップを表示）
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  // ハンバーガーメニュー
  const initHamburgerMenu = () => {
    const navItem = document.querySelector(".nav-items");
    const hamburger = document.querySelector(".hamburger-btn");
    const overlay = document.querySelector(".overlay");
    if (!navItem || !hamburger || !overlay) return;
    
    const navLinks = navItem.querySelectorAll("a");

    // メニューを閉じる共通処理
    const closeMenu = () => {
      if (navItem.classList.contains("open")) {
        hamburger.setAttribute("aria-expanded", "false");
        hamburger.classList.remove("active");
        navItem.classList.remove("open");
        overlay.classList.remove("active");
        document.body.classList.remove("no-scroll");
        hamburger.focus();
      }
    };

    // メニューの開閉切り替え
    hamburger.addEventListener("click", () => {
      const isExpanded = hamburger.getAttribute("aria-expanded") === "true";

      hamburger.setAttribute("aria-expanded", !isExpanded);
      navItem.classList.toggle("open");
      hamburger.classList.toggle("active");
      overlay.classList.toggle("active");
      document.body.classList.toggle("no-scroll");

      if (!isExpanded && navLinks.length > 0) {
        navLinks[0].focus();
      }
    });

    // オーバーレイをクリックしたら閉じる
    overlay.addEventListener("click", closeMenu);

    // Escapeキーで閉じる
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    });

    // 外側をクリックしたら閉じる
    document.addEventListener("click", (e) => {
      if (
        navItem.classList.contains("open") &&
        !navItem.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        closeMenu();
      }
    });
  };

  // テーマの切り替え(ダークテーマ)
  const initDarkTheme = () => {
    const themeBtn = document.querySelector(".theme-btn");
    const icon = themeBtn?.querySelector(".material-symbols-outlined");
    const themeText = document.querySelector(".theme-text");
    const savedTheme = localStorage.getItem("theme");

    // アイコンと文字を更新する関数
    const updateUI = (isDark) => {
      if (icon) {
        icon.textContent = isDark ? "dark_mode" : "sunny";
      }
      if (themeText) {
        themeText.textContent = isDark ? "明るくする" : "暗くする";
      }
    };

    // ページ読み込み時に保存された設定を反映
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
      updateUI(true);
    }

    // クリックイベント
    themeBtn?.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark-mode");
      // UIを更新
      updateUI(isDark);
      // ローカルストレージの保存
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  };

  // トップに戻るボタン
  const initScrollTopButton = () => {
    const topBtn = document.querySelector(".top-button");
    const logoLink = document.querySelector(".site-logo");
    if (!topBtn) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        topBtn.classList.add("show");
      } else {
        topBtn.classList.remove("show");
      }
    });

    topBtn.addEventListener("click", () => {
      if (window.innerWidth > 768) {
        // スムーズスクロールのアニメーションが終わるのを待ってからフォーカスを当てる
        setTimeout(function () {
          logoLink?.focus();
        }, 500);
      }
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  };

  // オブザーバーAPI
  const initObserver = () => {
    const fadeIn = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2, //要素が20％見えたら実行
      },
    );
    fadeIn.forEach((item) => {
      observer.observe(item);
    });
  };

  // FAQアコーディオンの初期化(AI作)
  const initAccordionMenu = () => {
    // FAQアコーディオンの排他制御
    const allFaqItems = document.querySelectorAll(".faq-item");

    allFaqItems.forEach((faqItem) => {
      // <details>要素の開閉状態が変化した時（toggleイベント）に実行
      faqItem.addEventListener("toggle", (event) => {
        // もし開いた状態（openプロパティがtrue）になったら
        if (faqItem.open) {
          allFaqItems.forEach((item) => {
            if (item !== faqItem) {
              // そのアイテムを閉じる
              item.open = false;
            }
          });
        }
      });
    });
  };

  window.addEventListener("DOMContentLoaded", () => {
    initHamburgerMenu();
    initDarkTheme();
    initScrollTopButton();
    initObserver();
    initAccordionMenu();
  });
}
