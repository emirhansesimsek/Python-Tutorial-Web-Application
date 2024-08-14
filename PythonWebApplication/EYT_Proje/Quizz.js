// Soruları Tanımla
let quizData = [
  {
    question: "Birden Fazla Satırı Yazdırmak İçin Hangisi En Kullanışlı Yöntemdir?",
    options: ["Tek Tırnak", "Çift Tırnak", "Üç Tırnak", "Dört Tırnak"],
    correct: "Üç Tırnak",
    tag: "tag1",
  },
  {
    question: "Hangi Kaçış Karakteri Dosyada Yeni Sayfaya Geçmek İçin Kullanılır?",
    options: ["n", "d", "f", "r"],
    correct: "f",
    tag: "tag2",
  },
  {
    question: "Hangisinin Dikkatsiz Kullanımı Büyük Sorunlara Yol Açabilir?",
    options: ["Lambda", "Dic", "Complex", "Eval"],
    correct: "Eval",
    tag: "tag3",
  },
  {
    question: "print(round(2.5))'in Çıktısı Nedir?",
    options: ["2.6", "3", "2", "2.4"],
    correct: "2",
    tag: "tag4",
  },
  {
    question: "in hangisi İle Birlikte Daha Yaygın Kullanılır?",
    options: ["For", "If", "While", "Try"],
    correct: "For",
    tag: "tag5",
  },
  {
    question: "Hangisi Veya Hangileri Hata Yakalamada Kullanılan Anahtar Kelimelerdendir?",
    options: [
      "Try",
      "Except",
      "Finally",
      "Hepsi",
    ],
    correct: "Hepsi",
    tag: "tag6",
  },
  {
    question: "2^2 İçin Hangileri True Döner?\nI) isdecimal()  II) isdigit()  III) isnumeric() ",
    options: [
      "I",
      "II",
      "II ve III",
      "III",
    ],
    correct: "II ve III",
    tag: "tag7",
  },
  {
    question:
      "Hangisi Kaçis Karakterlerini print Fonksiyonu İçinde Direkt Yazabilmek İçin Tırnak İşaretinden Önce Yazılarak Kullanılır?",
    options: [
      "r",
      "a",
      "b",
      "o",
    ],
    correct: "r",
    tag: "tag8",
  },
  {
    question: "Hangisi print Fonksiyonunun Parametresi Değildir?",
    options: [
      "sep",
      "end",
      "file",
      "Hiçbiri",
    ],
    correct: "Hiçbiri",
    tag: "tag9",
  },
  {
    question: "Bir Listeyi Diğer Bir Liste İçine Eleman Olarak Değilde, Peşine Liste Olarak Ekleme Hangi Fonksiyon ile Yapılır?",
    options: [
      "append()",
      "extend()",
      "insert()",
      "Hiçbiri",
    ],

    correct: "extend()",
    tag: "tag10",
  },
  {
    question: "Hangisi veya Hangileri Listenin Elemanlarını Tersten Yazdırır?\nI)liste[::-1] II) liste.reverse()  III) *reversed(liste)  IV) list(reversed(liste))",
    options: [
      "I",
      "II ve III",
      "I ve IV",
      "III",
    ],
    correct: "I ve IV",
    tag: "tag11",
  },
  {
    question: "list1 = [1,2,3] Hangisi veya Hangileri list2 içinde list1 in kopyasını oluşturur?\nI)list2=list1  II) list2=list1[:]  III) list2=list(list1)",
    options: [
      "I",
      "II ve III",
      "III",
      "II",
    ],
    correct: "II ve III",
    tag: "tag12",
  },
  
];
// Quizz.html Sayfasındaki bütün elemanları seçiyorum.
const quizContainer = document.querySelector(".quiz-container");
const questionElement = document.querySelector(".quiz-container .question");
const optionsElement = document.querySelector(".quiz-container .options");
const nextBtn = document.querySelector(".quiz-container .next-btn");
const quizResult = document.querySelector(".quiz-result");
const startBtnContainer = document.querySelector(".start-btn-container");
const startBtn = document.querySelector(".start-btn-container .start-btn");


let questionNumber = 0;
let score = 0;
const MAX_QUESTIONS = 5;
let timerInterval;

const shuffleArray = (array) => { //Rastgele dizideki elemanları karıştırır.
  return array.slice().sort(() => Math.random() - 0.5); // Orijinal diziyi bozmamak için yeniden diziyi kopyalar ve rastgele şekilde yer değiştirir.
};

