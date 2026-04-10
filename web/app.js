const dataset = {
  腾讯控股: {
    years: ["2021", "2022", "2023", "2024", "2025"],
    revenue: [560, 554, 610, 680, 735],
    profit: [224, 188, 210, 236, 258],
    grossMargin: [43.1, 41.2, 42.6, 44.0, 44.8],
    roe: [24.8, 20.1, 21.7, 22.9, 23.5],
    cfo: [195, 180, 206, 229, 241],
    scores: [82, 78, 74, 85, 80],
    kpis: {
      "营收 CAGR(3Y)": "9.8%",
      "ROE": "23.5%",
      "经营现金流/净利润": "0.93",
      "PE(TTM)": "19.6",
    },
  },
  贵州茅台: {
    years: ["2021", "2022", "2023", "2024", "2025"],
    revenue: [106, 124, 146, 171, 198],
    profit: [52, 62, 72, 84, 97],
    grossMargin: [91.2, 91.5, 91.8, 92.0, 92.1],
    roe: [30.8, 31.5, 32.2, 33.0, 33.4],
    cfo: [60, 68, 81, 92, 104],
    scores: [95, 88, 96, 78, 92],
    kpis: {
      "营收 CAGR(3Y)": "16.2%",
      "ROE": "33.4%",
      "经营现金流/净利润": "1.07",
      "PE(TTM)": "27.4",
    },
  },
};

const kpiGrid = document.getElementById("kpi-grid");
const companySelect = document.getElementById("company");

let revProfitChart;
let marginRoeChart;
let cashflowChart;
let radarChart;

for (const company of Object.keys(dataset)) {
  const option = document.createElement("option");
  option.value = company;
  option.textContent = company;
  companySelect.appendChild(option);
}

function renderKpis(data) {
  kpiGrid.innerHTML = "";
  Object.entries(data.kpis).forEach(([label, value]) => {
    const div = document.createElement("div");
    div.className = "kpi";
    div.innerHTML = `<div class="label">${label}</div><div class="value">${value}</div>`;
    kpiGrid.appendChild(div);
  });
}

function destroyCharts() {
  [revProfitChart, marginRoeChart, cashflowChart, radarChart].forEach((chart) => {
    if (chart) chart.destroy();
  });
}

function renderCharts(data) {
  destroyCharts();

  revProfitChart = new Chart(document.getElementById("revProfitChart"), {
    type: "bar",
    data: {
      labels: data.years,
      datasets: [
        { label: "营收", data: data.revenue },
        { label: "净利润", data: data.profit },
      ],
    },
  });

  marginRoeChart = new Chart(document.getElementById("marginRoeChart"), {
    type: "line",
    data: {
      labels: data.years,
      datasets: [
        { label: "毛利率", data: data.grossMargin },
        { label: "ROE", data: data.roe },
      ],
    },
  });

  cashflowChart = new Chart(document.getElementById("cashflowChart"), {
    type: "line",
    data: {
      labels: data.years,
      datasets: [{ label: "经营现金流", data: data.cfo }],
    },
  });

  radarChart = new Chart(document.getElementById("radarChart"), {
    type: "radar",
    data: {
      labels: ["盈利能力", "成长性", "现金流", "偿债", "估值合理性"],
      datasets: [{ label: "综合评分", data: data.scores }],
    },
    options: {
      scales: {
        r: {
          suggestedMin: 0,
          suggestedMax: 100,
        },
      },
    },
  });
}

function update() {
  const data = dataset[companySelect.value];
  renderKpis(data);
  renderCharts(data);
}

companySelect.addEventListener("change", update);
companySelect.value = Object.keys(dataset)[0];
update();
