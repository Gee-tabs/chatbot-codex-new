const prompterItems = document.querySelectorAll('.prompter-item');
const chips = document.querySelectorAll('.chip');
const input = document.querySelector('.input-row input');

prompterItems.forEach((item) => {
  item.addEventListener('click', () => {
    prompterItems.forEach((btn) => btn.classList.remove('is-active'));
    item.classList.add('is-active');
  });
});

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    input.value = chip.textContent.trim();
    input.focus();
  });
});
