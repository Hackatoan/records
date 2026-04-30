document.addEventListener('DOMContentLoaded', () => {
  // Toggle lyrics panel
  document.querySelectorAll('.btn-lyrics').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.song-card');
      const panel = card.querySelector('.lyrics-panel');
      const isOpen = panel.classList.toggle('open');
      btn.classList.toggle('open', isOpen);
      btn.innerHTML = isOpen
        ? '&#9660; Lyrics'
        : '&#9654; Lyrics';
    });
  });

  // Highlight active song when its audio plays
  document.querySelectorAll('audio').forEach((audio) => {
    audio.addEventListener('play', () => {
      // Pause all other audio elements
      document.querySelectorAll('audio').forEach((other) => {
        if (other !== audio) {
          other.pause();
          other.closest('.song-card').classList.remove('active');
        }
      });
      audio.closest('.song-card').classList.add('active');
    });

    audio.addEventListener('pause', () => {
      audio.closest('.song-card').classList.remove('active');
    });

    audio.addEventListener('ended', () => {
      audio.closest('.song-card').classList.remove('active');
    });
  });
});
