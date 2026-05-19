const API_KEY =
  "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjNiZWQwYTgyYjVmZTQ3YWRhYzM2ZDUzMmM1YmJkYWJjIiwiaCI6Im11cm11cjY0In0=";

// Elements
const distance = document.getElementById("distance");
const waiting = document.getElementById("waiting");
const fast = document.getElementById("fast");
const price = document.getElementById("price");

const pickup = document.getElementById("pickup");
const delivery = document.getElementById("delivery");

// Alexandria areas + coordinates
const areas = [
  // شرق اسكندرية
  { name: "أبو قير", lat: 31.319, lng: 30.067 },

  { name: "طوسون", lat: 31.307, lng: 30.055 },

  { name: "المعمورة البلد", lat: 31.295, lng: 30.04 },

  { name: "المعمورة الشاطئ", lat: 31.289, lng: 30.03 },

  { name: "الطابية", lat: 31.287, lng: 30.025 },

  { name: "المنتزة", lat: 31.285, lng: 30.02 },

  { name: "المندرة قبلي", lat: 31.282, lng: 30.015 },

  { name: "المندرة بحري", lat: 31.284, lng: 30.017 },

  { name: "سيدي بشر قبلي", lat: 31.255, lng: 29.985 },

  { name: "سيدي بشر بحري", lat: 31.258, lng: 29.988 },

  { name: "العصافرة قبلي", lat: 31.27, lng: 29.995 },

  { name: "العصافرة بحري", lat: 31.273, lng: 29.998 },

  { name: "الساعة", lat: 31.25, lng: 29.975 },

  { name: "فيكتوريا", lat: 31.245, lng: 29.972 },

  { name: "ميامي", lat: 31.267, lng: 30.0 },

  { name: "جناكليس", lat: 31.24, lng: 29.965 },

  { name: "رشدي", lat: 31.235, lng: 29.955 },

  { name: "السيوف", lat: 31.26, lng: 29.99 },

  { name: "باكوس", lat: 31.245, lng: 29.97 },

  { name: "لوران", lat: 31.238, lng: 29.96 },

  { name: "فلمنج", lat: 31.236, lng: 29.958 },

  { name: "وابور المياه", lat: 31.225, lng: 29.95 },

  { name: "الحضرة", lat: 31.21, lng: 29.94 },

  { name: "سموحة", lat: 31.215, lng: 29.955 },

  { name: "سان ستيفانو", lat: 31.245, lng: 29.965 },

  { name: "زيزينيا", lat: 31.242, lng: 29.962 },

  { name: "جليم", lat: 31.239, lng: 29.958 },

  { name: "كليوباترا", lat: 31.233, lng: 29.95 },

  { name: "بولكلي", lat: 31.23, lng: 29.947 },

  { name: "مصطفى كامل", lat: 31.228, lng: 29.944 },

  { name: "سيدي جابر", lat: 31.22, lng: 29.942 },

  { name: "سبورتنج", lat: 31.23, lng: 29.94 },

  { name: "الإبراهيمية", lat: 31.215, lng: 29.93 },

  { name: "كامب شيزار", lat: 31.21, lng: 29.925 },

  { name: "الشاطبي", lat: 31.208, lng: 29.92 },

  { name: "الأزاريطة", lat: 31.205, lng: 29.915 },

  { name: "العطارين", lat: 31.202, lng: 29.91 },

  { name: "محطة مصر", lat: 31.198, lng: 29.905 },

  { name: "محطة الرمل", lat: 31.2, lng: 29.899 },

  { name: "الجمرك", lat: 31.195, lng: 29.89 },

  { name: "رأس التين", lat: 31.19, lng: 29.88 },

  { name: "الأنفوشي", lat: 31.192, lng: 29.875 },

  { name: "بحري", lat: 31.195, lng: 29.87 },

  { name: "المنشية", lat: 31.198, lng: 29.885 },

  { name: "اللبان", lat: 31.19, lng: 29.9 },

  { name: "محرم بك", lat: 31.185, lng: 29.91 },

  { name: "كرموز", lat: 31.18, lng: 29.895 },

  { name: "القباري", lat: 31.175, lng: 29.88 },

  { name: "الورديان", lat: 31.17, lng: 29.86 },

  { name: "المكس", lat: 31.16, lng: 29.84 },

  { name: "الدخيلة", lat: 31.145, lng: 29.82 },

  { name: "العجمي", lat: 31.13, lng: 29.78 },

  { name: "الهانوفيل", lat: 31.12, lng: 29.76 },

  { name: "البيطاش", lat: 31.125, lng: 29.77 },

  { name: "الكيلو 21", lat: 31.1, lng: 29.73 },
];

// Load areas
function loadAreas() {
  areas.forEach((area) => {
    pickup.innerHTML += `
      <option value="${area.name}">
        ${area.name}
      </option>
    `;

    delivery.innerHTML += `
      <option value="${area.name}">
        ${area.name}
      </option>
    `;
  });
}

// Calculate price
function calculate() {
  const km = Number(distance.value || 0);

  let total = 0;

  // أول 3 كم
  if (km <= 3) {
    total = 15;
  }

  // بعد 3 كم
  else {
    total = 15 + (km - 3) * 3;
  }

  // انتظار
  if (waiting.checked) {
    total += 20;
  }

  // أوردر سريع
  if (fast.checked) {
    total += 15;
  }

  price.innerText = Math.round(total) + " جنيه";

  return Math.round(total);
}

// Get distance from API
async function calculateDistance() {
  if (!pickup.value || !delivery.value) {
    return;
  }

  if (pickup.value === delivery.value) {
    alert("اختر منطقتين مختلفتين");

    return;
  }

  try {
    distance.value = "جاري الحساب...";

    const from = areas.find((area) => area.name === pickup.value);

    const to = areas.find((area) => area.name === delivery.value);

    const response = await fetch(
      "https://api.openrouteservice.org/v2/directions/driving-car",
      {
        method: "POST",

        headers: {
          Authorization: API_KEY,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          coordinates: [
            [from.lng, from.lat],

            [to.lng, to.lat],
          ],
        }),
      },
    );

    const data = await response.json();

    const meters = data.routes[0].summary.distance;

    const km = Math.round(meters / 1000);

    distance.value = km;

    calculate();
  } catch (error) {
    console.error(error);

    alert("حدث خطأ في حساب المسافة");

    distance.value = "";
  }
}

// WhatsApp
function sendWhatsapp() {
  const total = calculate();

  const msg = `🚚 طلب جديد من مسافة السكة

الاسم: ${document.getElementById("name").value}


نوع الأوردر: ${document.getElementById("orderType").value}


مكان الاستلام: ${pickup.value}

مكان التسليم: ${delivery.value}

المسافة: ${distance.value} كم

السعر النهائي: ${total} جنيه`;

  window.open(`https://wa.me/201017678009?text=${encodeURIComponent(msg)}`);
}

// Events
pickup.addEventListener("change", calculateDistance);

delivery.addEventListener("change", calculateDistance);

waiting.addEventListener("change", calculate);

fast.addEventListener("change", calculate);

// Init
loadAreas();

calculate();
