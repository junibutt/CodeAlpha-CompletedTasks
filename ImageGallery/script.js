document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('myModal');
    const modalImg = document.getElementById('modalImg');
    const imgs = document.querySelectorAll('.imggal img');
    const closeBtn = document.querySelector('.close');
    let nextBtn, prevBtn; // Declare next and prev buttons

    let currentImgIndex = 0;

    // Function to open modal with clicked image
    function openModal(index) {
        modalImg.src = imgs[index].src;
        modal.style.display = 'block';
        currentImgIndex = index;
        createNavButtons(); // Create nav buttons every time modal opens
        toggleNavButtons(index); // Toggle visibility based on current index
    }

    // Function to toggle navigation buttons visibility
    function toggleNavButtons(index) {
        if (index === 0) {
            prevBtn.style.display = 'none'; // Hide prev button at first image
        } else {
            prevBtn.style.display = 'block'; // Show prev button
        }

        if (index === imgs.length - 1) {
            nextBtn.style.display = 'none'; // Hide next button at last image
        } else {
            nextBtn.style.display = 'block'; // Show next button
        }
    }

    // Event listeners for each image to open modal on click
    imgs.forEach((img, index) => {
        img.addEventListener('click', function() {
            openModal(index);
        });
    });

    // Close modal function
    function closeModal() {
        modal.style.display = 'none';
        removeNavButtons(); // Remove nav buttons when modal closes
    }

    // Event listener for close button
    closeBtn.addEventListener('click', function() {
        closeModal();
    });

    // Create next and previous buttons dynamically
    function createNavButtons() {
        if (!nextBtn) {
            nextBtn = document.createElement('button');
            nextBtn.classList.add('nav-btn', 'next');
            nextBtn.innerHTML = '&gt;';
            nextBtn.addEventListener('click', nextImage);
            document.body.appendChild(nextBtn);
        }

        if (!prevBtn) {
            prevBtn = document.createElement('button');
            prevBtn.classList.add('nav-btn', 'prev');
            prevBtn.innerHTML = '&lt;';
            prevBtn.addEventListener('click', prevImage);
            document.body.appendChild(prevBtn);
        }
    }

    // Remove next and previous buttons
    function removeNavButtons() {
        if (nextBtn && nextBtn.parentNode) {
            nextBtn.parentNode.removeChild(nextBtn);
            nextBtn = null;
        }

        if (prevBtn && prevBtn.parentNode) {
            prevBtn.parentNode.removeChild(prevBtn);
            prevBtn = null;
        }
    }

    // Function to show next image
    function nextImage() {
        if (currentImgIndex < imgs.length - 1) {
            currentImgIndex++;
            modalImg.src = imgs[currentImgIndex].src;
            toggleNavButtons(currentImgIndex);
        }
    }

    // Function to show previous image
    function prevImage() {
        if (currentImgIndex > 0) {
            currentImgIndex--;
            modalImg.src = imgs[currentImgIndex].src;
            toggleNavButtons(currentImgIndex);
        }
    }

    // Close modal when clicking outside of modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Keyboard navigation (left and right arrow keys)
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight') {
            nextImage();
        } else if (event.key === 'ArrowLeft') {
            prevImage();
        } else if (event.key === 'Escape') {
            closeModal();
        }
    });
});
