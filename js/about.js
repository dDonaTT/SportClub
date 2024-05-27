const slideShow = new PIXI.Application({
    backgroundAlpha: 0,
  });
  document.getElementById('pixi-con').appendChild(slideShow.view);
  
  const imagePaths = [
    './images/kupakosoves.jpg',  
    './images/ligaunike.jpg',  
    './images/superliga.jpg',
    './images/2015.jpg',  
    './images/kupa.jpg',  
    './images/2013.jpg', 
    './images/winners.jpg',  






];
  
  const sprites = [];
  let slideInterval;
  
  function loadImages() {
    imagePaths.forEach((path, index) => {
      const image = new Image();
      image.src = path;
      image.onload = () => {
        const texture = PIXI.Texture.from(image);
        const sprite = new PIXI.Sprite(texture);
  
        const scaleFactor = Math.min(slideShow.screen.width / sprite.width, slideShow.screen.height / sprite.height);
        sprite.scale.set(scaleFactor);
        sprite.anchor.set(0.5);
        sprite.position.set(slideShow.screen.width / 2, slideShow.screen.height / 2);
  
        sprites.push(sprite);
  
        if (index === 0) {
          slideShow.stage.addChild(sprite);
        }
      };
    });
  
    const imageSlider = document.getElementById('image-slider');
    imageSlider.addEventListener('input', () => {
      clearInterval(slideInterval);
      const index = parseInt(imageSlider.value);
      slideShow.stage.removeChildren();
      slideShow.stage.addChild(sprites[index]);
    });
  
    slideInterval = setInterval(() => {
      let currentIndex = sprites.findIndex(sprite => slideShow.stage.children.includes(sprite));
      let nextIndex = (currentIndex + 1) % sprites.length;
  
      slideShow.stage.removeChildren();
      slideShow.stage.addChild(sprites[nextIndex]);
      imageSlider.value = nextIndex;
    }, 4000);
  }
  
  function resizeSlideShow() {
    const parentWidth = document.getElementById('pixi-con').offsetWidth;
    const parentHeight = document.getElementById('pixi-con').offsetHeight;
    slideShow.renderer.resize(parentWidth, parentHeight);
  
    sprites.forEach(sprite => {
      const scaleFactor = Math.min(slideShow.screen.width / sprite.texture.width, slideShow.screen.height / sprite.texture.height);
      sprite.scale.set(scaleFactor);
      sprite.position.set(slideShow.screen.width / 2, slideShow.screen.height / 2);
    });
  }
  
  window.addEventListener('resize', resizeSlideShow);
  resizeSlideShow();
  
  loadImages();