class TypeWriter {
  constructor(txtElement, words, wait) {
    this.txtElement = txtElement;
    this.words = words;
    this.wait = parseInt(wait, 10);
    this.txt = '';
    this.wordsIndex = 0;
    this.type();
    this.isDeleting = false;
  }

  // Type Method
  type() {
    // Declare current word
    const word = this.words[this.wordsIndex];

    // Add or Subtract a letter from txt
    if (this.isDeleting) {
      this.txt = word.substring(0, this.txt.length - 1);
    } else {
      this.txt = word.substring(0, this.txt.length + 1);
    }

    // Add txt to HTML
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Set speed for typing/deleting
    let typeSpeed = 100;
    if (this.isDeleting) {
      typeSpeed = typeSpeed / 2;
    }

    // Word complete
    if (this.txt === word && !this.isDeleting) {
      // Pause if word complete
      this.isDeleting = true;
      typeSpeed = this.wait;
    } else if (this.txt === '' && this.isDeleting) {
      // Move on to next (or back to first) word
      this.isDeleting = false;
      this.wordsIndex++;
      if (this.words.length === this.wordsIndex) {
        this.wordsIndex = 0;
        typeSpeed = 100;
      }
    }
    // Run type method repeatedly
    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Define init function
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');

  // Init Typewriter class
  new TypeWriter(txtElement, words, wait);
}
