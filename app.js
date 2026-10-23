document.addEventListener('DOMContentLoaded', () => {
  // Cache audio elements once at load to avoid repeated DOM queries
  const audioElements = document.querySelectorAll('audio');
  let currentlyPlaying = null;

  // Toggle lyrics panel
  document.querySelectorAll('.btn-lyrics').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.song-card');
      const panel = card.querySelector('.lyrics-panel');
      const isOpen = panel.classList.toggle('open');
      btn.classList.toggle('open', isOpen);
      btn.setAttribute('aria-expanded', String(isOpen));
      btn.innerHTML = isOpen
        ? '&#9660; Lyrics'
        : '&#9654; Lyrics';
    });
  });

  // Highlight active song when its audio plays
  audioElements.forEach((audio) => {
    audio.addEventListener('play', () => {
      // Pause previously playing audio instead of querying all
      if (currentlyPlaying && currentlyPlaying !== audio) {
        currentlyPlaying.pause();
        currentlyPlaying.closest('.song-card').classList.remove('active');
      }
      currentlyPlaying = audio;
      audio.closest('.song-card').classList.add('active');
    });

    audio.addEventListener('pause', () => {
      if (currentlyPlaying === audio) {
        audio.closest('.song-card').classList.remove('active');
      }
    });

    audio.addEventListener('ended', () => {
      if (currentlyPlaying === audio) {
        currentlyPlaying = null;
        audio.closest('.song-card').classList.remove('active');
      }
    });
  });
});
