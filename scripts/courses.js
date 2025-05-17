document.addEventListener('DOMContentLoaded', () => {
    // Course data array with some completed courses
    const courses = [
        {
            subject: 'CSE',
            number: 110,
            title: 'Introduction to Programming',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
            technology: ['Python'],
            completed: true
        },
        {
            subject: 'WDD',
            number: 130,
            title: 'Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming.',
            technology: ['HTML', 'CSS'],
            completed: true
        },
        {
            subject: 'CSE',
            number: 111,
            title: 'Programming with Functions',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call, debug, and test their own functions.',
            technology: ['Python'],
            completed: true
        },
        {
            subject: 'CSE',
            number: 210,
            title: 'Programming with Classes',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
            technology: ['C#'],
            completed: true
        },
        {
            subject: 'WDD',
            number: 131,
            title: 'Dynamic Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events.',
            technology: ['HTML', 'CSS', 'JavaScript'],
            completed: true
        },
        {
            subject: 'WDD',
            number: 231,
            title: 'Frontend Web Development I',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, and performance optimization.',
            technology: ['HTML', 'CSS', 'JavaScript'],
            completed: false
        }
    ];

    // DOM elements
    const coursesContainer = document.querySelector('.courses-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const totalCreditsElement = document.getElementById('total-credits');
    const courseCountElement = document.createElement('p'); // For displaying course count

    // Add course count element to DOM
    const certificateSection = document.querySelector('.certificate-section');
    certificateSection.insertBefore(courseCountElement, coursesContainer);

    // Function to display courses
    function displayCourses(coursesToDisplay) {
        // Clear previous courses
        coursesContainer.innerHTML = '';
        
        // Display course count
        courseCountElement.textContent = `The total number of courses listed below is ${coursesToDisplay.length}`;
        courseCountElement.style.margin = '1rem 0';
        courseCountElement.style.fontWeight = 'bold';
        courseCountElement.style.textAlign = 'center';
        
        // Display courses
        coursesToDisplay.forEach(course => {
            const courseElement = document.createElement('div');
            courseElement.className = `course ${course.completed ? 'completed' : ''}`;
            
            courseElement.innerHTML = `
                <h3>${course.subject} ${course.number}: ${course.title}</h3>
                <p><strong>Description:</strong> ${course.description}</p>
                <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
                <p><strong>Credits:</strong> ${course.credits}</p>
                <p class="status">${course.completed ? '✓ Completed' : '○ In Progress'}</p>
            `;
            
            coursesContainer.appendChild(courseElement);
        });
        
        // Calculate and display total credits
        const totalCredits = coursesToDisplay.reduce((total, course) => total + course.credits, 0);
        totalCreditsElement.textContent = totalCredits;
    }
    
    // Filter button event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Get filter value (convert to uppercase for comparison)
            const filter = button.dataset.filter.toUpperCase();
            
            // Filter courses
            let filteredCourses;
            if (filter === 'ALL') {
                filteredCourses = courses;
            } else {
                filteredCourses = courses.filter(course => course.subject === filter);
            }
            
            // Display filtered courses
            displayCourses(filteredCourses);
        });
    });
    
    // Initial display of all courses
    displayCourses(courses);
});