const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("product");
    products.forEach(product => {
        const opt = document.createElement("option");
        opt.value = product.id;
        opt.textContent = product.name;
        select.appendChild(opt);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const STORAGE_KEY = "reviewCount";
    let count = parseInt(localStorage.getItem(STORAGE_KEY), 10) || 0;
    count += 1;
    localStorage.setItem(STORAGE_KEY, count);

    const displayEl = document.getElementById("reviewCount");
    if (displayEl) {
        displayEl.textContent = `Reviews submitted this browser: ${count}`;
    }
});

