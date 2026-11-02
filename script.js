const $ = (id) => document.getElementById(id);

let language = "en";
let currentQuestion = 0;
let score = 0;
let answered = false;

let progress = JSON.parse(localStorage.getItem("jalrakshakProgress")) || {
  saved: 0,
  tips: [],
  points: 0,
  challenges: 0
};

const translations = {
  en: {
    heroEyebrow: "SAVE WATER • SAVE LIFE",
    heroTitle: "Every Drop<br>Matters!",
    heroText: "Small steps today, a better tomorrow. Let's protect our planet's most precious resource.",
    overview: "YOUR PROGRESS",
    dashboard: "Dashboard",
    waterSaved: "Water saved",
    tipsExplored: "Tips explored",
    quizPoints: "Quiz points",
    dailyChallenge: "DAILY WATER CHALLENGE",
    challengeTitle: "Turn off the tap while brushing",
    challengeText: "A small habit can prevent unnecessary water waste.",
    completeChallenge: "Complete challenge",
    whyTitle: "Why save water?",
    whyText: "Fresh water is limited and essential for every living being. Saving it today helps protect tomorrow.",
    photoSectionEyebrow: "WATER IN EVERYDAY LIFE",
    photoSectionTitle: "Protect Every Drop",
    photoCaption1: "Freshwater ecosystems",
    photoCaption2: "Rainwater collection",
    photoCaption3: "Water plants wisely",
    photoCaption4: "Smart home habits",
    smallChanges: "SMALL CHANGES, BIG IMPACT",
    tipsTitle: "Save Water Tips",
    tipsIntro: "Simple everyday actions can make a real difference.",
    harvestRain: "HARVEST THE RAIN",
    rainTitle: "Rainwater Harvesting",
    rainIntro: "Collect rain today and conserve water for tomorrow.",
    whatIsRain: "What is rainwater harvesting?",
    rainDescription: "It is the process of collecting and storing rainwater from rooftops or other surfaces for later use.",
    howItWorks: "How it works",
    safetyNote: "Safety note",
    rainSafety: "Stored rainwater is not automatically safe to drink. Drinking water must be properly treated and tested. Use untreated collected water for suitable non-drinking purposes.",
    knowUsage: "KNOW YOUR USAGE",
    calculatorTitle: "Water Calculator",
    calculatorIntro: "Estimate your household's daily water use.",
    peopleLabel: "Number of people",
    usageLabel: "Daily usage per person (litres)",
    calculate: "Calculate usage",
    resultHint: "Your daily household estimate will appear here.",
    calculatorNote: "This is an estimate based on the values you enter, not a measured bill.",
    learnAndPlay: "LEARN AND PLAY",
    quizTitle: "Water Awareness Quiz",
    quizIntro: "Answer questions, learn facts and earn points.",
    nextQuestion: "Next question →",
    restartQuiz: "Start a new round",
    everyDropCounts: "EVERY DROP COUNTS",
    impactTitle: "My Impact",
    impactIntro: "Your actions add up to a better future.",
    totalWaterSaved: "Total water saved",
    challengesCompleted: "Challenges completed",
    totalQuizPoints: "Total quiz points",
    tipsRead: "Tips explored",
    keepGoing: "Keep going!",
    keepGoingText: "Consistent small actions are more powerful than one big action.",
    resetProgress: "Reset progress",
    resetNote: "Resetting will clear saved progress on this device.",
    navHome: "Home",
    navTips: "Tips",
    navRain: "Rain",
    navCalculator: "Calc",
    navQuiz: "Quiz",
    navImpact: "Impact"
  },

  hi: {
    heroEyebrow: "जल बचाएँ • जीवन बचाएँ",
    heroTitle: "हर बूंद<br>कीमती है!",
    heroText: "आज के छोटे कदम, बेहतर कल बनाएँ। आइए पानी के अनमोल संसाधन को बचाएँ।",
    overview: "आपकी प्रगति",
    dashboard: "डैशबोर्ड",
    waterSaved: "बचाया गया पानी",
    tipsExplored: "देखे गए सुझाव",
    quizPoints: "क्विज़ अंक",
    dailyChallenge: "आज की जल चुनौती",
    challengeTitle: "ब्रश करते समय नल बंद रखें",
    challengeText: "एक छोटी आदत पानी की बर्बादी रोक सकती है।",
    completeChallenge: "चुनौती पूरी करें",
    whyTitle: "पानी क्यों बचाएँ?",
    whyText: "स्वच्छ पानी सीमित है और हर जीव के लिए आवश्यक है। आज पानी बचाकर हम कल की रक्षा करते हैं।",
    photoSectionEyebrow: "रोज़मर्रा की ज़िंदगी में पानी",
    photoSectionTitle: "हर बूंद बचाएँ",
    photoCaption1: "स्वच्छ जल पारिस्थितिकी",
    photoCaption2: "वर्षा जल संग्रह",
    photoCaption3: "पौधों को समझदारी से पानी दें",
    photoCaption4: "घर में पानी बचाने की आदतें",
    smallChanges: "छोटे बदलाव, बड़ा असर",
    tipsTitle: "पानी बचाने के सुझाव",
    tipsIntro: "रोज़मर्रा के छोटे काम बड़ा बदलाव ला सकते हैं।",
    harvestRain: "बारिश का पानी सहेजें",
    rainTitle: "वर्षा जल संचयन",
    rainIntro: "आज बारिश का पानी इकट्ठा करें और कल के लिए बचाएँ।",
    whatIsRain: "वर्षा जल संचयन क्या है?",
    rainDescription: "छत या अन्य सतहों से बारिश का पानी इकट्ठा करके भविष्य में उपयोग के लिए जमा करना वर्षा जल संचयन कहलाता है।",
    howItWorks: "यह कैसे काम करता है",
    safetyNote: "सुरक्षा सूचना",
    rainSafety: "जमा किया गया वर्षा जल पीने के लिए अपने आप सुरक्षित नहीं होता। पीने के पानी का उचित उपचार और परीक्षण आवश्यक है।",
    knowUsage: "अपने उपयोग को जानें",
    calculatorTitle: "जल कैलकुलेटर",
    calculatorIntro: "अपने घर के दैनिक पानी के उपयोग का अनुमान लगाएँ।",
    peopleLabel: "लोगों की संख्या",
    usageLabel: "प्रति व्यक्ति दैनिक उपयोग (लीटर)",
    calculate: "उपयोग की गणना करें",
    resultHint: "आपके घर के दैनिक उपयोग का अनुमान यहाँ दिखाई देगा।",
    calculatorNote: "यह आपके द्वारा दर्ज किए गए आँकड़ों पर आधारित अनुमान है।",
    learnAndPlay: "सीखें और खेलें",
    quizTitle: "जल जागरूकता क्विज़",
    quizIntro: "प्रश्नों के उत्तर दें, जानकारी सीखें और अंक पाएँ।",
    nextQuestion: "अगला प्रश्न →",
    restartQuiz: "नई क्विज़ शुरू करें",
    everyDropCounts: "हर बूंद मायने रखती है",
    impactTitle: "मेरा योगदान",
    impactIntro: "आपके छोटे प्रयास बेहतर भविष्य बनाते हैं।",
    totalWaterSaved: "कुल बचाया गया पानी",
    challengesCompleted: "पूरी की गई चुनौतियाँ",
    totalQuizPoints: "कुल क्विज़ अंक",
    tipsRead: "देखे गए सुझाव",
    keepGoing: "ऐसे ही आगे बढ़ें!",
    keepGoingText: "नियमित छोटे प्रयास एक बड़े बदलाव से भी अधिक प्रभावशाली हो सकते हैं।",
    resetProgress: "प्रगति रीसेट करें",
    resetNote: "रीसेट करने से इस डिवाइस पर सेव की गई प्रगति मिट जाएगी।",
    navHome: "होम",
    navTips: "सुझाव",
    navRain: "बारिश",
    navCalculator: "गणना",
    navQuiz: "क्विज़",
    navImpact: "योगदान"
  }
};