quizData = shuffleArray(quizData); //Karıştırılmış ve yeniden düzenlenmiş halini quizz dataya attık.

const resetLocalStorage = () => { // her sınav başlamadan eski soruları siler. (Belleği temizleriz.)
  for (let i = 0; i < MAX_QUESTIONS; i++) {
    localStorage.removeItem(`userAnswer_${i}`);
  }
};

resetLocalStorage();

//Cevabın kontrolünü yapar.
const checkAnswer = (e) => {
  let userAnswer = e.target.textContent;
  const currentQuestion = quizData[questionNumber];
  clearInterval(timerInterval); //Zamanı durdurma
  if (userAnswer === quizData[questionNumber].correct) {
    score++;
    e.target.classList.add("correct");
  } else {
    e.target.classList.add("incorrect");

    
    const explanation = document.createElement("div");
    if (currentQuestion.tag === "tag1") {
      explanation.textContent = '"En yaygın yöntem üç tırnak """ kullanmaktır.Bu yöntem çoklu satırlı dizeler oluşturmanın ve bu dizeleri doğrudan yazdırmanın basit ve etkili bir yoludur.';
    } else if (currentQuestion.tag === "tag2") {
      explanation.textContent = "Python'da dosyada yeni bir sayfaya geçmek için f (form feed) kaçış karakteri kullanılır. Form feed karakteri, yazıcıların veya diğer çıktı aygıtlarının bir sonraki sayfaya geçmelerini sağlar.";
    } 
    else if (currentQuestion.tag === "tag3") {
      explanation.textContent = "eval() fonksiyonu, bir metin dizesi olarak verilen Python ifadesini yürüterek sonucunu döndüren bir işlevdir. Bu fonksiyon, kullanıcı girişini yorumlamak veya çalıştırmak için kullanılabilir, ancak güvenlik riskleri taşır ve doğru bir şekilde kullanılmadığında ciddi sorunlara neden olabilir.";
    }
    else if (currentQuestion.tag === "tag4") {
      explanation.textContent = "round() fonksiyonu, yuvarlama işlemini en yakın çift sayıya göre gerçekleştirir ve sonucu döndürür.";
    } 
    else if (currentQuestion.tag === "tag5") {
      explanation.textContent = "For döngüsünde daha yaygın olarak kullanılır. For döngüsü, belirli bir koşul veya koleksiyon üzerinde yineleme yapmak için kullanılır ve genellikle bir dizi veya liste üzerinde elemanları tek tek işlemek için tercih edilir.";
    } 
    else if (currentQuestion.tag === "tag6") {
      explanation.textContent = "Python'da hata yakalamak için kullanılan anahtar kelimeler try, except, finally ve raise'dir. Bu anahtar kelimeler, programların belirli hatalarla başa çıkmasını veya özel durumları ele almasını sağlar.";
    } 
    else if (currentQuestion.tag === "tag7") {
      explanation.textContent = "2^2 ifadesi Python'da 2**2 şeklinde ifade edilir ve sonucu 4 olarak hesaplanır. Bu ifadenin sonucunu değerlendirmek için isdecimal(), isdigit(), ve isnumeric() gibi yöntemler kullanılabilir.";
    } 
    else if (currentQuestion.tag === "tag8") {
      explanation.textContent = "Python'da kaçış karakterlerini (escape characters) print() fonksiyonu içinde doğrudan yazabilmek için tırnak işaretinden önce r veya R karakteri kullanılır. Bu karakter, 'raw string' (ham string) olarak adlandırılan özel bir string türünü belirtir ve kaçış karakterlerini etkisiz hale getirir.";
    } 
    else if (currentQuestion.tag === "tag9") {
      explanation.textContent = "sep, end, file, ve flush parametreleri özel olarak belirtilir ve print() fonksiyonunun davranışını değiştirmek için kullanılır.";
    } 
    else if (currentQuestion.tag === "tag10") {
      explanation.textContent = "Bir listenin elemanlarını, diğer bir listenin sonuna liste olarak eklemek için extend() fonksiyonu kullanılır.";
    } 
    else if (currentQuestion.tag === "tag11") {
      explanation.textContent = "Listenin elemanlarını tersten yazdırmak için Python'da farklı yöntemler kullanılabilir: Liste Slicing ([::-1]) ,reverse() Metodu ,reversed() Fonksiyonu Kullanılır.";
    }  
    else if (currentQuestion.tag === "tag12") {
      explanation.textContent = "En yaygın ve basit yöntem, liste slicing (list1[:]) veya list() fonksiyonu kullanmaktır. Bu yöntemler, listenin elemanlarını tamamen kopyalar ve bağımsız bir liste oluşturur.";
    } 
    else {
      explanation.textContent = "Yanlış cevap. Doğru cevap: " + currentQuestion.correct;
    }
    explanation.classList.add("explanation");
    e.target.parentNode.appendChild(explanation);
  }
// Kullanıcı cevap verdiğinde diğer seçenekleri disabled yapar.
  localStorage.setItem(`userAnswer_${questionNumber}`, userAnswer);

  let allOptions = document.querySelectorAll(".quiz-container .option");
  allOptions.forEach((o) => {
    o.classList.add("disabled");
  });
  nextBtn.disabled = false; // Butona tıklayıp diger koda geçebilir.
};


