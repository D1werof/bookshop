const imageContainerEl = document.querySelector(".image-container");
const prevEl = document.getElementById("prev");
const nextEl = document.getElementById("next");

let x = 0;
let timer;

prevEl.addEventListener("click", () => {
  x += 90;
  clearTimeout(timer);
  updateGallery();
});

nextEl.addEventListener("click", () => {
  x -= 90;
  clearTimeout(timer);
  updateGallery();
});

function updateGallery() {
  imageContainerEl.style.transform = `perspective(1000px) rotateY(${x}deg)`;
  timer = setTimeout(() => {
    x -= 90;
    updateGallery();
  }, 3000);
}

updateGallery();

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".image-container");

  try {
    const response = await fetch("http://localhost:5000/api/books");
    const books = await response.json();

    container.innerHTML = books
      .map(
        (book, index) => `
            <span style="--i: ${index + 1}">
                <a href="book.html?id=${book._id}">
                    <img src="data:${
                      book.img.contentType
                    };base64,${arrayBufferToBase64(book.img.data.data)}" alt="${
          book.title
        }">
                    <div>${book.title}</div> <!-- Added title display -->
                </a>
            </span>
        `
      )
      .join("");
  } catch (error) {
    console.error("Failed to load books:", error);
  }

  function arrayBufferToBase64(buffer) {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
});
