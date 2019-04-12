const input = document.querySelector('input[type="file"]');
const photoArea = document.querySelector('.photo');
var label = document.getElementById('labelfile');
let fileIsUploaded = false;

if (!fileIsUploaded) {
    // [0] because these are node lists
    document.getElementsByClassName('edits')[0].style.display = 'none';
    document.getElementsByClassName('filters')[0].style.display = 'none';
    document.getElementsByClassName('title')[0].style.height = '10vh';
    document.getElementById('choose-file').style.height = '20vh';
    document.getElementsByClassName('photo')[0].style.height = '70vh';
}


function handleFiles(files) {
    const reader = new FileReader();
    reader.onload = function () {
        const img = new Image();
        img.onload = function () {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = mapCanvasWidth(canvas, photoArea);
            canvas.height = mapCanvasHeight(canvas, photoArea);
            context.drawImage(img, 0, 0);

            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            for (var i = 0; i <= data.length; i += 4) {
                const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                data[i] = avg;
                data[i + 1] = avg;
                data[i + 2] = avg;
            }

            context.putImageData(imageData, 0, 0);

            photoArea.appendChild(canvas);
            canvas.toDataURL();
        };
        img.src = reader.result
    };
    reader.readAsDataURL(files[0]);
}

function mapCanvasWidth(canvas, div) {
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;
    let divWidth = div.scrollWidth;
    let divHeight = div.scrollHeight;
    let ratio = canvasHeight / canvasWidth;

    if (ratio >= 1) {
        // canvasHeight = divHeight;
        canvasWidth = Math.floor(divHeight / ratio);
    }
    else {
        canvasWidth = divWidth;
        // canvasHeight = Math.floor(divWidth * ratio);
    }
    return canvasWidth;
}

function mapCanvasHeight(canvas, div) {
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;
    let divWidth = div.scrollWidth;
    let divHeight = div.scrollHeight;
    let ratio = canvasHeight / canvasWidth;

    if (ratio >= 1) {
        canvasHeight = divHeight;
        // canvasWidth = Math.floor(divHeight / ratio);
    }
    else {
        // canvasWidth = divWidth;
        canvasHeight = Math.floor(divWidth * ratio);
    }
    return canvasHeight;
}

input.addEventListener('change', function (e) {
    handleFiles(input.files)
}, false);

// Drag and drop feature
document.addEventListener('dragover', function (e) {
    e.preventDefault();
    e.stopPropagation()
}, false);
document.addEventListener('drop', function (e) {
    e.preventDefault();
    e.stopPropagation();
    handleFiles(e.dataTransfer.files)
}, false);

// Make 'upload file' label disappear and appear filters and edits
label.addEventListener('click', function () {
    document.getElementsByClassName('edits')[0].style.display = 'block';
    document.getElementsByClassName('edits')[0].style.height = '20vh';
    document.getElementsByClassName('filters')[0].style.display = 'block';
    document.getElementsByClassName('filters')[0].style.height = '25vh';
    document.getElementsByClassName('photo')[0].style.height = '45vh';

    setTimeout(function () {
        document.getElementById('choose-file').style.display = 'none';
    }, 100);
    fileIsUploaded = true;
});

