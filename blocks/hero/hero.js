function updateBackgroundImage() {
  const heroTag = document.querySelector('.hero');
  const pictureTag = heroTag.querySelector('picture');
  let sourceTag = pictureTag.querySelector('source');
  if (window.innerWidth < 750) {
    sourceTag = pictureTag.querySelector('source:nth-child(2)');
  }
  heroTag.style.backgroundImage = `url(${
    sourceTag.srcset
  })`;
}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function updateHeroText() {
  const heroSpacerEl = document.querySelector('.content-wrap.hero-spacer');
  const paraEl = heroSpacerEl.querySelector('p');
  const content = paraEl.innerHTML;
  const parentEl = document.querySelector('.hero-wrapper');
  const newEl = document.createElement('div');
  newEl.classList.add('dynamic-content');
  const newParaEl = document.createElement('p');
  newParaEl.textContent = content;
  newEl.appendChild(newParaEl);
  insertAfter(parentEl, newEl);
}

export default function decorate(block) {
  const pictureTag = block.querySelector('p > picture');
  pictureTag.parentNode.remove();
  const h1Tag = block.querySelector('h1');
  const pTag = block.querySelector('p');
  block.innerHTML = '';
  block.appendChild(pictureTag);
  const heroContent = document.createElement('div');
  const contentBg = document.createElement('div');
  const contentWrap = document.createElement('div');
  heroContent.classList.add('hero-content');
  contentBg.classList.add('content-bg', 'hero-spacer');
  contentWrap.classList.add('content-wrap', 'hero-spacer');
  heroContent.appendChild(contentBg);
  contentWrap.appendChild(h1Tag);
  contentWrap.appendChild(pTag);
  heroContent.appendChild(contentWrap);
  block.appendChild(heroContent);
  updateBackgroundImage();
  updateHeroText();
}
