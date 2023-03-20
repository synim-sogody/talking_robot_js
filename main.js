// Get the input and button elements
const inputText = document.getElementById("input-text");
const speakBtn = document.getElementById("speak-btn");

// Function to perform speech synthesis
function speak() {
  const speechSynthesisInstance = window.speechSynthesis;
  const text = inputText.value;

  if (text.trim()) {
    const utterance = new SpeechSynthesisUtterance(text);

    // (Optional) Modify voice settings
    const setVoice = () => {
      speechSynthesisInstance.getVoices().forEach((voice) => {
        if (voice.lang.includes("en") && voice.name.includes("Google")) {
          utterance.voice = voice;
        }
      });
    };
    setVoice();

    // Modify pitch and rate for a more human-like voice
    utterance.pitch = 1;
    utterance.rate = 1;

    // When speech starts
    utterance.addEventListener("start", () => {
      speakBtn.textContent = "Speaking…";
      speakBtn.disabled = true;
    });

    // When speech ends
    utterance.addEventListener("end", () => {
      speakBtn.textContent = "Speak";
      speakBtn.disabled = false;
    });

    speechSynthesisInstance.speak(utterance);
  } else {
    alert("Please type something for the robot to speak");
  }
}

function onVoicesChanged(handler) {
  speechSynthesis.addEventListener("voiceschanged", handler);
  // Fallback for Safari
  setTimeout(() => {
    if (speechSynthesis.getVoices().length > 0) {
      handler();
    }
  }, 500);
}

// Load available voices when the page is ready
onVoicesChanged(() => {
  speakBtn.disabled = false;
});

// Initially disable the speak button and load available voices
speakBtn.disabled = true;
window.speechSynthesis.getVoices();

// Add event listener to the speak button
speakBtn.addEventListener("click", speak);