// Eğerki index 2 ten sonraki zaman (yani 3 den itibaren kırmızı uyarı vererek zaman azalır.)
const createQuestion = () => {
  clearInterval(timerInterval);

  let secondsLeft = 9;
  const timerDisplay = document.querySelector(".quiz-container .timer");
  timerDisplay.classList.remove("danger");

  timerDisplay.textContent = `Kalan Zaman: 10 Saniye`;

  timerInterval = setInterval(() => {
    timerDisplay.textContent = `Kalan Zaman: ${secondsLeft.toString().padStart(2, "0")} Saniye`;
    secondsLeft--;

    if (secondsLeft < 3) {
      timerDisplay.classList.add("danger");
    }

    if (secondsLeft < 0) {
      clearInterval(timerInterval);
      displayNextQuestion();
    }
  }, 1000);

  optionsElement.innerHTML = "";
  questionElement.innerHTML = `<span class='Soru'>${questionNumber + 1}/${MAX_QUESTIONS}) </span>${quizData[questionNumber].question}`;

  const shuffledOptions = shuffleArray(quizData[questionNumber].options);

  shuffledOptions.forEach((o) => {
    const option = document.createElement("button");
    option.classList.add("option");
    option.innerHTML = o;
    option.addEventListener("click", (e) => {
      checkAnswer(e);
    });

   
    const previousExplanation = document.querySelector(".explanation");
    if (previousExplanation) {
      previousExplanation.remove();
    }

    optionsElement.appendChild(option);
  });
};
// Yeniden testi başlatma.
const retakeQuiz = () => {
  questionNumber = 0;
  score = 0;
  quizData = shuffleArray(quizData);
  resetLocalStorage();

  createQuestion();
  quizResult.style.display = "none";
  quizContainer.style.display = "block";
};
// Sonuçlar Kısmının Görüntülenmesi
const displayQuizResult = () => {
  quizResult.style.display = "flex";
  quizContainer.style.display = "none";
  quizResult.innerHTML = "";

  const resultHeading = document.createElement("h2");
  resultHeading.innerHTML = `${MAX_QUESTIONS} Soruda ${score} Doğru Cevap Verdin.`;
  quizResult.appendChild(resultHeading);

  for (let i = 0; i < MAX_QUESTIONS; i++) {
    const resultItem = document.createElement("div");
    resultItem.classList.add("question-container");

    const userAnswer = localStorage.getItem(`userAnswer_${i}`);
    const correctAnswer = quizData[i].correct;

    let answeredCorrectly = userAnswer === correctAnswer;

    if (!answeredCorrectly) {
      resultItem.classList.add("incorrect");
    }

    resultItem.innerHTML = `<div class="question">Soru ${i + 1}: ${quizData[i].question}</div>
    <div class="user-answer">Cevabın: ${userAnswer || "Boş"}</div>
    <div class="correct-answer">Doğru Cevap: ${correctAnswer}</div>`;

    quizResult.appendChild(resultItem);
  }
// Yeniden başlatma butonu işlemleri
  const retakeBtn = document.createElement("button");
  retakeBtn.classList.add("retake-btn");
  retakeBtn.innerHTML = "Tekrar Dene";
  retakeBtn.addEventListener("click", retakeQuiz);
  quizResult.appendChild(retakeBtn);
};

const displayNextQuestion = () => { // Son soruda mı değil mi onun kontrolü
  if (questionNumber >= MAX_QUESTIONS - 1) {
    displayQuizResult();
    return;
  }

  questionNumber++;
  createQuestion();
};
// Sınav basla ve sonucları görüntüle sayfası işlemleri
nextBtn.addEventListener("click", displayNextQuestion);

startBtn.addEventListener("click", () => {
  startBtnContainer.style.display = "none";
  quizContainer.style.display = "block";
  createQuestion();
});