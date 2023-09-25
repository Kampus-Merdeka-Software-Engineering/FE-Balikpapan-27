const counters = document.querySelectorAll(".purecounter");
counters.forEach((counter) => {
  const startValue = parseInt(counter.getAttribute("data-purecounter-start"));
  const endValue = parseInt(counter.getAttribute("data-purecounter-end"));
  const duration = 2000; // Durasi animasi dalam milidetik
  const step = (Math.abs(endValue - startValue) / duration) * 10; // Langkah per frame

  let currentValue = startValue;
  const updateCounter = () => {
    if (currentValue < endValue) {
      currentValue += step;
      counter.textContent = Math.round(currentValue);
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = endValue;
    }
  };

  updateCounter();
});