const tips = [
  {
    icon: "🚰",
    en: "Turn off taps when not in use",
    hi: "इस्तेमाल न होने पर नल बंद रखें",
    detailEn: "Avoid leaving taps running while brushing or washing.",
    detailHi: "ब्रश करते या हाथ धोते समय नल खुला न छोड़ें।"
  },
  {
    icon: "🪣",
    en: "Use a bucket instead of a shower",
    hi: "शॉवर की जगह बाल्टी का उपयोग करें",
    detailEn: "A bucket can help you control water use.",
    detailHi: "बाल्टी से पानी का उपयोग नियंत्रित करने में मदद मिलती है।"
  },
  {
    icon: "🌧️",
    en: "Collect rainwater",
    hi: "बारिश का पानी इकट्ठा करें",
    detailEn: "Collect rainwater for suitable household and garden uses.",
    detailHi: "बारिश का पानी बगीचे और अन्य उचित घरेलू कामों के लिए जमा करें।"
  },
  {
    icon: "🌱",
    en: "Water plants wisely",
    hi: "पौधों को समझदारी से पानी दें",
    detailEn: "Water plants when needed and avoid unnecessary watering.",
    detailHi: "ज़रूरत के अनुसार पौधों को पानी दें।"
  },
  {
    icon: "🔧",
    en: "Fix leaking taps",
    hi: "टपकते नल ठीक करवाएँ",
    detailEn: "Repair leaks to prevent continuous water loss.",
    detailHi: "पानी की लगातार बर्बादी रोकने के लिए रिसाव ठीक करवाएँ।"
  },
  {
    icon: "🧺",
    en: "Run full washing loads",
    hi: "पूरे कपड़े होने पर ही मशीन चलाएँ",
    detailEn: "Wait until you have a full load before washing.",
    detailHi: "कपड़े धोने की मशीन तभी चलाएँ जब पर्याप्त कपड़े हों।"
  }
];

