document.addEventListener("DOMContentLoaded", function () {
    // Descargar PDF (solo la card, fondo blanco, texto oscuro, sin decoraciones)
    const downloadBtn = document.getElementById("download");
    if (downloadBtn) {
        downloadBtn.addEventListener("click", function () {
            const card = document.querySelector(".card");
            if (!card) return;
            // Clonar la card
            const clone = card.cloneNode(true);
            // Quitar botones y decoraciones
            const btn = clone.querySelector("#download");
            if (btn) btn.remove();
            const themeBtn = clone.querySelector("#theme-toggle");
            if (themeBtn) themeBtn.remove();
            // Quitar fondo SVG si existe
            const bg = clone.querySelector(".background-svg");
            if (bg) bg.remove();
            // Aplicar estilos para PDF
            clone.style.background = "#fff";
            clone.style.color = "#222";
            clone.style.boxShadow = "none";
            clone.style.border = "1px solid #ccc";
            clone.style.maxWidth = "700px";
            clone.style.margin = "40px auto";
            clone.style.fontFamily = "Poppins, Arial, sans-serif";
            // Cambiar color de títulos y enlaces
            clone.querySelectorAll('h1,h2,h3,h4,h5').forEach(e=>e.style.color='#0d6efd');
            clone.querySelectorAll('a').forEach(e=>{e.style.color='#0d6efd';e.style.textDecoration='underline'});
            // Eliminar animaciones
            clone.querySelectorAll('[style*="animation"], [class*="glow"], [class*="impact-avatar"]').forEach(e=>{e.style.animation='none'});
            // Crear contenedor temporal
            const tempDiv = document.createElement("div");
            tempDiv.style.position = "fixed";
            tempDiv.style.left = 0;
            tempDiv.style.top = 0;
            tempDiv.style.width = "100vw";
            tempDiv.style.height = "100vh";
            tempDiv.style.background = "#fff";
            tempDiv.style.zIndex = 9999;
            tempDiv.appendChild(clone);
            document.body.appendChild(tempDiv);
            const opt = {
                margin: 0.2,
                filename: "cv.pdf",
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2, backgroundColor: "#fff" },
                jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
                pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
            };
            html2pdf().set(opt).from(clone).save().then(() => {
                document.body.removeChild(tempDiv);
            });
        });
    }

    // Saludo animado
    const greeting = document.getElementById('greeting');
    if (greeting) {
        let saludo = '¡Hola 👋, soy Juan Pablo Granja!';
        let i = 0;
        greeting.textContent = '';
        function typeSaludo() {
            if (i < saludo.length) {
                greeting.textContent += saludo.charAt(i);
                i++;
                setTimeout(typeSaludo, 45);
            }
        }
        typeSaludo();
    }

    // Máquina de escribir para subtítulo
    const typewriter = document.getElementById('typewriter');
    if (typewriter) {
        const roles = [
            'Desarrollador de Software',
            'Full Stack | React | Node.js',
            'Apasionado por la innovación',
            '¡Listo para nuevos retos!'
        ];
        let roleIndex = 0, charIndex = 0, isDeleting = false;
        function typeRole() {
            let current = roles[roleIndex];
            if (isDeleting) {
                typewriter.textContent = current.substring(0, charIndex--);
                if (charIndex < 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    setTimeout(typeRole, 600);
                } else {
                    setTimeout(typeRole, 30);
                }
            } else {
                typewriter.textContent = current.substring(0, charIndex++);
                if (charIndex > current.length) {
                    isDeleting = true;
                    setTimeout(typeRole, 1200);
                } else {
                    setTimeout(typeRole, 70);
                }
            }
        }
        typeRole();
    }

    // Contadores animados
    function animateCounter(id, target, duration) {
        const el = document.getElementById(id);
        if (!el) return;
        let start = 0;
        const step = Math.ceil(target / (duration / 20));
        function update() {
            start += step;
            if (start >= target) {
                el.textContent = target;
            } else {
                el.textContent = start;
                setTimeout(update, 20);
            }
        }
        update();
    }
    animateCounter('exp-count', 4, 900); // Años de experiencia
    animateCounter('proj-count', 15, 1200); // Proyectos
    animateCounter('tech-count', 10, 1000); // Tecnologías

    // Frases motivacionales aleatorias
    const frases = [
        '“El único modo de hacer un gran trabajo es amar lo que haces.”',
        '“La tecnología es mejor cuando une a las personas.”',
        '“Nunca pares de aprender, el futuro es de los curiosos.”',
        '“Convierte los retos en oportunidades.”',
        '“El código es poesía.”',
        '“La innovación distingue a los líderes de los seguidores.”',
        '“Hazlo con pasión o no lo hagas.”'
    ];
    const motivational = document.getElementById('motivational');
    if (motivational) {
        const random = Math.floor(Math.random() * frases.length);
        motivational.textContent = frases[random];
    }

    // Modo oscuro/claro
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            if (document.body.classList.contains('light-mode')) {
                themeToggle.textContent = '☀️';
            } else {
                themeToggle.textContent = '🌙';
            }
        });
    }
});