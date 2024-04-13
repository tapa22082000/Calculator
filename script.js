document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('taxForm');
    const modal = document.getElementById('modal');
    const closeButton = document.getElementById('closeButton');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
  
      var rawincome = document.getElementById('income').value;
      var rawextraIncome = document.getElementById('extraIncome').value;
      var rawdeductions = document.getElementById('deductions').value;
      const age = document.getElementById('age').value;

      let income;
      let extraIncome;
      let deductions;
  
      // Perform validation
      let error = false;
      var incomeiconTag = document.getElementById("grossincome");
      var extaincomeiconTag = document.getElementById("extraincome");
      var deductionsiconTag = document.getElementById("deduction");

      if (isNaN(rawincome)) {
        incomeiconTag.style.display="inline";
        error = true;
      }else{
        income = parseInt(rawincome);
        incomeiconTag.style.display="none";
      }
      if(isNaN(rawextraIncome)){
        extaincomeiconTag.style.display="inline";
        error = true;
      }else{
        extraIncome = parseInt(rawextraIncome);
        if(extraIncome != NaN){
          extraIncome= 0;
        }
        extaincomeiconTag.style.display="none";
      }
      if(isNaN(rawdeductions)){
        deductionsiconTag.style.display="inline";
        error = true;
      }else{
        deductions = parseInt(rawdeductions);
        if(deductions != NaN){
          deductions= 0;
        }
        deductionsiconTag.style.display="none";
      }
  
      if (!age) {
        showError('Please select an age group.');
        error = true;
      }
  
      if (!error) {
        const tax = calculateTax(income, extraIncome, deductions, age);
        showModal(tax);
      }
    });
  
    function calculateTax(income, extraIncome, deductions, age) {
      const totalIncome = income + extraIncome - deductions;
      let tax = 0;
      if (totalIncome > 800000) {
        switch (age) {
          case '<40':
            tax = 0.3 * (totalIncome - 800000);
            break;
          case '>=40&<60':
            tax = 0.4 * (totalIncome - 800000);
            break;
          case '>=60':
            tax = 0.1 * (totalIncome - 800000);
            break;
          default:
            break;
        }
      }
      return tax;
    }
  
    // function showError(message) {
    //   const errorIcons = document.querySelectorAll('.error-icon');
    //   errorIcons.forEach(icon => {
    //     icon.style.display = 'inline-block';
    //     icon.title = message;
    //   });
    // }
  
    function showModal(tax) {
      const taxResult = document.getElementById('taxResult');
      let html='';
      html = `<span>Your overall income will be</span>
      <span style="font-size: 16px;">${tax}</span>
      <span style="font-size: 12px;">after tax deductions</span>`;
      taxResult.innerHTML = html;
      modal.style.display = 'block';
    }
  
    closeButton.addEventListener('click', function () {
      modal.style.display = 'none';
    });
  
    window.addEventListener('click', function (event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  });
  