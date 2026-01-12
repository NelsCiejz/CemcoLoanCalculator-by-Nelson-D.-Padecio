window.onload = function() {
    const now = new Date();
    const dateString = now.toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' });
    
    // I-check muna kung exist ang element bago lagyan ng text
    const dateTimeElement = document.getElementById('dateTime');
    if (dateTimeElement) {
        dateTimeElement.innerText = "Date: " + dateString;
    }
};

function calculateLoan() {
    const amount = parseFloat(document.getElementById('amount').value);
    const terms = parseInt(document.getElementById('terms').value);
    const type = document.getElementById('loanType').value;
    const mode = document.getElementById('mode').value;

    if (!amount || !terms) {
        alert("Punan muna ang Amount at Terms.");
        return;
    }

    if (type === "Quick Loan" && (amount > 10000 || terms > 10)) {
        alert("Error: Quick Loan limit is 10k / 10 months."); return;
    }
    if (type === "Emergency" && (amount > 15000 || terms > 15)) {
        alert("Error: Emergency limit is 15k / 15 months."); return;
    }
    if (type === "Providential" && (amount > 400000 || terms > 36)) {
        alert("Error: Providential limit is 400k / 36 months."); return;
    }

    let interest = 0;
    if (type === "Quick Loan") {
        interest = (amount * 0.01) * terms;
    } else {
        let formulaPart = (1 - Math.pow(1.01, -terms)) / (0.01 * terms);
        interest = amount * (1 - formulaPart);
    }

    const shareCap = amount * 0.02;
    const procFee = amount * 0.01;
    const netProceeds = amount - interest - shareCap - procFee;

    let amortization = 0;
    if (mode === "Weekly") {
        amortization = (amount / terms) / 4;
    } else {
        amortization = (amount / terms) / 2;
    }

    const formatter = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' });
    const numFormatter = new Intl.NumberFormat('en-PH', { minimumFractionDigits: 2 });

    document.getElementById('resAmort').innerText = formatter.format(amortization);
    document.getElementById('resInterest').innerText = numFormatter.format(interest);
    document.getElementById('resShare').innerText = numFormatter.format(shareCap);
    document.getElementById('resProc').innerText = numFormatter.format(procFee);
    document.getElementById('resNet').innerText = formatter.format(netProceeds);
}

function resetCalc() {
    document.getElementById('amount').value = "";
    document.getElementById('terms').value = "";
    document.getElementById('resAmort').innerText = "₱ 0.00";
    document.getElementById('resInterest').innerText = "0.00";
    document.getElementById('resShare').innerText = "0.00";
    document.getElementById('resProc').innerText = "0.00";
    document.getElementById('resNet').innerText = "₱ 0.00";
}
