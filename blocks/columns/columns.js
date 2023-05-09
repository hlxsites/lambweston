function joinLinkstoOne(links) {
  if (links.length > 1 && links.every((link) => link.getAttribute('href') === links[0].getAttribute('href'))) {
    const span = document.createElement('span');
    const firstChild = links[0];
    const { parentElement } = firstChild;

    // Remove the first <a> element from the links array
    links.shift();

    // Move all child nodes of the <a> elements to the new <span> element
    links.forEach((link) => {
      if (link.parentNode.tagName === 'EM') {
        const emTag = document.createElement('em');
        emTag.innerHTML = link.innerHTML;
        span.innerHTML += emTag.outerHTML;
      } else {
        span.innerHTML += link.innerHTML;
      }
    });

    firstChild.appendChild(span);

    // Replace the original parent element with the new <a> element
    parentElement.innerHTML = firstChild.outerHTML;
  }
}

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }

      // combine individual 'a' links to single 'a' link
      const links = Array.from(col.querySelectorAll('div>a,div>em>a'));
      joinLinkstoOne(links);
      const pTags = Array.from(col.querySelectorAll('div>p'));
      pTags.forEach((pTag) => {
        const pLinks = Array.from(pTag.querySelectorAll('a,em>a'));
        joinLinkstoOne(pLinks);
      });
    });
  });
}
