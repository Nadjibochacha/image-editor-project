

let link = document.getElementById('file');
let img = document.querySelector('.img');
let photo = document.getElementById('img');
let reset = document.getElementById('reset');
let btnDown = document.getElementById('down');
const saturation = document.getElementById('sat');
const contrast = document.getElementById('cont');
const brightness = document.getElementById('bri');
const sepia = document.getElementById('sep');
const grayscale = document.getElementById('gray');
const blu = document.getElementById('blur');
const hueRotate = document.getElementById('hue');

onload = () => {
    resetImg();
    btnDown.style.display = 'none';
    reset.style.display = 'none';
    img.style.display = 'none';
}
link.onchange = () => {
    btnDown.style.display = 'block';
    reset.style.display = 'block';
    img.style.display = 'block';
    let file = new FileReader();
    file.readAsDataURL(link.files[0]);
    file.onload = ()=>{
        photo.src = file.result;
    }
}

let filters = document.querySelectorAll("ul li input");
filters.forEach(filter => {
    filter.addEventListener('input', () => {
        photo.style.filter = `
            saturate(${saturation.value}%)
            contrast(${contrast.value}%)
            brightness(${brightness.value}%)
            sepia(${sepia.value}%)
            grayscale(${grayscale.value})
            blur(${blu.value}px)  
            hue-rotate(${hueRotate.value}deg)
        `;
    });
});

function resetImg() {
    photo.style.filter ='none';
    saturation.value = '100';
    contrast.value = '100';
    brightness.value = '100';
    sepia.value = '0';
    grayscale.value = '0';
    blu.value = '0';
    hueRotate.value = '0';
}

function saveImageWithFilters() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = photo.naturalWidth;
    canvas.height = photo.naturalHeight;
    const filterString = photo.style.filter;
    ctx.filter = filterString;
    ctx.drawImage(photo, 0, 0, canvas.width, canvas.height);
    const imageURL = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = imageURL;
    downloadLink.download = 'filtered-image.png';
    downloadLink.click();
}

btnDown.addEventListener('click', saveImageWithFilters);