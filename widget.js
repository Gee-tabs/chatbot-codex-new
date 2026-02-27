const widget = document.getElementById('widget');
const launcher = document.getElementById('launcher');
const closeWidget = document.getElementById('closeWidget');
const prompterItems = document.querySelectorAll('.prompter-item');
const showcaseStage = document.getElementById('showcaseStage');
const input = document.querySelector('.input-row input');
const inputRow = document.querySelector('.input-row');
const avatarVideo = document.querySelector('.avatar-video');
const sendButton = document.querySelector('.icon-btn[data-action="send"]');
const micButton = document.querySelector('.icon-btn[data-action="mic"]');
const speakerButton = document.querySelector('.icon-btn[data-action="speaker"]');
const defaultPlaceholder = input ? input.placeholder : 'Ask Anything';

const toggleWidget = () => {
  widget.classList.toggle('is-open');
  if (widget.classList.contains('is-open') && avatarVideo) {
    avatarVideo.muted = false;
    avatarVideo.volume = 1.0;
    avatarVideo.play().catch(() => {});
  }
};

launcher.addEventListener('click', toggleWidget);
closeWidget.addEventListener('click', toggleWidget);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && widget.classList.contains('is-open')) {
    widget.classList.remove('is-open');
  }
});

const showcaseContent = {
  text: {
    title: 'Product Overview',
    body: 'Overview content appears here.',
  },
  photos: {
    title: 'Product Gallery',
    body: 'Product photos preview.',
  },
  slides: {
    title: 'Watch Videos',
    body: 'Video playlist preview.',
  },
  videos: {
    title: '3D View',
    body: '3D viewer placeholder.',
  },
  model: {
    title: 'Price Guide',
    body: 'Pricing tiers preview.',
  },
};

const renderShowcase = (mode) => {
  const content = showcaseContent[mode];
  if (!content) return;
  showcaseStage.innerHTML = `
    <div class="showcase-card">
      <div class="showcase-title">${content.title}</div>
      <div class="showcase-media">${content.body}</div>
    </div>
  `;
};

prompterItems.forEach((item) => {
  item.addEventListener('click', () => {
    prompterItems.forEach((btn) => btn.classList.remove('is-active'));
    item.classList.add('is-active');
    renderShowcase(item.dataset.mode);
  });
});

if (avatarVideo) {
  avatarVideo.addEventListener('ended', () => {
    avatarVideo.pause();
  });
}

if (sendButton && input && inputRow) {
  sendButton.addEventListener('click', () => {
    const message = input.value.trim();
    if (!message) return;
    input.value = '';
    input.placeholder = 'Sent!';
    inputRow.classList.add('is-sent');
    window.setTimeout(() => {
      input.placeholder = defaultPlaceholder;
      inputRow.classList.remove('is-sent');
    }, 1200);
  });
}

if (micButton && input) {
  micButton.addEventListener('click', () => {
    micButton.classList.toggle('is-active');
    if (micButton.classList.contains('is-active')) {
      input.placeholder = 'Listening...';
    } else {
      input.placeholder = defaultPlaceholder;
    }
  });
}

if (speakerButton && avatarVideo) {
  speakerButton.addEventListener('click', () => {
    avatarVideo.muted = !avatarVideo.muted;
    speakerButton.classList.toggle('is-muted', avatarVideo.muted);
    speakerButton.classList.toggle('is-active', !avatarVideo.muted);
  });
}
