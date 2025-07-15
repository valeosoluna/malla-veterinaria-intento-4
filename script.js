document.addEventListener('DOMContentLoaded', () => {
    const coursesData = {
        "Semestre I": [
            { id: 1, name: "Introducción a las Ciencias Veterinarias", prerequisites: [] },
            { id: 2, name: "Fundamentos de la Química", prerequisites: [] },
            { id: 3, name: "Biología Celular y Molecular", prerequisites: [] },
            { id: 4, name: "Matemática", prerequisites: [] },
            { id: 5, name: "Zoología", prerequisites: [] },
            { id: 6, name: "Fundamentos de la Física", prerequisites: [] }
        ],
        "Semestre II": [
            { id: 7, name: "Anatomía Animal I", prerequisites: [5] }, // Zoología (5)
            { id: 8, name: "Praderas y Especies Forrajeras", prerequisites: [3] }, // Biología Celular y Molecular (3)
            { id: 9, name: "Fundamentos de Bioquímica", prerequisites: [2, 3] }, // Fundamentos de la Química (2), Biología Celular y Molecular (3)
            { id: 10, name: "Histoembriología Veterinaria", prerequisites: [3] }, // (3)
            { id: 11, name: "Ecología", prerequisites: [4, 5] }, // Matemática (4), Zoología (5)
            { id: 12, name: "Electivo 1", prerequisites: [] }
        ],
        "Semestre III": [
            { id: 13, name: "Anatomía Animal II", prerequisites: [7] }, // Anatomía Animal 1 (7)
            { id: 14, name: "Nutrición y Alimentación Animal", prerequisites: [8, 9] }, // Praderas y Especies Forrajeras (8), Fundamentos de Bioquímica (9)
            { id: 15, name: "Fisiología Veterinaria", prerequisites: [9, 10] }, // Fundamentos de Bioquímica (9), Histoembriología Veterinaria (10)
            { id: 16, name: "Práctica Inicial", prerequisites: [7, 11] }, // Anatomía Animal 1 (7), Ecología (11)
            { id: 17, name: "Inmunología General", prerequisites: [3, 9] }, // Biología Celular y Molecular (3), Fundamentos de Bioquímica (9)
            { id: 18, name: "Bioestadística", prerequisites: [4] }, // Matemática (4)
            { id: 19, name: "Electivo 2", prerequisites: [] }
        ],
        "Semestre IV": [
            { id: 20, name: "Etología y Bienestar Animal", prerequisites: [15] }, // Fisiología Veterinaria (15)
            { id: 21, name: "Histopatología", prerequisites: [15] }, // Fisiología Veterinaria (15)
            { id: 22, name: "Microbiología Veterinaria", prerequisites: [17] }, // Inmunología General (17)
            { id: 23, name: "Conservación de Fauna Silvestre", prerequisites: [11] }, // Ecología (11)
            { id: 24, name: "Métodos de Investigación en Salud", prerequisites: [18] }, // Bioestadística (18)
            { id: 25, name: "Electivo 3", prerequisites: [] }
        ],
        "Semestre V": [
            { id: 26, name: "Genética en Ciencias Veterinarias", prerequisites: [18] }, // Bioestadística (18)
            { id: 27, name: "Epidemiología Veterinaria", prerequisites: [24] }, // Métodos de Investigación en Salud (24)
            { id: 28, name: "Fisiopatología Veterinaria", prerequisites: [13, 21, 23] }, // Anatomía Animal II (13), Histopatología (21), Conservación de Fauna Silvestre (23)
            { id: 29, name: "Gestión Ambiental y Desarrollo Sustent", prerequisites: [23] }, // Conservación de Fauna Silvestre (23)
            { id: 30, name: "Gestión Contable y Financiera", prerequisites: [18] }, // Bioestadística (18)
            { id: 31, name: "Electivo 4", prerequisites: [] }
        ],
        "Semestre VI": [
            { id: 32, name: "Semiología Veterinaria", prerequisites: [20, 28] }, // Etología y Bienestar Animal (20), Fisiopatología Veterinaria (28)
            { id: 33, name: "Reproducción Animal", prerequisites: [28] }, // Fisiopatología Veterinaria (28)
            { id: 34, name: "Anatomía Patológica", prerequisites: [28] }, // Fisiopatología Veterinaria (28)
            { id: 35, name: "Microbiología de los Alimentos", prerequisites: [22, 24] }, // Microbiología Veterinaria (22), Métodos de Investigación en Salud (24)
            { id: 36, name: "Práctica Intermedia", prerequisites: [16, 20] }, // Práctica Inicial (16), Etología y Bienestar Animal (20)
            { id: 37, name: "Electivo 5", prerequisites: [] }
        ],
        "Semestre VII": [
            { id: 38, name: "Sistemas de Producción Animal", prerequisites: [14, 26] }, // Nutrición y Alimentación Animal (14), Genética en Ciencias Veterinarias (26)
            { id: 39, name: "Farmacología Veterinaria", prerequisites: [28] }, // Fisiopatología Veterinaria (28)
            { id: 40, name: "Enfermedades producidas por agentes biológicos I", prerequisites: [27, 35] }, // Epidemiología Veterinaria (27), Microbiología de los Alimentos (35)
            { id: 41, name: "Procedimientos Clínicos", prerequisites: [32] }, // Semiología Veterinaria (32)
            { id: 42, name: "Imagenología", prerequisites: [34] }, // Anatomía Patológica (34)
            { id: 43, name: "Inteligencia artificial aplicada a la salud", prerequisites: [18] }  // Bioestadística (18)
        ],
        "Semestre VIII": [
            { id: 44, name: "Laboratorio Clínico y Biotecnología", prerequisites: [34, 40] }, // Anatomía Patológica (34), Enfermedades producidas por agentes biológicos I (40)
            { id: 45, name: "Investigación en Ciencias Veterinarias", prerequisites: [24] }, // Métodos de Investigación en Salud (24)
            { id: 46, name: "Enfermedades producidas por agentes biológicos II", prerequisites: [40, 39] }, // Enfermedades producidas por agentes biológicos I (40), Farmacología Veterinaria (39)
            { id: 47, name: "Principios de Cirugía y Anestesiología", prerequisites: [39, 41] }, // Farmacología Veterinaria (39), Procedimientos Clínicos (41)
            { id: 48, name: "Medicina Interna", prerequisites: [32, 42] }, // Semiología Veterinaria (32), Imagenología (42)
            { id: 49, name: "Bioética", prerequisites: [] }
        ],
        "Semestre IX": [
            { id: 50, name: "Salud Pública Veterinaria", prerequisites: [46] }, // Enfermedades producidas por agentes biológicos II (46)
            { id: 51, name: "Unidad de Investigación I", prerequisites: [45, 49] }, // Investigación en Ciencias Veterinarias (45), Bioética (49)
            { id: 52, name: "Internado de Pequeños Animales I", prerequisites: [44, 47, 48] }, // Laboratorio clínico y biotecnología (44), Principios de cirugía y anestesiología (47), Medicina interna (48)
            { id: 53, name: "Internado de Animales Mayores I", prerequisites: [44, 47, 48] }, // Laboratorio clínico y biotecnología (44), Principios de cirugía y anestesiología (47), Medicina interna (48)
            { id: 54, name: "Formulación y Evaluación de Proyectos Veterinarios", prerequisites: [30, 38] }, // Gestión Contable y Financiera (30), Sistemas de Producción Animal (38)
            { id: 55, name: "Gestión Veterinaria", prerequisites: [30, 38] }, // Gestión Contable y Financiera (30), Sistemas de Producción Animal (38)
            { id: 56, name: "Práctica Profesional", prerequisites: ["licenciatura"] } // Placeholder for "Obtención de licenciatura"
        ],
        "Semestre X": [
            { id: 57, name: "Una Salud", prerequisites: [50, 54] }, // Salud Pública Veterinaria (50), Formulación y Evaluación de Proyectos Veterinarios (54)
            { id: 58, name: "Unidad de Investigación II", prerequisites: [51] }, // Unidad de Investigación I (51)
            { id: 59, name: "Internado Electivo: Pequeños Animales II", prerequisites: [] },
            { id: 60, name: "Internado Electivo: Animales Mayores", prerequisites: [] },
            { id: 61, name: "Internado Electivo: Conservación, Biodiversidad y Medio Ambiente", prerequisites: [] },
            { id: 62, name: "Internado Electivo: Producción y Sistemas de Aseguramiento de la Calidad", prerequisites: [] },
            { id: 63, name: "Orientación Laboral y Responsabilidad Ética en Medicina Veterinaria", prerequisites: [36] } // Práctica Intermedia (36)
        ]
    };

    const approvedCourses = new Set(JSON.parse(localStorage.getItem('approvedCourses')) || []);
    const mallaCurricularDiv = document.getElementById('malla-curricular');

    function renderMalla() {
        mallaCurricularDiv.innerHTML = ''; // Clear previous render

        // Create a map for quick course lookup by ID
        const allCourses = {};
        for (const semester in coursesData) {
            coursesData[semester].forEach(course => {
                allCourses[course.id] = course;
            });
        }

        for (const semesterName in coursesData) {
            const semesterDiv = document.createElement('div');
            semesterDiv.classList.add('semester');
            const semesterTitle = document.createElement('h2');
            semesterTitle.textContent = semesterName;
            semesterDiv.appendChild(semesterTitle);

            coursesData[semesterName].forEach(course => {
                const courseElement = document.createElement('div');
                courseElement.classList.add('course');
                courseElement.textContent = course.name;
                courseElement.dataset.id = course.id;

                let isLocked = false;
                if (course.prerequisites.length > 0) {
                    isLocked = course.prerequisites.some(prereqId => {
                        // Special handling for 'licenciatura' prerequisite
                        if (prereqId === "licenciatura") {
                            // For simplicity, assume 'licenciatura' is fulfilled if all previous courses are approved.
                            // In a real scenario, this might be a separate condition.
                            return !Array.from(approvedCourses).includes(prereqId);
                        }
                        // Check if the prerequisite is not 'Ingreso' and not approved
                        return prereqId !== "Ingreso" && !approvedCourses.has(prereqId);
                    });
                }

                if (isLocked) {
                    courseElement.classList.add('locked');
                } else if (approvedCourses.has(course.id)) {
                    courseElement.classList.add('approved');
                }

                courseElement.addEventListener('click', () => {
                    if (!courseElement.classList.contains('locked')) {
                        toggleCourseApproval(course.id);
                    }
                });
                semesterDiv.appendChild(courseElement);
            });
            mallaCurricularDiv.appendChild(semesterDiv);
        }
    }

    function toggleCourseApproval(courseId) {
        if (approvedCourses.has(courseId)) {
            approvedCourses.delete(courseId);
        } else {
            // Check if all prerequisites are met before allowing approval
            const courseToApprove = findCourseById(courseId);
            if (courseToApprove) {
                // Check if all prerequisites are fulfilled (including 'Ingreso' which is always considered fulfilled)
                const allPrerequisitesMet = courseToApprove.prerequisites.every(prereqId => {
                    return approvedCourses.has(prereqId) || prereqId === "Ingreso";
                });

                if (allPrerequisitesMet) {
                    approvedCourses.add(courseId);
                } else {
                    alert('Debes aprobar los prerrequisitos antes de seleccionar este ramo.');
                    return;
                }
            }
        }
        localStorage.setItem('approvedCourses', JSON.stringify(Array.from(approvedCourses)));
        renderMalla(); // Re-render the malla to update states
    }

    function findCourseById(id) {
        for (const semester in coursesData) {
            const course = coursesData[semester].find(c => c.id === id);
            if (course) {
                return course;
            }
        }
        return null;
    }

    renderMalla();
});
