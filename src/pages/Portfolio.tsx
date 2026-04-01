import { createSignal, createEffect, onMount, onCleanup } from "solid-js";
import emailjs from "@emailjs/browser";

// Translation data
const translations = {
  id: {
    // Navigation
    nav: {
      home: "Beranda",
      about: "Tentang",
      skills: "Keahlian",
      experience: "Pengalaman",
      projects: "Proyek",
      workexperience: "Pengalaman Kerja",
      contact: "Kontak",
    },
    // Roles
    roles: ["Web Developer", "UI/UX Designer", "Mobile Developer"],
    // Home section
    home: {
      viewWork: "Lihat Karya Saya",
      getInTouch: "Hubungi Saya",
    },
    // About section
    about: {
      title: "Tentang Saya",
      subtitle: "Pengembang & Desainer Bersemangat",
      description1:
        "Perjalanan saya ke dunia IT dimulai sejak usia dini dengan ketertarikan pada teknologi sejak sekolah dasar. Melalui pendidikan di SMP Telkom Purwokerto, saya membangun fondasi yang kuat dalam IT dan teknologi digital. Kemudian, saya melanjutkan pendidikan di SMK Telkom Purwokerto untuk memperdalam keahlian saya. Selama perjalanan ini, saya menjadi mahir dalam desain UI/UX, pengembangan web fullstack, dan pengembangan aplikasi mobile. Saya menikmati menciptakan aplikasi yang bersih, fungsional, dan berfokus pada pengguna yang menyelesaikan masalah dunia nyata sambil memberikan pengalaman pengguna yang luar biasa.",
      description2:
        "Saya berkembang baik sebagai pemain tim maupun sebagai pemimpin, berkat pola pikir kepemimpinan yang kuat dan semangat kolaboratif saya. Entah memimpin proyek atau berkontribusi sebagai bagian dari tim, saya selalu berusaha memberikan nilai melalui kreativitas, keterampilan teknis, dan komunikasi yang jelas.",
      skills: ["Pemecahan Masalah", "Kepemimpinan Tim", "Pemikiran Kreatif", "Pengembangan Agile"],
    },
    // Skills section
    skills: {
      title: "Keahlian",
    },
    // Experience section
    experience: {
      title: "Pengalaman",
      items: [
        {
          title: "Sekolah Menengah Pertama",
          company: "SMP Telkom Purwokerto",
          period: "2020 - 2023",
          description: "Menyelesaikan pendidikan sekolah menengah pertama dengan fokus pada pengembangan akademik dan ekstrakurikuler.",
        },
        {
          title: "Sekolah Menengah Kejuruan",
          company: "SMK Telkom Purwokerto",
          period: "2023 - Sekarang",
          description: "Mengejar pendidikan vokasi dengan spesialisasi dalam keterampilan teknis dan profesional.",
        },
      ],
    },
    // Projects section
    projects: {
      title: "Proyek",
      viewMore: "Lihat Lebih Banyak",
      viewLess: "Lihat Lebih Sedikit",
      liveDemo: "Demo Live",
      github: "GitHub",
      noDemo: "Proyek ini tidak memiliki demo langsung",
      items: [
        {
          title: "LibertyWalk Company Profile",
          description:
            "Website profil perusahaan front-end sederhana untuk Liberty Walk, dibangun dengan HTML dan CSS. Menampilkan identitas merek, layanan, dan portofolio visual dalam tata letak yang bersih.",
        },
        {
          title: "To-do List",
          description:
            "Aplikasi web daftar tugas yang sederhana dan intuitif untuk membantu Anda tetap terorganisir dan produktif. Tambahkan, centang, dan kelola tugas harian Anda dengan mudah.",
        },
        {
          title: "Book a Book",
          description:
            "Sistem backend untuk mengelola peminjaman buku di perpustakaan digital. Mencakup fitur seperti manajemen data buku, pelacakan anggota, dan status peminjaman.",
        },
        {
          title: "Customer Relationship Management",
          description:
            "Aplikasi backend untuk mengelola data pelanggan dan memvisualisasikan diagram hubungan, mendukung fungsionalitas CRM seperti pelacakan interaksi dan analitik.",
        },
        {
          title: "Evolix Clothes",
          description:
            "Website e-commerce fullstack untuk Evolix, toko pakaian modern. Menampilkan penelusuran produk, sistem keranjang, dan manajemen pengguna dengan UI yang bersih",
        },
        {
          title: "MindMate",
          description:
            "Aplikasi pendamping kesehatan mental yang suportif dirancang untuk membantu individu melacak suasana hati, menulis jurnal harian, dan mendapatkan wawasan — dibangun untuk mempromosikan kesadaran diri dan kesejahteraan emosional.",
        },
        {
          title: "Soulmatch",
          description:
            "Aplikasi matchmaking yang menyenangkan yang menghitung kompatibilitas cinta menggunakan nama, tanggal lahir, dan tanda zodiak — dirancang untuk tujuan hiburan.",
        },
      ],
    },
    // Work Experience section
    workExperience: {
      title: "Pengalaman Kerja",
      items: [
        {
          position: "Fullstack Web Developer",
          company: "PT. Smartelco Solusi Teknologi",
          period: "Praktik Kerja Lapangan (PKL)",
          description: "Mengembangkan dan memelihara aplikasi web fullstack menggunakan teknologi modern. Berkolaborasi dengan tim untuk menyelesaikan fitur dan memperbaiki bug.",
          documentation: [
            "/dokumentasi1.jpeg",
            "/dokumentasi2.jpg",
            "/dokumentasi3.jpeg",
            "/dokumentasi4.jpg",
          ],
          certificate: ["/certificate.png"],
        },
      ],
    },
    // Contact section
    contact: {
      title: "Hubungi Saya",
      subtitle: "Mari Bekerja Sama",
      description:
        "Saya selalu tertarik dengan peluang dan proyek baru. Apakah Anda membutuhkan website, aplikasi mobile, atau hanya ingin membahas ide, saya ingin mendengar dari Anda.",
      form: {
        name: "Nama",
        email: "Email",
        message: "Pesan",
        namePlaceholder: "Nama Anda",
        emailPlaceholder: "email@anda.com",
        messagePlaceholder: "Pesan Anda di sini...",
        send: "Kirim Pesan",
        sending: "Mengirim...",
        allFieldsRequired: "Harap isi semua kolom!",
        invalidEmail: "Format email tidak valid!",
        successMessage: "Pesan terkirim dengan sukses! Terima kasih.",
        errorPrefix: "Gagal mengirim pesan: ",
      },
      contact: {
        email: "Email",
        phone: "Telepon",
        location: "Lokasi",
      },
    },
    // Footer
    footer: "© 2025 Muhammad Fardan Wicaksana - Portfolio. Semua hak cipta dilindungi.",
  },
  en: {
    // Navigation
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      workexperience: "Work Experience",
      contact: "Contact",
    },
    // Roles
    roles: ["Web Developer", "UI/UX Designer", "Mobile Developer"],
    // Home section
    home: {
      viewWork: "View My Work",
      getInTouch: "Get In Touch",
    },
    // About section
    about: {
      title: "About Me",
      subtitle: "Passionate Developer & Designer",
      description1:
        "My journey into the world of IT began at a young age, with a fascination for technology since elementary school. Through my studies at SMP Telkom Purwokerto, I built a solid foundation in IT and digital technologies. I continued this path at SMK Telkom Purwokerto, deepening my expertise in the IT field. Over the years, I've become proficient in UI/UX design, fullstack web development, and mobile app development. I enjoy crafting clean, functional, and user-focused applications that not only solve real-world problems but also deliver delightful user experiences.",
      description2:
        "I thrive both as a team player and as a leader, thanks to my strong leadership mindset and collaborative spirit. Whether I'm leading a project or contributing as part of a team, I always aim to bring value through creativity, technical skill, and clear communication.",
      skills: ["Problem Solving", "Team Leadership", "Creative Thinking", "Agile Development"],
    },
    // Skills section
    skills: {
      title: "Skills",
    },
    // Experience section
    experience: {
      title: "Experience",
      items: [
        {
          title: "Junior High School",
          company: "SMP Telkom Purwokerto",
          period: "2020 - 2023",
          description: "Completed junior high school education, focusing on academic and extracurricular development.",
        },
        {
          title: "Vocational High School",
          company: "SMK Telkom Purwokerto",
          period: "2023 - Present",
          description: "Pursued vocational education, specializing in technical and professional skills.",
        },
      ],
    },
    // Projects section
    projects: {
      title: "Projects",
      viewMore: "View More",
      viewLess: "View Less",
      liveDemo: "Live Demo",
      github: "GitHub",
      noDemo: "This project has no live demo",
      items: [
        {
          title: "LibertyWalk Company Profile",
          description:
            "Simple front-end company profile website for Liberty Walk, built with HTML and CSS. It highlights the brand's identity, services, and visual portfolio in a clean layout.",
        },
        {
          title: "To-do List",
          description:
            "Simple and intuitive to-do list web app to help you stay organized and productive. Quickly add, check, and manage your daily tasks with ease.",
        },
        {
          title: "Book a Book",
          description:
            "Backend system for managing book loans in a digital library. Includes features like book data management, member tracking, and loan status.",
        },
        {
          title: "Customer Relationship Management",
          description:
            "Backend app to manage customer data and visualize relationship diagrams, supporting CRM functionalities like interaction tracking and analytics.",
        },
        {
          title: "Evolix Clothes",
          description:
            "Fullstack e-commerce website for Evolix, a modern clothing store. Features product browsing, cart system, and user management with a clean UI",
        },
        {
          title: "MindMate",
          description:
            "Supportive mental health companion app designed to help individuals track moods, write daily journals, and gain insights — built to promote self-awareness and emotional well-being.",
        },
        {
          title: "Soulmatch",
          description:
            "Fun matchmaking app that calculates love compatibility using names, birthdates, and zodiac signs — designed for entertainment purposes.",
        },
      ],
    },
    // Work Experience section
    workExperience: {
      title: "Work Experience",
      items: [
        {
          position: "Fullstack Web Developer",
          company: "PT. Smartelco Solusi Teknologi",
          period: "Internship (PKL)",
          description: "Developed and maintained fullstack web applications using modern technologies. Collaborated with team members to implement features and fix bugs.",
          documentation: [
            "/dokumentasi1.jpeg",
            "/dokumentasi2.jpg",
            "/dokumentasi3.jpeg",
            "/dokumentasi4.jpg",
          ],
          certificate: ["certificate.png"],
        },
      ],
    },
    // Contact section
    contact: {
      title: "Get In Touch",
      subtitle: "Let's Work Together",
      description:
        "I'm always interested in new opportunities and exciting projects. Whether you need a website, mobile app, or just want to discuss ideas, I'd love to hear from you.",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        namePlaceholder: "Your name",
        emailPlaceholder: "your@email.com",
        messagePlaceholder: "Your message here...",
        send: "Send Message",
        sending: "Sending...",
        allFieldsRequired: "Please fill in all fields!",
        invalidEmail: "Invalid email format!",
        successMessage: "Message sent successfully! Thank you.",
        errorPrefix: "Failed to send message: ",
      },
      contact: {
        email: "Email",
        phone: "Phone",
        location: "Location",
      },
    },
    // Footer
    footer: "© 2025 Muhammad Fardan Wicaksana - Portfolio. All rights reserved.",
  },
};

