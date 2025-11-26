import { environment } from "../users-api";

const likeButtons = document.querySelectorAll<HTMLButtonElement>('.like-button');

likeButtons.forEach(button => {
  button.addEventListener('click', async () => {
    const liked = button.dataset.liked === 'true';
    const produkt_id = 3; 
    const email = prompt('Bitte gib deine Email ein:');
debugger;
    if (!liked && email) {
      button.dataset.liked = 'true';
      button.classList.add('liked');
      const token = localStorage.getItem('jwt-token');

      await fetch(`${environment.apiRoot}/likes`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, produkt_id }),
      });
    }
  });
});
