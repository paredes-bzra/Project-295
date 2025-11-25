const likeButtons = document.querySelectorAll<HTMLButtonElement>('.like-button');

likeButtons.forEach(button => {
  button.addEventListener('click', async () => {
    const liked = button.dataset.liked === 'true';
    const produkt_id = 3; 
    const email = prompt('Bitte gib deine Email ein:');

    if (!liked && email) {
      button.dataset.liked = 'true';
      button.classList.add('liked');

      await fetch('/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, produkt_id }),
      });
    }
  });
});