const Portfolio = () => {
  // State management
  const [darkMode, setDarkMode] = createSignal(true);
  const [language, setLanguage] = createSignal("id");
  const [activeSection, setActiveSection] = createSignal("home");
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);
  const [currentRole, setCurrentRole] = createSignal(0);
  const [displayedText, setDisplayedText] = createSignal("");
  const [isTyping, setIsTyping] = createSignal(true);
  const [isPaused, setIsPaused] = createSignal(false);
  const [singleStarLeft, setSingleStarLeft] = createSignal(Math.random() * 100);
  const [showAllProjects, setShowAllProjects] = createSignal(false);
  const [formStatus, setFormStatus] = createSignal("");
  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [message, setMessage] = createSignal("");
  const [isSending, setIsSending] = createSignal(false);
  const [showPopup, setShowPopup] = createSignal(false);
  const [popupMessage, setPopupMessage] = createSignal("");

  // Helper function for translations
  const t = (key: string) => {
    const lang = language();
    const keys = key.split(".");
    let value: any = translations[lang];
    for (const k of keys) {
      value = value[k];
    }
    return value;
  };

  const roles = () => t("roles");
  const nav = () => t("nav");
  const aboutText = () => t("about");
  const skillsText = () => t("skills");
  const experienceText = () => t("experience");
  const projectsText = () => t("projects");
  const workExperienceText = () => t("workExperience");
  const contactText = () => t("contact");
  const formText = () => t("contact.form");

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode());
  };

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(language() === "id" ? "en" : "id");
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  // Typing animation effect
  createEffect(() => {
    const current = currentRole();
    const text = roles()[current];
    let index = isTyping() ? displayedText().length : displayedText().length - 1;
    let pauseTime = 0;

    const interval = setInterval(() => {
      if (isPaused()) {
        pauseTime += 50;
        if (pauseTime >= 4000) {
          setIsPaused(false);
          setIsTyping(false);
          pauseTime = 0;
        }
        return;
      }

      if (isTyping()) {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          setIsPaused(true);
        }
      } else {
        if (index >= 0) {
          setDisplayedText(text.slice(0, index));
          index--;
        } else {
          setCurrentRole((prev) => (prev + 1) % roles().length);
          setDisplayedText("");
          setIsTyping(true);
          index = 0;
        }
      }
    }, isTyping() && !isPaused() ? 100 : 50);

    onCleanup(() => clearInterval(interval));
  });

  // Pop-up auto-dismiss after 2 seconds
  createEffect(() => {
    if (showPopup()) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 2000);
      onCleanup(() => clearTimeout(timer));
    }
  });

  // Update single star position and initialize EmailJS
  onMount(() => {
    // Inisialisasi EmailJS dengan User ID
    emailjs.init("YOUR_USER_ID"); // Ganti dengan User ID dari EmailJS

    const positionInterval = setInterval(() => {
      setSingleStarLeft(Math.random() * 100);
    }, 5000);

    // Intersection observer for active section and animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            entry.target.classList.add("animate__animated", "animate__fadeIn");
            entry.target.classList.remove("animate__fadeOut");
          } else {
            entry.target.classList.add("animate__animated", "animate__fadeOut");
            entry.target.classList.remove("animate__fadeIn");
          }
        });
      },
      { threshold: 0.3 }
    );

    ["home", "about", "skills", "experience", "projects", "workexperience", "contact"].forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    console.log("Starfield initialized for home section");

    return () => {
      observer.disconnect();
      clearInterval(positionInterval);
    };
  });

  // Fungsi untuk mengirim email
  const sendEmail = (e) => {
    e.preventDefault();
    setFormStatus("");

    // Validasi sederhana
    if (!name() || !email() || !message()) {
      setFormStatus(formText().allFieldsRequired);
      return;
    }

    // Validasi format email sederhana
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email())) {
      setFormStatus(formText().invalidEmail);
      return;
    }

    setIsSending(true);

    const templateParams = {
      from_name: name(),
      from_email: email(),
      message: message(),
      to_email: "muhammadfardanwicaksana@gmail.com",
    };

    emailjs
      .send(
        "service_5qbowa6", 
        "template_6dl9jfw", 
        templateParams,
        "weEicAkIEDK6WkFTK"
      )
      .then(
        () => {
          setFormStatus(formText().successMessage);
          setName("");
          setEmail("");
          setMessage("");
        },
        (error) => {
          setFormStatus(formText().errorPrefix + error.text);
        }
      )
      .finally(() => setIsSending(false));
  };

  // Data definitions
  const skills = [
    { name: "UI/UX Design", level: 90, color: "bg-purple-500" },
    { name: "Laravel", level: 80, color: "bg-red-500" },
    { name: "SolidJS", level: 40, color: "bg-blue-600" },
    { name: "JavaScript", level: 45, color: "bg-yellow-500" },
    { name: "TypeScript", level: 35, color: "bg-blue-400" },
    { name: "Tailwind CSS", level: 75, color: "bg-teal-500" },
    { name: "Kotlin", level: 65, color: "bg-purple-600" },
    { name: "C#", level: 55, color: "bg-green-600" },
  ];

  const experiences = () => experienceText().items;

  const projects = () => {
    const p = projectsText().items.map((proj, i) => {
      const configs = [
        { image: "/projects/libertywalk.png", tech: ["HTML", "CSS"], demo: "https://lbwk-company-profile.vercel.app/", github: "https://github.com/xiorw/LBWK_CompanyProfile", hasLiveDemo: true },
        { image: "/projects/todolist.jpg", tech: ["HTML", "CSS", "JavaScript"], demo: "https://to-do-list-app-sooty-omega.vercel.app/", github: "https://github.com/xiorw/To-Do-List_App", hasLiveDemo: true },
        { image: "/projects/bookabook.jpg", tech: ["PHP", "Laravel", "Blade", "JavaScript"], demo: "#", github: "https://github.com/xiorw/WebTechBook", hasLiveDemo: false },
        { image: "/projects/crm.jpg", tech: ["PHP", "Laravel", "Blade", "JavaScript"], demo: "#", github: "https://github.com/xiorw/CRMSystem", hasLiveDemo: false },
        { image: "/projects/evolixclothes.png", tech: ["PHP", "Laravel", "Blade", "TailwindCSS", "JavaScript"], demo: "https://evolixclothes-static.vercel.app/", github: "https://github.com/xiorw/evolixclothes", hasLiveDemo: true },
        { image: "/projects/mindmate.png", tech: ["SolidJS", "TypeScript", "TailwindCSS"], demo: "https://mind-mate-fe.vercel.app/", github: "https://github.com/xiorw/MindMate-fe", hasLiveDemo: true },
        { image: "/projects/soulmatch.jpg", tech: ["Kotlin"], demo: "#", github: "https://github.com/xiorw/Soulmatch_MK4B", hasLiveDemo: false },
      ];
      return { ...proj, ...configs[i] };
    });
    return p;
  };

  return (
    <div class={`min-h-screen transition-all duration-300 ${darkMode() ? "dark bg-gray-900" : "bg-white"}`} style={{ "--star-color": darkMode() ? "#ffffff" : "#2563eb", "--star-glow": darkMode() ? "rgba(255, 255, 255, 0.8)" : "rgba(37, 99, 5, 0.8)" }}>
      {/* Include animate.css */}
      <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" rel="stylesheet" />

      {/* Custom CSS for typing animation and starfield */}
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          .cursor {
            animation: blink 0.7s step-end infinite;
          }
          .search-bar {
            display: inline-flex;
            align-items: center;
            padding: 0.5rem 1rem;
            border: 2px solid;
            border-radius: 0.5rem;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .starfield {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: visible;
            z-index: 0;
            pointer-events: none;
          }
          .star {
            position: absolute;
            border-radius: 50%;
            background: var(--star-color);
            opacity: 0.7;
            animation: twinkle 3s infinite ease-in-out;
          }
          .star--small {
            width: 2px;
            height: 2px;
            animation-duration: ${() => Math.random() * 2 + 2}s;
          }
          .star--medium {
            width: 4px;
            height: 4px;
            animation-duration: ${() => Math.random() * 3 + 2}s;
          }
          .falling-star {
            position: absolute;
            width: 3px;
            height: 3px;
            background: var(--star-color);
            box-shadow: 0 0 12px 2px var(--star-glow);
            animation: fall 2s linear infinite;
            transform-origin: center;
          }
          @keyframes twinkle {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 0.2; }
          }
          @keyframes fall {
            0% {
              transform: translate(0, 0) rotate(45deg);
              opacity: 1;
            }
            100% {
              transform: translate(-2000px, 100vh); rotate(45deg);
              opacity: 0;
            }
          }
        `}
      </style>

      {/* Navigation */}
      <nav
        class={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          darkMode() ? "bg-gray-900/95 border-gray-700" : "bg-white/95 border-gray-200"
        } backdrop-blur-md border-b`}
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center">
              <span class={`text-2xl font-bold ${darkMode() ? "text-white" : "text-gray-900"}`}>Frad</span>
            </div>

            {/* Desktop Menu */}
            <div class="flex-1 flex justify-center">
              <div class="hidden md:flex items-baseline space-x-4">
                {["home", "about", "skills", "experience", "projects", "workexperience", "contact"].map((section) => (
                  <button
                    onClick={() => scrollToSection(section)}
                    class={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md capitalize ${
                      activeSection() === section
                        ? "bg-blue-500 text-white"
                        : darkMode()
                        ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    {nav()[section] || section}
                  </button>
                ))}
              </div>
            </div>

            {/* Dark Mode Toggle, Language Toggle & Mobile Menu Button */}
            <div class="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                class={`p-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-110 ${
                  darkMode() ? "bg-gray-800 text-yellow-400" : "bg-gray-100 text-gray-600"
                }`}
              >
                {darkMode() ? (
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              <button
                onClick={toggleLanguage}
                class={`p-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-110 text-sm font-semibold ${
                  darkMode() ? "bg-gray-800 text-blue-400" : "bg-gray-100 text-blue-600"
                }`}
              >
                {language() === "id" ? "EN" : "ID"}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen())}
                class={`md:hidden p-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-110 ${
                  darkMode() ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen() && (
          <div class={`md:hidden ${darkMode() ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"} border-t animate__animated animate__slideInDown`}>
            <div class="px-2 pt-2 pb-3 space-y-1">
              {["home", "about", "skills", "experience", "projects", "workexperience", "contact"].map((section) => (
                <button
                  onClick={() => scrollToSection(section)}
                  class={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ease-in-out transform hover:scale-105 capitalize ${
                    activeSection() === section
                      ? "bg-blue-500 text-white"
                      : darkMode()
                      ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {nav()[section] || section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Home Section */}
      <section
        id="home"
        class={`min-h-screen flex items-center justify-center px-4 relative ${
          darkMode() ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 to-indigo-100"
        }`}
      >
        {/* Starfield Background */}
        <div class="starfield">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              class={`star ${Math.random() > 0.5 ? "star--small" : "star--medium"}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                "animation-delay": `${Math.random() * 2}s`,
              }}
            ></div>
          ))}
          <div
            class="falling-star"
            style={{
              left: `${singleStarLeft()}%`,
              top: `0%`,
              "animation-delay": `2s`,
            }}
          ></div>
        </div>

        <div class="max-w-4xl mx-auto text-center relative z-10">
          <div class="mb-8">
            <div class="relative inline-block">
              <div class="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
                <div
                  class={`w-full h-full rounded-full ${darkMode() ? "bg-gray-900" : "bg-white"} flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:rotate-8`}
                >
                  <span class={`text-4xl font-bold ${darkMode() ? "text-white" : "text-gray-900"}`}>Frad</span>
                </div>
              </div>
              <div class="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
          </div>

          <h1 class={`text-4xl md:text-6xl font-bold mb-4 ${darkMode() ? "text-white" : "text-gray-900"}`}>
            Muhammad Fardan
            <span class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Wicaksana</span>
          </h1>

          <div class={`text-xl md:text-2xl mb-8 ${darkMode() ? "text-gray-300" : "text-gray-600"}`}>
            <div
              class={`search-bar ${darkMode() ? "bg-gray-800 border-gray-700 text-blue-600" : "bg-white border-gray-300 text-blue-600"}`}
            >
              <span class="font-semibold">{displayedText()}</span>
              <span class="cursor text-blue-600 dark:text-blue-400">|</span>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection("projects")}
              class="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              {t("home.viewWork")}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              class={`px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white hover:scale-105 transition-all duration-300 ${
                darkMode() ? "border-blue-400 text-blue-400 hover:bg-blue-400" : ""
              }`}
            >
              {t("home.getInTouch")}
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" class={`py-20 px-4 ${darkMode() ? "bg-gray-800" : "bg-white"}`}>
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class={`text-4xl font-bold mb-4 ${darkMode() ? "text-white" : "text-gray-900"} animate__animated animate__fadeIn`}>{aboutText().title}</h2>
            <div class="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>

          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div
                class={`aspect-square rounded-2xl bg-gradient-to-br ${
                  darkMode() ? "from-blue-900 to-purple-900" : "from-blue-100 to-purple-100"
                } p-8 transition-transform duration-300 hover:scale-105`}
              >
                <img
                  src="/frad.png"
                  alt="Muhammad Fardan Wicaksana"
                  class="w-full h-full rounded-2xl object-cover"
                />
              </div>
            </div>

            <div>
              <h3 class={`text-2xl font-bold mb-6 ${darkMode() ? "text-white" : "text-gray-900"}`}>{aboutText().subtitle}</h3>
              <p class={`text-lg mb-6 leading-relaxed ${darkMode() ? "text-gray-300" : "text-gray-600"}`}>
                {aboutText().description1}
              </p>
              <p class={`text-lg mb-6 leading-relaxed ${darkMode() ? "text-gray-300" : "text-gray-600"}`}>
                {aboutText().description2}
              </p>

              <div class="flex flex-wrap gap-3">
                {aboutText().skills.map((skill) => (
                  <span
                    class={`px-4 py-2 rounded-full text-sm font-medium transition-transform duration-300 hover:scale-110 hover:shadow-md ${
                      darkMode() ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" class={`py-20 px-4 ${darkMode() ? "bg-gray-900" : "bg-gray-50"}`}>
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class={`text-4xl font-bold mb-4 ${darkMode() ? "text-white" : "text-gray-900"} animate__animated animate__fadeIn`}>{skillsText().title}</h2>
            <div class="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            {skills.map((skill) => (
              <div
                class={`p-6 rounded-xl ${darkMode() ? "bg-gray-800" : "bg-white"} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
              >
                <div class="flex items-center justify-between mb-3">
                  <span class={`font-semibold ${darkMode() ? "text-white" : "text-gray-900"}`}>{skill.name}</span>
                  <span class={`text-sm ${darkMode() ? "text-gray-400" : "text-gray-600"}`}>{skill.level}%</span>
                </div>
                <div class={`w-full bg-gray-200 rounded-full h-2 ${darkMode() ? "bg-gray-700" : ""}`}>
                  <div class={`h-2 rounded-full transition-all duration-1000 ${skill.color} animate__animated animate__pulse`} style={{ width: `${skill.level}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" class={`py-20 px-4 ${darkMode() ? "bg-gray-800" : "bg-white"}`}>
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class={`text-4xl font-bold mb-4 ${darkMode() ? "text-white" : "text-gray-900"} animate__animated animate__fadeIn`}>{experienceText().title}</h2>
            <div class="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>

          <div class="relative">
            <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600 animate__animated animate__pulse"></div>

            <div class="space-y-8">
              {experiences().map((exp) => (
                <div class="relative flex items-start">
                  <div class="absolute left-6 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-800 animate-pulse"></div>
                  <div class="ml-16">
                    <div
                      class={`p-6 rounded-xl ${darkMode() ? "bg-gray-900" : "bg-gray-50"} hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                    >
                      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                        <h3 class={`text-xl font-bold ${darkMode() ? "text-white" : "text-gray-900"}`}>{exp.title}</h3>
                        <span
                          class={`text-sm font-medium px-3 py-1 rounded-full transition-transform duration-300 hover:scale-110 hover:shadow-md ${
                            darkMode() ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {exp.period}
                        </span>
                      </div>
                      <p class={`text-lg font-medium mb-2 ${darkMode() ? "text-blue-400" : "text-blue-600"}`}>{exp.company}</p>
                      <p class={`${darkMode() ? "text-gray-300" : "text-gray-600"}`}>{exp.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" class={`py-20 px-4 ${darkMode() ? "bg-gray-900" : "bg-gray-50"}`}>
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class={`text-4xl font-bold mb-4 ${darkMode() ? "text-white" : "text-gray-900"} animate__animated animate__fadeIn`}>{projectsText().title}</h2>
            <div class="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(showAllProjects() ? projects() : projects().slice(0, 3)).map((project) => (
              <div
                class={`rounded-xl overflow-hidden ${darkMode() ? "bg-gray-800" : "bg-white"} shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
              >
                <div
                  class={`aspect-video bg-gradient-to-br ${
                    darkMode() ? "from-blue-900 to-purple-900" : "from-blue-100 to-purple-100"
                  }`}
                >
                  <img src={project.image} alt={project.title} class="w-full h-full object-cover transition-transform duration-500 hover:scale-110 hover:rotate-3" />
                </div>
                <div class="p-6">
                  <h3 class={`text-xl font-bold mb-2 ${darkMode() ? "text-white" : "text-gray-900"}`}>{project.title}</h3>
                  <p class={`mb-4 ${darkMode() ? "text-gray-300" : "text-gray-600"}`}>{project.description}</p>

                  <div class="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        class={`px-3 py-1 text-xs rounded-full transition-transform duration-300 hover:scale-110 hover:shadow-md ${
                          darkMode() ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div class="flex gap-3">
                    <button
                      onClick={() => {
                        if (project.hasLiveDemo) {
                          window.location.href = project.demo;
                        } else {
                          setPopupMessage(projectsText().noDemo);
                          setShowPopup(true);
                        }
                      }}
                      class="flex-1 text-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                    >
                      {projectsText().liveDemo}
                    </button>
                    <a
                      href={project.github}
                      class={`flex-1 text-center py-2 px-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 ${
                        darkMode() ? "border-blue-400 text-blue-400 hover:bg-blue-400" : ""
                      }`}
                    >
                      {projectsText().github}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div class="text-center mt-8">
            <button
              onClick={() => setShowAllProjects(!showAllProjects())}
              class={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                darkMode()
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {showAllProjects() ? projectsText().viewLess : projectsText().viewMore}
            </button>
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="workexperience" class={`py-20 px-4 ${darkMode() ? "bg-gray-900" : "bg-gray-50"}`}>
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class={`text-4xl font-bold mb-4 ${darkMode() ? "text-white" : "text-gray-900"} animate__animated animate__fadeIn`}>{workExperienceText().title}</h2>
            <div class="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>

          <div class="space-y-12">
            {workExperienceText().items.map((work) => (
              <div
                class={`rounded-xl overflow-hidden ${darkMode() ? "bg-gray-800" : "bg-white"} shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
              >
                <div class="p-8">
                  <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <h3 class={`text-2xl font-bold ${darkMode() ? "text-white" : "text-gray-900"}`}>{work.position}</h3>
                      <p class={`text-lg font-medium ${darkMode() ? "text-blue-400" : "text-blue-600"}`}>{work.company}</p>
                    </div>
                    <span
                      class={`text-sm font-medium px-4 py-2 rounded-full mt-4 md:mt-0 transition-transform duration-300 hover:scale-110 hover:shadow-md ${
                        darkMode() ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {work.period}
                    </span>
                  </div>

                  <p class={`text-lg mb-8 ${darkMode() ? "text-gray-300" : "text-gray-600"}`}>
                    {work.description}
                  </p>

                  <div class="space-y-6">
                    {/* Documentation Section - 2x2 grid layout */}
                    <div>
                      <p class={`text-sm font-semibold mb-3 ${darkMode() ? "text-gray-400" : "text-gray-700"}`}>Dokumentasi</p>
                      <div class="grid grid-cols-2 gap-3">
                        {Array.isArray(work.documentation) ? (
                          work.documentation.map((doc, index) => (
                            <div
                              class={`aspect-video rounded-lg bg-gradient-to-br ${
                                darkMode() ? "from-gray-700 to-gray-600" : "from-gray-200 to-gray-100"
                              } flex items-center justify-center overflow-hidden border-2 border-dashed ${
                                darkMode() ? "border-gray-600" : "border-gray-300"
                              } hover:shadow-lg transition-shadow duration-300`}
                            >
                              <img
                                src={doc}
                                alt={`Dokumentasi ${index + 1}`}
                                class="w-full h-full object-cover"
                                onerror={(e) => (e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Doc')}
                              />
                            </div>
                          ))
                        ) : (
                          <div
                            class={`aspect-video rounded-lg bg-gradient-to-br ${
                              darkMode() ? "from-gray-700 to-gray-600" : "from-gray-200 to-gray-100"
                            } flex items-center justify-center overflow-hidden border-2 border-dashed ${
                              darkMode() ? "border-gray-600" : "border-gray-300"
                            }`}
                          >
                            <img
                              src={work.documentation}
                              alt="Dokumentasi"
                              class="w-full h-full object-cover"
                              onerror={(e) => (e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Doc')}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Certificate Section - 1 image row */}
                    <div>
                      <p class={`text-sm font-semibold mb-3 ${darkMode() ? "text-gray-400" : "text-gray-700"}`}>Sertifikat</p>
                      <div class="flex flex-col sm:flex-row gap-3">
                        {Array.isArray(work.certificate) ? (
                          work.certificate.map((cert, index) => (
                            <div
                              class={`flex-1 aspect-[1.41/1] rounded-lg bg-gradient-to-br ${
                                darkMode() ? "from-gray-700 to-gray-600" : "from-gray-200 to-gray-100"
                              } flex items-center justify-center overflow-hidden border-2 border-dashed ${
                                darkMode() ? "border-gray-600" : "border-gray-300"
                              } hover:shadow-lg transition-shadow duration-300`}
                            >
                              <img
                                src={cert}
                                alt={`Sertifikat ${index + 1}`}
                                class="w-full h-full object-cover"
                                onerror={(e) => (e.currentTarget.src = 'https://via.placeholder.com/300x210?text=Certificate')}
                              />
                            </div>
                          ))
                        ) : (
                          <div
                            class={`flex-1 aspect-[1.41/1] rounded-lg bg-gradient-to-br ${
                              darkMode() ? "from-gray-700 to-gray-600" : "from-gray-200 to-gray-100"
                            } flex items-center justify-center overflow-hidden border-2 border-dashed ${
                              darkMode() ? "border-gray-600" : "border-gray-300"
                            }`}
                          >
                            <img
                              src={work.certificate}
                              alt="Sertifikat"
                              class="w-full h-full object-cover"
                              onerror={(e) => (e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Certificate')}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" class={`py-20 px-4 ${darkMode() ? "bg-gray-800" : "bg-white"}`}>
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class={`text-4xl font-bold mb-4 ${darkMode() ? "text-white" : "text-gray-900"} animate__animated animate__fadeIn`}>{contactText().title}</h2>
            <div class="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>

          <div class="grid md:grid-cols-2 gap-12">
            <div>
              <h3 class={`text-2xl font-bold mb-6 ${darkMode() ? "text-white" : "text-gray-900"}`}>{contactText().subtitle}</h3>
              <p class={`text-lg mb-8 ${darkMode() ? "text-gray-300" : "text-gray-600"}`}>
                {contactText().description}
              </p>

              <div class="space-y-4">
                <a href="mailto:muhammadfardanwicaksana@gmail.com" class="flex items-center transition-transform duration-300 hover:scale-105">
                  <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p class={`font-semibold ${darkMode() ? "text-white" : "text-gray-900"}`}>{contactText().contact.email}</p>
                    <p class={`${darkMode() ? "text-gray-300" : "text-gray-600"}`}>muhammadfardanwicaksana@gmail.com</p>
                  </div>
                </a>

                <a href="tel:+6281575279212" class="flex items-center transition-transform duration-300 hover:scale-105">
                  <div class="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p class={`font-semibold ${darkMode() ? "text-white" : "text-gray-900"}`}>{contactText().contact.phone}</p>
                    <p class={`${darkMode() ? "text-gray-300" : "text-gray-600"}`}>+62 815 7527 9212</p>
                  </div>
                </a>

                <a href="https://www.google.com/maps/search/?api=1&query=Purwokerto,+Indonesia" target="_blank" class="flex items-center transition-transform duration-300 hover:scale-105">
                  <div class="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p class={`font-semibold ${darkMode() ? "text-white" : "text-gray-900"}`}>{contactText().contact.location}</p>
                    <p class={`${darkMode() ? "text-gray-300" : "text-gray-600"}`}>Purwokerto, Indonesia</p>
                  </div>
                </a>
              </div>
            </div>

            <div class={`p-8 rounded-xl ${darkMode() ? "bg-gray-900" : "bg-gray-50"} shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105`}>
              <form class="space-y-6" onSubmit={sendEmail}>
                <div>
                  <label class={`block text-sm font-medium mb-2 ${darkMode() ? "text-white" : "text-gray-900"}`}>{formText().name}</label>
                  <input
                    type="text"
                    value={name()}
                    onInput={(e) => setName(e.target.value)}
                    class={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-blue-600 transition-all duration-300 ${
                      darkMode() ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300"
                    }`}
                    placeholder={formText().namePlaceholder}
                  />
                </div>

                <div>
                  <label class={`block text-sm font-medium mb-2 ${darkMode() ? "text-white" : "text-gray-900"}`}>{formText().email}</label>
                  <input
                    type="email"
                    value={email()}
                    onInput={(e) => setEmail(e.target.value)}
                    class={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-blue-600 transition-all duration-300 ${
                      darkMode() ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300"
                    }`}
                    placeholder={formText().emailPlaceholder}
                  />
                </div>

                <div>
                  <label class={`block text-sm font-medium mb-2 ${darkMode() ? "text-white" : "text-gray-900"}`}>{formText().message}</label>
                  <textarea
                    rows={4}
                    value={message()}
                    onInput={(e) => setMessage(e.target.value)}
                    class={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-blue-600 transition-all duration-300 ${
                      darkMode() ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300"
                    }`}
                    placeholder={formText().messagePlaceholder}
                  ></textarea>
                </div>

                {formStatus() && (
                  <p class={`text-sm ${formStatus().includes("succes") || formStatus().includes("terkirim") ? "text-green-500" : "text-red-500"}`}>{formStatus()}</p>
                )}

                <button
                  type="submit"
                  disabled={isSending()}
                  class={`w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 ${
                    isSending() ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSending() ? formText().sending : formText().send}
                </button>
              </form>
            </div>
          </div>

          {/* Social Links */}
          <div class="mt-16 text-center">
            <div class="flex justify-center space-x-6">
              <a
                href="https://x.com/fardan167288"
                class={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-6 ${
                  darkMode() ? "bg-gray-700 text-white hover:bg-black" : "bg-gray-100 text-gray-700 hover:bg-black hover:text-white"
                }`}
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 1200 1227" xmlns="http://www.w3.org/2000/svg">
                  <path d="M714.317 553.742L1162.14 0H1057.02L671.277 488.699 345.346 0H0L470.228 705.763 0 1227H105.694L516.207 708.278 866.245 1227H1200L714.317 553.742ZM564.417 643.006L523.775 584.611 166.305 91.3964H301.159L608.323 539.783 648.965 598.178 1033.78 1134.74H898.926L564.417 643.006Z"/>
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/in/muhammad-fardan-wicaksana-490805328/"
                class={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-6 ${
                  darkMode() ? "bg-gray-700 text-white hover:bg-blue-600" : "bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white"
                }`}
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              <a
                href="https://github.com/xiorw"
                class={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-6 ${
                  darkMode() ? "bg-gray-700 text-white hover:bg-gray-800" : "bg-gray-100 text-gray-700 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>

              <a
                href="https://www.instagram.com/frraddn/"
                class={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-6 ${
                  darkMode() ? "bg-gray-700 text-white hover:bg-red-400" : "bg-gray-100 text-gray-700 hover:bg-red-400 hover:text-white"
                }`}
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href="https://wa.me/+6281575279212"
                class={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-6 ${
                  darkMode() ? "bg-gray-700 text-white hover:bg-green-500" : "bg-gray-100 text-gray-700 hover:bg-green-500 hover:text-white"
                }`}
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.134.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.074-.149-.669-.719-.911-.99-.241-.271-.471-.247-.669-.148-.198.099-1.487.698-1.834.897-.347.198-.593.497-.593.796 0 .297.247.998.694 1.744.446.746 1.34 2.033 3.252 3.252 1.912 1.219 3.753 1.614 4.498 1.814.744.198 1.39.074 1.834-.223.446-.297.892-.645 1.039-.943.149-.297.149-.595.074-.744-.074-.149-.297-.347-.594-.496zM12 0C5.373 0 0 5.373 0 12c0 2.137.561 4.248 1.626 6.082L.047 24l5.975-1.573A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22.297c-1.977 0-3.84-.586-5.426-1.598l-.39-.195-3.54.932.936-3.446-.198-.387C2.346 16.098 1.703 14.23 1.703 12.297c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer class={`py-8 px-4 ${darkMode() ? "bg-gray-900 border-t border-gray-700" : "bg-gray-50 border-t border-gray-200"}`}>
        <div class="max-w-6xl mx-auto text-center">
          <p class={`${darkMode() ? "text-gray-400" : "text-gray-600"}`}>{t("footer")}</p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={() => scrollToSection("home")}
        class={`fixed bottom-8 right-8 w-12 h-12 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
          darkMode() ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        <svg class="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>

      {/* Pop-up for No Live Demo */}
      <div
        class={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 px-6 py-4 rounded-lg shadow-lg transition-all duration-300 ${
          showPopup() ? "animate__animated animate__fadeIn" : "animate__animated animate__fadeOut hidden"
        } ${darkMode() ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
        style={{ "max-width": "300px" }}
      >
        <p class="text-center">{popupMessage()}</p>
      </div>
    </div>
  );
};

export default Portfolio;

