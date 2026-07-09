// Zzcacharros — small, dependency-free theme JS
(function () {
  document.addEventListener('click', function (e) {
    var qtyBtn = e.target.closest('[data-qty]');
    if (qtyBtn) {
      var input = qtyBtn.parentElement.querySelector('input[name="quantity"]');
      if (!input) return;
      var delta = parseInt(qtyBtn.getAttribute('data-qty'), 10);
      var val = Math.max(1, (parseInt(input.value, 10) || 1) + delta);
      input.value = val;
    }
  });

  // Thumbnail swap on product page
  document.querySelectorAll('.product__thumbs img').forEach(function (t) {
    t.addEventListener('click', function () {
      var main = document.querySelector('.product__media > img');
      if (main) main.src = t.getAttribute('data-full') || t.src;
    });
  });

  // Variant select updates hidden id + price
  var variantSelect = document.querySelector('[data-variant-select]');
  if (variantSelect) {
    variantSelect.addEventListener('change', function () {
      var opt = variantSelect.options[variantSelect.selectedIndex];
      var idInput = document.querySelector('input[name="id"]');
      if (idInput) idInput.value = opt.value;
      var priceEl = document.querySelector('[data-price]');
      if (priceEl && opt.dataset.price) priceEl.textContent = opt.dataset.price;
    });
  }
})();