const rainSteps = [
  ["🏠", "Collect", "छत से बारिश का पानी इकट्ठा करें।"],
  ["🧹", "Filter", "पत्तियाँ और गंदगी हटाने के लिए उचित फिल्टर लगाएँ।"],
  ["🛢️", "Store", "पानी को साफ और ढके हुए टैंक में जमा करें।"],
  ["🌱", "Reuse", "उपयुक्त गैर-पीने वाले कामों में उपयोग करें।"]
];

const questions = [
  {
    q: "Which action saves water while brushing?",
    h: "ब्रश करते समय पानी कैसे बचाएँ?",
    options: ["Keep tap open", "Turn off the tap", "Use a hose"],
    hindi: ["नल खुला रखें", "नल बंद रखें", "पाइप का उपयोग करें"],
    answer: 1,
    fact: "Turning off the tap prevents unnecessary water waste."
  },
  {
    q: "What is rainwater harvesting?",
    h: "वर्षा जल संचयन क्या है?",
    options: ["Collecting rainwater", "Wasting rainwater", "Heating water"],
    hindi: ["बारिश का पानी इकट्ठा करना", "बारिश का पानी बर्बाद करना", "पानी गर्म करना"],
    answer: 0,
    fact: "Rainwater can be collected and stored for later suitable use."
  },
  {
    q: "Which is a freshwater source?",
    h: "स्वच्छ जल का स्रोत कौन-सा है?",
    options: ["Ocean", "River", "Salt lake"],
    hindi: ["समुद्र", "नदी", "खारे पानी की झील"],
    answer: 1,
    fact: "Rivers are important freshwater sources."
  },
  {
    q: "What should you do about a leaking tap?",
    h: "टपकते नल के साथ क्या करना चाहिए?",
    options: ["Ignore it", "Repair it", "Open it more"],
    hindi: ["ध्यान न दें", "उसे ठीक करवाएँ", "और खोल दें"],
    answer: 1,
    fact: "Repairing leaks helps prevent water loss."
  },
  {
    q: "Is untreated rainwater always safe to drink?",
    h: "क्या बिना उपचार का वर्षा जल हमेशा पीने योग्य है?",
    options: ["Yes", "No", "Only at night"],
    hindi: ["हाँ", "नहीं", "केवल रात में"],
    answer: 1,
    fact: "Rainwater must be properly treated and tested before drinking."
  }
];

function saveProgress() {
  localStorage.setItem("jalrakshakProgress", JSON.stringify(progress));
  updateDashboard();
}

