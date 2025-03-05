const teamMembers = [
    {
        name: "Rudra Prasanna Mishra",
        image: "/images/RPM.svg?height=300&width=300",
        background: "#FFD700",
        bio: "Tech enthusiast on a mission to drive change through AI and innovation. Crafting smart solutions for a sustainable future, one breakthrough at a time. Always pushing the boundaries of what’s possible, with a passion for turning bold ideas into impactful realities."
    },
    {
        name: "D Vamsi Krishna",
        image: "/images/DVK.svg",
        background: "#00FA9A",
        bio: "Innovator at heart, problem-solver by nature. Blending cutting-edge technology with creativity to shape solutions that matter. Passionate about turning data into insights and challenges into opportunities. Let's make the future sustainable and smart!."
    },
    {
        name: "Indigibilli Harshit",
        image: "/images/IH.svg?height=300&width=300",
        background: "#FF7F50",
        bio: "Creative thinker, tech trailblazer. Empowering the world with AI-driven insights and sustainable solutions. On a relentless quest to transform challenges into innovations that shape the future."
    },
    {
        name: "Jnanasri Kalakota",
        image: "/images/JK.jpg?height=300&width=300",
        background: "#FF7F50",
        bio: "Always a Student"
    }
];

const teamGrid = document.getElementById('teamGrid');
const modal = document.getElementById('modal');
const modalName = document.getElementById('modalName');
const modalBio = document.getElementById('modalBio');
const closeButton = document.querySelector('.close-button');

function createTeamMemberElement(member) {
    const memberElement = document.createElement('div');
    memberElement.className = 'team-member';
    memberElement.innerHTML = `
        <div class="member-image-container" style="background-color: ${member.background};">
            <img src="${member.image}" alt="${member.name}" class="member-image">
        </div>
        <div class="member-info">
            <h3 class="member-name">${member.name}</h3>
        </div>
    `;
    memberElement.addEventListener('click', () => openModal(member));
    return memberElement;
}

function openModal(member) {
    modalName.textContent = member.name;
    modalBio.textContent = member.bio;
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

teamMembers.forEach(member => {
    teamGrid.appendChild(createTeamMemberElement(member));
});

closeButton.addEventListener('click', closeModal);
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});