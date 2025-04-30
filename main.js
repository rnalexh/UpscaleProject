import Upscaler from 'https://cdn.skypack.dev/upscaler';

const upscaler = new Upscaler();

const uploadInput = document.getElementById('upload');
const originalImg = document.getElementById('originalImage');
const upscaledCanvas = document.getElementById('upscaledCanvas');

uploadInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const imageURL = URL.createObjectURL(file);
    originalImg.src = imageURL;

    originalImg.onload = async () => {
        try {
            const tensor = await upscaler.upscale(originalImg, { output: 'tensor' });

            upscaledCanvas.width = tensor.shape[1];
            upscaledCanvas.height = tensor.shape[0];

            const normalized = tf.div(tensor, 255);
            await tf.browser.toPixels(normalized, upscaledCanvas);

            tensor.dispose();
            normalized.dispose();
        } catch (err) {
            console.error('Erro ao fazer upscale:', err.message || err);
            alert('Erro: ' + (err.message || err));
        }
    };
});