function showToast(message) {
  const toast = $("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

// NAVIGATION
function openPage(pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.toggle("active", page.id === pageId);
  });

  document.querySelectorAll(".nav-item").forEach(button => {
    button.classList.toggle("active", button.dataset.page === pageId);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll(".nav-item").forEach(button => {
  button.addEventListener("click", () => openPage(button.dataset.page));
});

// LANGUAGE
function changeLanguage() {
  language = language === "en" ? "hi" : "en";

  document.documentElement.lang = language;

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    if (translations[language][key]) {
      element.innerHTML = translations[language][key];
    }
  });

  $("languageBtn").textContent = language === "en" ? "हिन्दी" : "English";

  renderTips();
  renderRainSteps();
  showQuestion();
  updateDashboard();
}

$("languageBtn").addEventListener("click", changeLanguage);

// TIPS
function renderTips() {
  const container = $("tipsContainer");

  container.innerHTML = tips.map((tip, index) => `
    <article class="tip-card">
      <span class="tip-icon">${tip.icon}</span>
      <h2>${language === "en" ? tip.en : tip.hi}</h2>
      <p>${language === "en" ? tip.detailEn : tip.detailHi}</p>
      <button class="button button-primary tip-done" data-index="${index}">
        ${progress.tips.includes(index)
          ? (language === "en" ? "Explored ✓" : "देख लिया ✓")
          : (language === "en" ? "Explore tip" : "सुझाव देखें")}
      </button>
    </article>
  `).join("");

  container.querySelectorAll(".tip-done").forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);

      if (!progress.tips.includes(index)) {
        progress.tips.push(index);
        saveProgress();
        renderTips();
        showToast(language === "en" ? "Tip explored!" : "सुझाव देख लिया!");
      }
    });
  });

  $("tipsProgress").textContent =
    language === "en"
      ? `${progress.tips.length} of ${tips.length} tips explored`
      : `${tips.length} में से ${progress.tips.length} सुझाव देखे गए`;
}

// RAINWATER STEPS
function renderRainSteps() {
  $("rainSteps").innerHTML = rainSteps.map((step, index) => `
    <article class="rain-step">
      <span>${step[0]}</span>
      <div>
        <h3>${language === "en"
          ? step[1]
          : ["इकट्ठा करें", "फिल्टर करें", "जमा करें", "दोबारा उपयोग करें"][index]}</h3>
        <p>${language === "en" ? [
          "Collect rainwater from rooftops.",
          "Use a suitable filter to remove leaves and dirt.",
          "Store water in a clean, covered tank.",
          "Reuse it for suitable non-drinking purposes."
        ][index] : step[2]}</p>
      </div>
    </article>
  `).join("");
}

// CALCULATOR
$("calculateBtn").addEventListener("click", () => {
  const people = Number($("people").value);
  const usage = Number($("usage").value);
  const result = $("calculatorResult");

  if (!Number.isInteger(people) || people < 1 || people > 100 ||
      !Number.isFinite(usage) || usage < 1 || usage > 10000) {
    result.innerHTML = `<p>${language === "en"
      ? "Please enter valid values."
      : "कृपया सही आँकड़े दर्ज करें।"}</p>`;
    return;
  }

  const total = people * usage;

  result.innerHTML = `
    <span>💧</span>
    <h2>${total.toLocaleString()} L</h2>
    <p>${language === "en"
      ? "Estimated daily household water use"
      : "घर का अनुमानित दैनिक पानी उपयोग"}</p>
  `;
});

// QUIZ
function showQuestion() {
  const question = questions[currentQuestion];

  if (!question) return;

  answered = false;

  $("questionCount").textContent =
    `${language === "en" ? "Question" : "प्रश्न"} ${currentQuestion + 1}/${questions.length}`;

  $("quizScore").textContent =
    `${language === "en" ? "Score" : "अंक"}: ${score}`;

  $("quizProgress").style.width =
    `${(currentQuestion / questions.length) * 100}%`;

  $("questionText").textContent =
    language === "en" ? question.q : question.h;

  $("answerFeedback").textContent = "";
  $("nextQuestionBtn").disabled = true;
  $("nextQuestionBtn").classList.remove("hidden");
  $("restartQuizBtn").classList.add("hidden");

  const options = language === "en" ? question.options : question.hindi;

  $("optionsContainer").innerHTML = options.map((option, index) => `
    <button class="option-btn" data-answer="${index}" type="button">
      ${option}
    </button>
  `).join("");

  $("optionsContainer").querySelectorAll(".option-btn").forEach(button => {
    button.addEventListener("click", () => checkAnswer(Number(button.dataset.answer)));
  });
}

function checkAnswer(selected) {
  if (answered) return;
  answered = true;

  const question = questions[currentQuestion];
  const correct = selected === question.answer;

  if (correct) score++;

  $("optionsContainer").querySelectorAll(".option-btn").forEach((button, index) => {
    button.disabled = true;
    if (index === question.answer) button.classList.add("correct");
    if (index === selected && !correct) button.classList.add("incorrect");
  });

  $("answerFeedback").textContent =
    (correct
      ? (language === "en" ? "Correct! " : "सही जवाब! ")
      : (language === "en" ? "Not quite. " : "सही जवाब नहीं। "))
    + (language === "en" ? question.fact : "जानकारी: " + question.fact);

  $("quizScore").textContent =
    `${language === "en" ? "Score" : "अंक"}: ${score}`;

  $("nextQuestionBtn").disabled = false;
}

$("nextQuestionBtn").addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    finishQuiz();
  }
});

function finishQuiz() {
  progress.points += score;
  saveProgress();

  $("questionText").textContent =
    language === "en" ? "Quiz completed! 🎉" : "क्विज़ पूरी हुई! 🎉";

  $("optionsContainer").innerHTML = "";
  $("answerFeedback").textContent =
    `${language === "en" ? "Your score: " : "आपका स्कोर: "}${score}/${questions.length}`;

  $("quizProgress").style.width = "100%";
  $("nextQuestionBtn").classList.add("hidden");
  $("restartQuizBtn").classList.remove("hidden");
}

$("restartQuizBtn").addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  showQuestion();
});

// DAILY CHALLENGE
$("challengeBtn").addEventListener("click", () => {
  if (progress.challenges > 0) {
    showToast(language === "en"
      ? "Challenge already completed!"
      : "यह चुनौती पहले ही पूरी हो चुकी है!");
    return;
  }

  progress.challenges = 1;
  progress.saved += 5;

  $("challengeBtn").disabled = true;
  $("challengeStatus").textContent =
    language === "en"
      ? "Challenge completed! Estimated saving: 5 L."
      : "चुनौती पूरी! अनुमानित बचत: 5 लीटर।";

  saveProgress();
});

// DASHBOARD AND IMPACT
function updateDashboard() {
  $("homeSaved").textContent = `${progress.saved} L`;
  $("homeTips").textContent = progress.tips.length;
  $("homePoints").textContent = progress.points;

  $("impactSaved").textContent = `${progress.saved} L`;
  $("impactChallenges").textContent = progress.challenges;
  $("impactPoints").textContent = progress.points;
  $("impactTips").textContent = progress.tips.length;

  if (progress.challenges > 0) {
    $("challengeBtn").disabled = true;
    $("challengeBtn").textContent =
      language === "en" ? "Completed ✓" : "पूरी हुई ✓";

    $("challengeStatus").textContent =
      language === "en"
        ? "Challenge completed! Estimated saving: 5 L."
        : "चुनौती पूरी! अनुमानित बचत: 5 लीटर।";
  }
}

// RESET PROGRESS
$("resetProgressBtn").addEventListener("click", () => {
  const confirmed = confirm(
    language === "en"
      ? "Are you sure you want to reset all progress?"
      : "क्या आप अपनी पूरी प्रगति रीसेट करना चाहते हैं?"
  );

  if (!confirmed) return;

  progress = {
    saved: 0,
    tips: [],
    points: 0,
    challenges: 0
  };

  localStorage.removeItem("jalrakshakProgress");

  currentQuestion = 0;
  score = 0;

  $("challengeBtn").disabled = false;
  $("challengeBtn").textContent = translations[language].completeChallenge;
  $("challengeStatus").textContent = "";

  renderTips();
  showQuestion();
  updateDashboard();

  showToast(language === "en" ? "Progress reset!" : "प्रगति रीसेट हो गई!");
});

// PWA INSTALL
let installPrompt;

window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();
  installPrompt = event;
  $("installBtn").hidden = false;
});

$("installBtn").addEventListener("click", async () => {
  if (!installPrompt) return;

  installPrompt.prompt();
  await installPrompt.userChoice;

  installPrompt = null;
  $("installBtn").hidden = true;
});

// SERVICE WORKER
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(error => {
      console.log("Service worker registration failed:", error);
    });
  });
}

// START APP
renderTips();
renderRainSteps();
showQuestion();
updateDashboard();
