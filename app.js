document.addEventListener('DOMContentLoaded', function() {
  // Initialize bootstrap components
  const toastElList = document.querySelectorAll('.toast');
  const toasts = [...toastElList].map(toastEl => new bootstrap.Toast(toastEl));
  
  // App state
  const APP_STATE = {
      decks: [],
      currentDeckIndex: -1,
      currentCardIndex: 0,
      currentEditCardIndex: 0,
      activeLanguages: { english: true, chinese: true, laos: true },
      isRecording: false,
      currentRecorder: null,
      currentRecordingElement: null,
      mediaRecorder: null,
      audioChunks: [],
      saveTimeout: null,
  };

  // Sample initial deck data with banking vocabulary
  const initialDeck = {
      id: generateUUID(),
      name: "Banking Vocabulary",
      languages: ["english", "chinese"],
      cards: [
          {
              id: generateUUID(),
              question: {
                  english: "account1",
                  chinese: "test",
                  laos: "test"
              },
              answer: {
                  english: "11",
                  chinese: "帐户",
                  laos: "11"
              },
              questionAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              },
              answerAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              }
          },
          {
              id: generateUUID(),
              question: {
                  english: "bank",
                  chinese: "",
                  laos: ""
              },
              answer: {
                  english: "",
                  chinese: "银行",
                  laos: ""
              },
              questionAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              },
              answerAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              }
          },
          {
              id: generateUUID(),
              question: {
                  english: "cash",
                  chinese: "",
                  laos: ""
              },
              answer: {
                  english: "",
                  chinese: "现金",
                  laos: ""
              },
              questionAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              },
              answerAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              }
          },
          {
              id: generateUUID(),
              question: {
                  english: "cash a check",
                  chinese: "",
                  laos: ""
              },
              answer: {
                  english: "",
                  chinese: "兑现",
                  laos: ""
              },
              questionAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              },
              answerAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              }
          },
          {
              id: generateUUID(),
              question: {
                  english: "check",
                  chinese: "",
                  laos: ""
              },
              answer: {
                  english: "",
                  chinese: "支票",
                  laos: ""
              },
              questionAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              },
              answerAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              }
          },
          {
              id: generateUUID(),
              question: {
                  english: "counter",
                  chinese: "",
                  laos: ""
              },
              answer: {
                  english: "",
                  chinese: "柜台",
                  laos: ""
              },
              questionAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              },
              answerAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              }
          },
          {
              id: generateUUID(),
              question: {
                  english: "credit card",
                  chinese: "",
                  laos: ""
              },
              answer: {
                  english: "",
                  chinese: "信用卡",
                  laos: ""
              },
              questionAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              },
              answerAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              }
          },
          {
              id: generateUUID(),
              question: {
                  english: "deposit (into an account)",
                  chinese: "",
                  laos: ""
              },
              answer: {
                  english: "",
                  chinese: "存款",
                  laos: ""
              },
              questionAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              },
              answerAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              }
          },
          {
              id: generateUUID(),
              question: {
                  english: "exchange money",
                  chinese: "",
                  laos: ""
              },
              answer: {
                  english: "",
                  chinese: "换钱",
                  laos: ""
              },
              questionAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              },
              answerAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              }
          },
          {
              id: generateUUID(),
              question: {
                  english: "exchange rate",
                  chinese: "",
                  laos: ""
              },
              answer: {
                  english: "",
                  chinese: "汇率",
                  laos: ""
              },
              questionAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              },
              answerAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              }
          },
          {
              id: generateUUID(),
              question: {
                  english: "ID card",
                  chinese: "",
                  laos: ""
              },
              answer: {
                  english: "",
                  chinese: "身份证",
                  laos: ""
              },
              questionAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              },
              answerAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              }
          },
          {
              id: generateUUID(),
              question: {
                  english: "manager",
                  chinese: "",
                  laos: ""
              },
              answer: {
                  english: "",
                  chinese: "经理",
                  laos: ""
              },
              questionAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              },
              answerAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              }
          },
          {
              id: generateUUID(),
              question: {
                  english: "open an account",
                  chinese: "",
                  laos: ""
              },
              answer: {
                  english: "",
                  chinese: "开户",
                  laos: ""
              },
              questionAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              },
              answerAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              }
          },
          {
              id: generateUUID(),
              question: {
                  english: "passport",
                  chinese: "",
                  laos: ""
              },
              answer: {
                  english: "",
                  chinese: "护照",
                  laos: ""
              },
              questionAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              },
              answerAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              }
          },
          {
              id: generateUUID(),
              question: {
                  english: "teller",
                  chinese: "",
                  laos: ""
              },
              answer: {
                  english: "",
                  chinese: "出纳员",
                  laos: ""
              },
              questionAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              },
              answerAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              }
          },
          {
              id: generateUUID(),
              question: {
                  english: "traveler's check",
                  chinese: "",
                  laos: ""
              },
              answer: {
                  english: "",
                  chinese: "旅行支票",
                  laos: ""
              },
              questionAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              },
              answerAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              }
          },
          {
              id: generateUUID(),
              question: {
                  english: "visa",
                  chinese: "",
                  laos: ""
              },
              answer: {
                  english: "",
                  chinese: "签证",
                  laos: ""
              },
              questionAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              },
              answerAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              }
          },
          {
              id: generateUUID(),
              question: {
                  english: "window",
                  chinese: "",
                  laos: ""
              },
              answer: {
                  english: "",
                  chinese: "窗口",
                  laos: ""
              },
              questionAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              },
              answerAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              }
          },
          {
              id: generateUUID(),
              question: {
                  english: "withdraw money",
                  chinese: "",
                  laos: ""
              },
              answer: {
                  english: "",
                  chinese: "提款",
                  laos: ""
              },
              questionAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              },
              answerAudio: {
                  english: null,
                  chinese: null,
                  laos: null
              }
          }
      ]
  };

  // Create IndexedDB database for storage
  let db;
  const request = indexedDB.open("FlashcardAppDB", 1);
  
  request.onupgradeneeded = function(event) {
      db = event.target.result;
      
      // Create object stores
      if (!db.objectStoreNames.contains("decks")) {
          db.createObjectStore("decks", { keyPath: "id" });
      }
  };
  
  request.onsuccess = function(event) {
      db = event.target.result;
      loadDecksFromDB();
  };
  
  request.onerror = function(event) {
      showToast('Error', 'Failed to open database: ' + event.target.error, '❌');
  };
  
  // DOM elements
  const screens = {
      deckSelection: document.getElementById('deckSelectionScreen'),
      deckEdit: document.getElementById('deckEditScreen'),
      cardEdit: document.getElementById('cardEditScreen'),
      study: document.getElementById('studyScreen')
  };
  
  const flashcard = document.querySelector('.flashcard');
  const prevCardBtn = document.getElementById('prevCardBtn');
  const nextCardBtn = document.getElementById('nextCardBtn');
  const currentCardEl = document.getElementById('currentCard');
  const totalCardsEl = document.getElementById('totalCards');
  const progressBar = document.getElementById('progressBar');
  const studyDeckNameEl = document.getElementById('studyDeckName');
  const languageToggles = document.querySelectorAll('.language-toggle-btn');
  
  // Navigation between screens
  function showScreen(screenName) {
      Object.keys(screens).forEach(key => {
          screens[key].classList.add('hidden');
      });
      screens[screenName].classList.remove('hidden');
  }
  
  // UUID generator for unique IDs
  function generateUUID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
      });
  }
  
  // Create an empty card
  function createEmptyCard() {
      return {
          id: generateUUID(),
          question: {
              english: "",
              chinese: "",
              laos: ""
          },
          answer: {
              english: "",
              chinese: "",
              laos: ""
          },
          questionAudio: {
              english: null,
              chinese: null,
              laos: null
          },
          answerAudio: {
              english: null,
              chinese: null,
              laos: null
          }
      };
  }
  
  // Save data to IndexedDB
  function saveDecks() {
      clearTimeout(APP_STATE.saveTimeout);
      
      // Show saving indicator
      document.getElementById('savingIndicator').classList.add('show');
      document.getElementById('cardSavingIndicator').classList.add('show');
      
      APP_STATE.saveTimeout = setTimeout(() => {
          const transaction = db.transaction(["decks"], "readwrite");
          const store = transaction.objectStore("decks");
          
          // Clear existing decks
          store.clear().onsuccess = function() {
              // Add each deck
              APP_STATE.decks.forEach(deck => {
                  store.add(deck);
              });
          };
          
          transaction.oncomplete = function() {
              // Hide saving indicator
              document.getElementById('savingIndicator').classList.remove('show');
              document.getElementById('cardSavingIndicator').classList.remove('show');
          };
          
          transaction.onerror = function(event) {
              showToast('Error', 'Failed to save decks: ' + event.target.error, '❌');
          };
      }, 500); // Debounce save
  }
  
  // Load data from IndexedDB
  function loadDecksFromDB() {
      const transaction = db.transaction(["decks"], "readonly");
      const store = transaction.objectStore("decks");
      const request = store.getAll();
      
      request.onsuccess = function(event) {
          if (event.target.result.length > 0) {
              APP_STATE.decks = event.target.result;
          } else {
              // Add initial sample deck if no decks exist
              APP_STATE.decks = [initialDeck];
              saveDecks();
          }
          renderDeckList();
      };
      
      request.onerror = function(event) {
          showToast('Error', 'Failed to load decks: ' + event.target.error, '❌');
      };
  }
  
  // Show toast notification
  function showToast(title, message, icon = '✅') {
      const toast = document.getElementById('saveToast');
      document.getElementById('toastTitle').textContent = title;
      document.getElementById('toastMessage').textContent = message;
      document.getElementById('toastIcon').textContent = icon;
      
      const bsToast = bootstrap.Toast.getOrCreateInstance(toast);
      bsToast.show();
  }
  
  // Render the deck selection screen
  function renderDeckList() {
      const deckList = document.getElementById('deckList');
      const noDeckMsg = document.getElementById('noDeckMsg');
      
      deckList.innerHTML = '';
      
      if (APP_STATE.decks.length === 0) {
          noDeckMsg.classList.remove('hidden');
      } else {
          noDeckMsg.classList.add('hidden');
          
          APP_STATE.decks.forEach((deck, index) => {
              const deckCard = document.createElement('div');
              deckCard.className = 'col';
              deckCard.innerHTML = `
                  <div class="card h-100 deck-card rounded-3 p-2">
                      <div class="card-body">
                          <h5 class="card-title">${deck.name}</h5>
                          <p class="card-text fs-14 text-brown fw-normal">${deck.cards.length} cards</p>
                          <p class="card-text small text-muted fs-14">
                              Languages: ${deck.languages.map(l => l.charAt(0).toUpperCase() + l.slice(1)).join(', ')}
                          </p>
                      </div>
                      <div class="card-footer bg-transparent">
                          <div class="d-flex justify-content-between">
                              <button class="btn btn-sm btn-primary study-deck-btn rounded-pill" data-deck-index="${index}">Study</button>
                              <button class="btn btn-sm btn-outline-dark edit-deck-btn rounded-pill" data-deck-index="${index}"><span class="material-symbols-rounded fs-17">edit</span> Edit</button>
                          </div>
                      </div>
                  </div>
              `;
              deckList.appendChild(deckCard);
              
              // Add event listeners
              deckCard.querySelector('.study-deck-btn').addEventListener('click', function() {
                  startStudyingDeck(index);
              });
              
              deckCard.querySelector('.edit-deck-btn').addEventListener('click', function() {
                  editCards(index);
              });
          });
      }
  }
  
  // Update card content in study mode
  function updateCardContent() {
      const deck = APP_STATE.decks[APP_STATE.currentDeckIndex];
      const card = deck.cards[APP_STATE.currentCardIndex];
      const cardFront = document.getElementById('cardFront');
      const cardBack = document.getElementById('cardBack');
      
      // Clear previous content
      cardFront.innerHTML = '';
      cardBack.innerHTML = '';
      
      // Add question content (front of card)
      deck.languages.forEach(language => {
          if (APP_STATE.activeLanguages[language] && card.question[language]) {
              const section = document.createElement('div');
              section.className = 'language-section text-black fw-bold fs-30';
              
              const heading = document.createElement('h3');
              heading.textContent = language.charAt(0).toUpperCase() + language.slice(1);
              
              const content = document.createElement('p');
              content.textContent = card.question[language];
              
              section.appendChild(heading);
              section.appendChild(content);
              
              // Add audio button if audio exists
              if (card.questionAudio[language]) {
                  const audioControl = document.createElement('div');
                  audioControl.className = 'audio-control';
                  
                  const audioBtn = document.createElement('button');
                  audioBtn.className = 'btn btn-sm btn-outline-secondary';
                  audioBtn.innerHTML = '<span class="material-symbols-rounded">play</span> Play';
                  audioBtn.addEventListener('click', function(e) {
                      e.stopPropagation(); // Prevent card flip
                      playAudio(card.questionAudio[language]);
                  });
                  
                  audioControl.appendChild(audioBtn);
                  section.appendChild(audioControl);
              }
              
              cardFront.appendChild(section);
          }
      });
      
      // Add answer content (back of card)
      deck.languages.forEach(language => {
          if (APP_STATE.activeLanguages[language] && card.answer[language]) {
              const section = document.createElement('div');
              section.className = 'language-section';
              
              const heading = document.createElement('h3');
              heading.textContent = language.charAt(0).toUpperCase() + language.slice(1);
              
              const content = document.createElement('p');
              content.textContent = card.answer[language];
              
              section.appendChild(heading);
              section.appendChild(content);
              
              // Add audio button if audio exists
              if (card.answerAudio[language]) {
                  const audioControl = document.createElement('div');
                  audioControl.className = 'audio-control';
                  
                  const audioBtn = document.createElement('button');
                  audioBtn.className = 'btn btn-sm btn-outline-secondary';
                  audioBtn.innerHTML = '<i class="bi bi-volume-up"></i> Play';
                  audioBtn.addEventListener('click', function(e) {
                      e.stopPropagation(); // Prevent card flip
                      playAudio(card.answerAudio[language]);
                  });
                  
                  audioControl.appendChild(audioBtn);
                  section.appendChild(audioControl);
              }
              
              cardBack.appendChild(section);
          }
      });
  }
  
  // Update card edit form
  function updateCardEditForm() {
      const deck = APP_STATE.decks[APP_STATE.currentDeckIndex];
      const card = deck.cards[APP_STATE.currentEditCardIndex];
      
      document.getElementById('currentEditCard').textContent = APP_STATE.currentEditCardIndex + 1;
      
      // Update previous/next buttons state
      document.getElementById('prevEditCardBtn').disabled = APP_STATE.currentEditCardIndex === 0;
      document.getElementById('nextEditCardBtn').disabled = APP_STATE.currentEditCardIndex === deck.cards.length - 1;
      document.getElementById('deleteCardBtn').disabled = deck.cards.length <= 1;
      
      // Clear previous content
      const questionSections = document.getElementById('questionLangSections');
      const answerSections = document.getElementById('answerLangSections');
      
      questionSections.innerHTML = '';
      answerSections.innerHTML = '';
      
      // Add language sections for questions
      deck.languages.forEach(language => {
          const langSection = createLanguageEditSection(
              language, 
              'question', 
              card.question[language], 
              card.questionAudio[language]
          );
          questionSections.appendChild(langSection);
      });
      
      // Add language sections for answers
      deck.languages.forEach(language => {
          const langSection = createLanguageEditSection(
              language, 
              'answer', 
              card.answer[language], 
              card.answerAudio[language]
          );
          answerSections.appendChild(langSection);
      });
      
      // Add change listeners to all inputs
      document.querySelectorAll('#cardEditForm textarea').forEach(input => {
          input.addEventListener('input', function() {
              const type = this.dataset.type;
              const language = this.dataset.language;
              card[type][language] = this.value;
              saveDecks();
          });
      });
  }
  
  // Create language section for editing
  function createLanguageEditSection(language, type, text, audio) {
      const section = document.createElement('div');
      section.className = 'editor-section';
      
      const label = document.createElement('label');
      label.className = 'form-label';
      label.textContent = language.charAt(0).toUpperCase() + language.slice(1);
      
      const textarea = document.createElement('textarea');
      textarea.className = 'form-control mb-2';
      textarea.rows = 2;
      textarea.value = text || '';
      textarea.dataset.language = language;
      textarea.dataset.type = type;
      
      section.appendChild(label);
      section.appendChild(textarea);
      
      // Audio controls
      const audioControls = document.createElement('div');
      audioControls.className = 'd-flex align-items-center mb-3';
      
      // Record button
      const recordBtn = document.createElement('button');
      recordBtn.type = 'button';
      recordBtn.className = 'btn btn-sm btn-light me-2 rounded-pill';
      recordBtn.innerHTML = '<span class="material-symbols-rounded fs-20">mic</span> Record';
      recordBtn.addEventListener('click', function() {
          startRecording(language, type);
      });
      
      // Upload button
      const uploadBtn = document.createElement('button');
      uploadBtn.type = 'button';
      uploadBtn.className = 'btn btn-sm btn-light me-2 rounded-pill';
      uploadBtn.innerHTML = '<span class="material-symbols-rounded fs-20">upload</span> Upload';
      uploadBtn.addEventListener('click', function() {
          uploadAudio(language, type);
      });
      
      // URL button
      const urlBtn = document.createElement('button');
      urlBtn.type = 'button';
      urlBtn.className = 'btn btn-sm btn-light me-2 rounded-pill';
      urlBtn.innerHTML = '<span class="material-symbols-rounded fs-20">link</span> URL';
      urlBtn.addEventListener('click', function() {
          addAudioURL(language, type);
      });
      
      audioControls.appendChild(recordBtn);
      audioControls.appendChild(uploadBtn);
      audioControls.appendChild(urlBtn);
      
      // If audio exists, add play and remove buttons
      if (audio) {
          const playBtn = document.createElement('button');
          playBtn.type = 'button';
          playBtn.className = 'btn btn-sm btn-outline-success me-2';
          playBtn.innerHTML = '<span class="material-symbols-rounded fs-20">play</span> Play';
          playBtn.addEventListener('click', function() {
              playAudio(audio);
          });
          
          const removeBtn = document.createElement('button');
          removeBtn.type = 'button';
          removeBtn.className = 'btn btn-sm btn-outline-danger';
          removeBtn.innerHTML = '<span class="material-symbols-rounded fs-20">delete</span> Remove';
          removeBtn.addEventListener('click', function() {
              removeAudio(language, type);
          });
          
          audioControls.appendChild(playBtn);
          audioControls.appendChild(removeBtn);
      }
      
      section.appendChild(audioControls);
      
      return section;
  }
  
  // Play audio from a blob or URL
  function playAudio(audioData) {
      let audio;
      
      if (typeof audioData === 'string' && audioData.startsWith('http')) {
          // Play from URL
          audio = new Audio(audioData);
      } else if (audioData instanceof Blob) {
          // Play from Blob
          audio = new Audio(URL.createObjectURL(audioData));
      } else if (typeof audioData === 'string') {
          // Play from base64
          audio = new Audio(audioData);
      } else {
          console.error('Invalid audio data format');
          return;
      }
      
      audio.play().catch(error => {
          console.error('Error playing audio:', error);
          showToast('Error', 'Could not play audio', '❌');
      });
  }
  
  // Start recording audio
  function startRecording(language, type) {
      // If already recording, stop it
      if (APP_STATE.isRecording) {
          stopRecording();
          return;
      }
      
      // Show recording modal
      const recordingModal = new bootstrap.Modal(document.getElementById('recordingModal'));
      recordingModal.show();
      
      // Setup recording UI
      const recordButton = document.getElementById('recordButton');
      const recordingStatus = document.getElementById('recordingStatus');
      const recordingTimer = document.getElementById('recordingTimer');
      const recordingControls = document.getElementById('recordingControls');
      
      // Reset UI
      recordingStatus.textContent = 'Press the button to start recording';
      recordingTimer.classList.add('d-none');
      recordingControls.classList.add('d-none');
      recordButton.innerHTML = '<i class="bi bi-mic-fill"></i> Record';
      
      // Store recording target
      APP_STATE.currentRecordingTarget = { language, type };
      
      // Setup record button handler
      recordButton.onclick = () => {
          if (!APP_STATE.isRecording) {
              startRecordingProcess();
          } else {
              stopRecordingProcess();
          }
      };
      
      // Setup controls
      document.getElementById('playRecordingBtn').onclick = playRecording;
      document.getElementById('saveRecordingBtn').onclick = saveRecording;
      document.getElementById('discardRecordingBtn').onclick = discardRecording;
      
      // Inner function to start the actual recording
      function startRecordingProcess() {
          // Request microphone access
          navigator.mediaDevices.getUserMedia({ audio: true })
              .then(function(stream) {
                  // Create media recorder
                  APP_STATE.mediaRecorder = new MediaRecorder(stream);
                  APP_STATE.audioChunks = [];
                  
                  // Handle data available event
                  APP_STATE.mediaRecorder.addEventListener('dataavailable', function(e) {
                      APP_STATE.audioChunks.push(e.data);
                  });
                  
                  // Handle recording stop event
                  APP_STATE.mediaRecorder.addEventListener('stop', function() {
                      // Create audio blob
                      const audioBlob = new Blob(APP_STATE.audioChunks, { type: 'audio/webm' });
                      APP_STATE.currentRecording = audioBlob;
                      
                      // Update UI
                      recordingStatus.textContent = 'Recording complete';
                      recordingControls.classList.remove('d-none');
                      recordButton.innerHTML = '<i class="bi bi-mic-fill"></i> Record Again';
                      APP_STATE.isRecording = false;
                      clearInterval(APP_STATE.recordingTimerInterval);
                  });
                  
                  // Start recording
                  APP_STATE.mediaRecorder.start();
                  APP_STATE.isRecording = true;
                  
                  // Update UI
                  recordingStatus.textContent = 'Recording...';
                  recordButton.innerHTML = '<i class="bi bi-stop-fill"></i> Stop';
                  recordingTimer.classList.remove('d-none');
                  
                  // Setup timer
                  let seconds = 0;
                  recordingTimer.textContent = '00:00';
                  APP_STATE.recordingTimerInterval = setInterval(() => {
                      seconds++;
                      const minutes = Math.floor(seconds / 60);
                      const remainingSeconds = seconds % 60;
                      recordingTimer.textContent = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
                  }, 1000);
              })
              .catch(function(err) {
                  showToast('Error', 'Microphone access denied: ' + err, '❌');
              });
      }
      
      // Inner function to stop recording
      function stopRecordingProcess() {
        if (APP_STATE.mediaRecorder && APP_STATE.isRecording) {
            APP_STATE.mediaRecorder.stop();
            APP_STATE.mediaRecorder.stream.getTracks().forEach(track => track.stop());
        }
    }
    
    // Play recorded audio
    function playRecording() {
        if (APP_STATE.currentRecording) {
            const audio = new Audio(URL.createObjectURL(APP_STATE.currentRecording));
            audio.play();
        }
    }
    
    // Save the recording
    function saveRecording() {
        if (APP_STATE.currentRecording && APP_STATE.currentRecordingTarget) {
            const { language, type } = APP_STATE.currentRecordingTarget;
            const deck = APP_STATE.decks[APP_STATE.currentDeckIndex];
            const card = deck.cards[APP_STATE.currentEditCardIndex];
            
            // Convert blob to base64 for storage
            const reader = new FileReader();
            reader.readAsDataURL(APP_STATE.currentRecording);
            reader.onloadend = function() {
                const base64data = reader.result;
                
                // Store audio data
                if (type === 'question') {
                    card.questionAudio[language] = base64data;
                } else {
                    card.answerAudio[language] = base64data;
                }
                
                // Save deck and close modal
                saveDecks();
                bootstrap.Modal.getInstance(document.getElementById('recordingModal')).hide();
                
                // Update card edit form
                updateCardEditForm();
                
                showToast('Success', 'Audio recording saved', '🎤');
            };
        }
    }
    
    // Discard the recording
    function discardRecording() {
        APP_STATE.currentRecording = null;
        bootstrap.Modal.getInstance(document.getElementById('recordingModal')).hide();
    }
}

// Upload audio file
function uploadAudio(language, type) {
    // Create file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'audio/*';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);
    
    // Handle file selection
    fileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const file = this.files[0];
            
            // Check file size (limit to 5MB)
            if (file.size > 5 * 1024 * 1024) {
                showToast('Error', 'File too large (max 5MB)', '❌');
                document.body.removeChild(fileInput);
                return;
            }
            
            // Read file
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function() {
                const base64data = reader.result;
                
                // Store audio data
                const deck = APP_STATE.decks[APP_STATE.currentDeckIndex];
                const card = deck.cards[APP_STATE.currentEditCardIndex];
                
                if (type === 'question') {
                    card.questionAudio[language] = base64data;
                } else {
                    card.answerAudio[language] = base64data;
                }
                
                // Save deck
                saveDecks();
                updateCardEditForm();
                
                showToast('Success', 'Audio file uploaded', '🎵');
            };
            
            document.body.removeChild(fileInput);
        }
    });
    
    // Trigger file selection dialog
    fileInput.click();
}

// Add audio from URL
function addAudioURL(language, type) {
    const url = prompt('Enter audio URL:');
    
    if (url && url.trim()) {
        // Validate URL
        try {
            new URL(url.trim());
            
            // Store URL
            const deck = APP_STATE.decks[APP_STATE.currentDeckIndex];
            const card = deck.cards[APP_STATE.currentEditCardIndex];
            
            if (type === 'question') {
                card.questionAudio[language] = url.trim();
            } else {
                card.answerAudio[language] = url.trim();
            }
            
            // Save deck
            saveDecks();
            updateCardEditForm();
            
            showToast('Success', 'Audio URL added', '🔗');
        } catch (e) {
            showToast('Error', 'Invalid URL', '❌');
        }
    }
}

// Remove audio
function removeAudio(language, type) {
    const deck = APP_STATE.decks[APP_STATE.currentDeckIndex];
    const card = deck.cards[APP_STATE.currentEditCardIndex];
    
    if (type === 'question') {
        card.questionAudio[language] = null;
    } else {
        card.answerAudio[language] = null;
    }
    
    // Save deck
    saveDecks();
    updateCardEditForm();
    
    showToast('Success', 'Audio removed', '🗑️');
}

// Clear all audio from a deck
function clearAllAudio() {
    if (confirm('Are you sure you want to delete all audio files from this deck? This cannot be undone.')) {
        const deck = APP_STATE.decks[APP_STATE.currentDeckIndex];
        
        deck.cards.forEach(card => {
            for (const language of deck.languages) {
                card.questionAudio[language] = null;
                card.answerAudio[language] = null;
            }
        });
        
        // Save deck
        saveDecks();
        updateCardEditForm();
        
        showToast('Success', 'All audio files removed', '🗑️');
    }
}

// Edit deck settings
function editDeckSettings(deckIndex) {
    APP_STATE.currentDeckIndex = deckIndex;
    const deck = APP_STATE.decks[deckIndex];
    
    // Set form values
    document.getElementById('deckName').value = deck.name;
    document.getElementById('langEnglish').checked = deck.languages.includes('english');
    document.getElementById('langChinese').checked = deck.languages.includes('chinese');
    document.getElementById('langLaos').checked = deck.languages.includes('laos');
    
    // Update UI
    document.getElementById('deckEditTitle').textContent = 'Edit Deck';
    
    showScreen('deckEdit');
}

// Save deck settings
function saveDeckSettings() {
  // Get form values
  const name = document.getElementById('deckName').value;
  const languages = [];
  
  if (document.getElementById('langEnglish').checked) languages.push('english');
  if (document.getElementById('langChinese').checked) languages.push('chinese');
  if (document.getElementById('langLaos').checked) languages.push('laos');
  
  // Validate
  if (!name.trim()) {
      showToast('Error', 'Deck name is required', '❌');
      return;
  }
  
  if (languages.length === 0) {
      showToast('Error', 'At least one language is required', '❌');
      return;
  }
  
  // Create new deck or update existing one
  if (APP_STATE.currentDeckIndex === -1) {
      // New deck
      const newDeck = {
          id: generateUUID(),
          name: name.trim(),
          languages: languages,
          cards: [createEmptyCard()]
      };
      
      APP_STATE.decks.push(newDeck);
      APP_STATE.currentDeckIndex = APP_STATE.decks.length - 1;
  } else {
      // Update existing deck
      const deck = APP_STATE.decks[APP_STATE.currentDeckIndex];
      deck.name = name.trim();
      
      // Handle language changes
      const removedLanguages = deck.languages.filter(lang => !languages.includes(lang));
      const addedLanguages = languages.filter(lang => !deck.languages.includes(lang));
      
      // Update languages
      deck.languages = languages;
      
      // Handle removed languages - clear data for removed languages
      if (removedLanguages.length > 0) {
          deck.cards.forEach(card => {
              removedLanguages.forEach(lang => {
                  card.question[lang] = '';
                  card.answer[lang] = '';
                  card.questionAudio[lang] = null;
                  card.answerAudio[lang] = null;
              });
          });
      }
  }
  
  // Save decks
  saveDecks();
  
  // Show card edit screen
  editCards(APP_STATE.currentDeckIndex);
}

// Start studying a deck
function startStudyingDeck(deckIndex) {
    APP_STATE.currentDeckIndex = deckIndex;
    APP_STATE.currentCardIndex = 0;
    const deck = APP_STATE.decks[deckIndex];
    
    // Reset card flip
    flashcard.classList.remove('flipped');
    
    // Update UI
    studyDeckNameEl.textContent = deck.name;
    totalCardsEl.textContent = deck.cards.length;
    currentCardEl.textContent = APP_STATE.currentCardIndex + 1;
    updateProgressBar();
    updateCardContent();
    updateNavButtons();
    
    // Configure language toggles
    languageToggles.forEach(toggle => {
        const language = toggle.dataset.language;
        if (deck.languages.includes(language)) {
            toggle.classList.remove('d-none');
            toggle.classList.add('active');
            APP_STATE.activeLanguages[language] = true;
        } else {
            toggle.classList.add('d-none');
            APP_STATE.activeLanguages[language] = false;
        }
    });
    
    showScreen('study');
}

// Edit cards in a deck
function editCards(deckIndex) {
    APP_STATE.currentDeckIndex = deckIndex;
    APP_STATE.currentEditCardIndex = 0;
    const deck = APP_STATE.decks[deckIndex];
    
    // Update UI
    document.getElementById('cardEditDeckName').textContent = `Edit Cards - ${deck.name}`;
    document.getElementById('totalEditCards').textContent = deck.cards.length;
    updateCardEditForm();
    
    showScreen('cardEdit');
}

// Add new card
function addNewCard() {
    const deck = APP_STATE.decks[APP_STATE.currentDeckIndex];
    deck.cards.push(createEmptyCard());
    
    // Update UI
    document.getElementById('totalEditCards').textContent = deck.cards.length;
    APP_STATE.currentEditCardIndex = deck.cards.length - 1;
    document.getElementById('currentEditCard').textContent = APP_STATE.currentEditCardIndex + 1;
    
    // Update form
    updateCardEditForm();
    
    // Save decks
    saveDecks();
}

// Delete current card
function deleteCurrentCard() {
    const deck = APP_STATE.decks[APP_STATE.currentDeckIndex];
    
    // Don't allow deleting the last card
    if (deck.cards.length <= 1) {
        showToast('Error', 'Cannot delete the last card', '❌');
        return;
    }
    
    // Show confirmation dialog
    if (confirm('Are you sure you want to delete this card?')) {
        // Remove card
        deck.cards.splice(APP_STATE.currentEditCardIndex, 1);
        
        // Adjust current index if needed
        if (APP_STATE.currentEditCardIndex >= deck.cards.length) {
            APP_STATE.currentEditCardIndex = deck.cards.length - 1;
        }
        
        // Update UI
        document.getElementById('totalEditCards').textContent = deck.cards.length;
        document.getElementById('currentEditCard').textContent = APP_STATE.currentEditCardIndex + 1;
        
        // Update form
        updateCardEditForm();
        
        // Save decks
        saveDecks();
    }
}

// Export deck
function exportDeck() {
    const deck = APP_STATE.decks[APP_STATE.currentDeckIndex];
    
    // Create a copy of the deck for export
    const exportDeck = JSON.parse(JSON.stringify(deck));
    
    // Create export options
    const modalBody = document.getElementById('importExportModalBody');
    modalBody.innerHTML = `
        <p>Export options for "${deck.name}":</p>
        <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exportAudio" checked>
            <label class="form-check-label" for="exportAudio">Include audio files</label>
            <small class="form-text text-muted d-block">
                Without audio, the file will be much smaller but won't contain any recorded sounds.
            </small>
        </div>
        <button id="downloadExportBtn" class="btn btn-dark rounded-pill">Download Export File</button>
        <div class="spacer-sm"></div>
    `;
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('importExportModal'));
    document.getElementById('importExportModalTitle').textContent = 'Export Deck';
    modal.show();
    
    // Handle export
    document.getElementById('downloadExportBtn').addEventListener('click', function() {
        const includeAudio = document.getElementById('exportAudio').checked;
        
        // If not including audio, remove audio data
        if (!includeAudio) {
            exportDeck.cards.forEach(card => {
                for (const lang in card.questionAudio) {
                    card.questionAudio[lang] = null;
                }
                for (const lang in card.answerAudio) {
                    card.answerAudio[lang] = null;
                }
            });
        }
        
        // Create download link
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportDeck));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${deck.name}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        
        // Hide modal
        modal.hide();
    });
}

// Export all decks
function exportAllDecks() {
    // Create export options
    const modalBody = document.getElementById('importExportModalBody');
    modalBody.innerHTML = `
        <p>Export options for all decks:</p>
        <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exportAllAudio" checked>
            <label class="form-check-label" for="exportAllAudio">Include audio files</label>
            <small class="form-text text-muted d-block">
                Without audio, the file will be much smaller but won't contain any recorded sounds.
            </small>
        </div>
        <button id="downloadAllExportBtn" class="btn btn-primary">Download Export File</button>
    `;
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('importExportModal'));
    document.getElementById('importExportModalTitle').textContent = 'Export All Decks';
    modal.show();
    
    // Handle export
    document.getElementById('downloadAllExportBtn').addEventListener('click', function() {
        const includeAudio = document.getElementById('exportAllAudio').checked;
        
        // Create a copy of the decks for export
        const exportDecks = JSON.parse(JSON.stringify(APP_STATE.decks));
        
        // If not including audio, remove audio data
        if (!includeAudio) {
            exportDecks.forEach(deck => {
                deck.cards.forEach(card => {
                    for (const lang in card.questionAudio) {
                        card.questionAudio[lang] = null;
                    }
                    for (const lang in card.answerAudio) {
                        card.answerAudio[lang] = null;
                    }
                });
            });
        }
        
        // Create download link
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportDecks));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "flashcards_export.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        
        // Hide modal
        modal.hide();
    });
}

// Import deck(s)
function importDecks() {
    // Create import form
    const modalBody = document.getElementById('importExportModalBody');
    modalBody.innerHTML = `
        <p>Import deck(s) from a JSON file:</p>
        <div class="mb-3">
            <input class="form-control" type="file" id="importFile" accept=".json">
        </div>
        <div id="importPreview" class="mb-3 d-none">
            <p>Preview:</p>
            <div id="importPreviewContent" class="border p-2 mb-2"></div>
            <button id="confirmImportBtn" class="btn btn-primary">Import</button>
        </div>
    `;
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('importExportModal'));
    document.getElementById('importExportModalTitle').textContent = 'Import Decks';
    modal.show();
    
    // Handle file selection
    document.getElementById('importFile').addEventListener('change', function(e) {
        if (this.files && this.files[0]) {
            const file = this.files[0];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                try {
                    const importData = JSON.parse(e.target.result);
                    
                    // Check if it's a single deck or multiple decks
                    let decks = [];
                    if (Array.isArray(importData)) {
                        decks = importData;
                    } else if (importData.id && importData.name && importData.cards) {
                        decks = [importData];
                    } else {
                        throw new Error('Invalid import file format');
                    }
                    
                    // Show preview
                    const previewContent = document.getElementById('importPreviewContent');
                    previewContent.innerHTML = decks.map(deck => `
                        <div class="mb-2">
                            <strong>${deck.name}</strong>: ${deck.cards.length} cards, 
                            Languages: ${deck.languages.join(', ')}
                        </div>
                    `).join('');
                    
                    document.getElementById('importPreview').classList.remove('d-none');
                    
                    // Handle import confirmation
                    document.getElementById('confirmImportBtn').onclick = function() {
                        // Add decks to app state
                        decks.forEach(deck => {
                            // Generate new IDs to avoid conflicts
                            deck.id = generateUUID();
                            deck.cards.forEach(card => {
                                card.id = generateUUID();
                            });
                            
                            APP_STATE.decks.push(deck);
                        });
                        
                        // Save decks
                        saveDecks();
                        
                        // Update UI
                        renderDeckList();
                        
                        // Hide modal
                        modal.hide();
                        
                        showToast('Success', `Imported ${decks.length} deck(s)`, '📥');
                    };
                } catch (err) {
                    showToast('Error', 'Invalid file format: ' + err.message, '❌');
                }
            };
            
            reader.readAsText(file);
        }
    });
}

// Update progress bar
function updateProgressBar() {
    const deck = APP_STATE.decks[APP_STATE.currentDeckIndex];
    const progress = ((APP_STATE.currentCardIndex + 1) / deck.cards.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Update navigation buttons state
function updateNavButtons() {
    const deck = APP_STATE.decks[APP_STATE.currentDeckIndex];
    
    prevCardBtn.disabled = APP_STATE.currentCardIndex === 0;
    nextCardBtn.disabled = APP_STATE.currentCardIndex === deck.cards.length - 1;
}

// Event Listeners
document.getElementById('createDeckBtn').addEventListener('click', createNewDeck);
document.getElementById('backToDeckListBtn').addEventListener('click', () => showScreen('deckSelection'));

document.getElementById('backToDeckBtn').addEventListener('click', () => {
  // Update the deck list first, then show the selection screen
  renderDeckList();
  showScreen('deckSelection');
});

document.getElementById('backToDecksBtn').addEventListener('click', () => {
  renderDeckList();
  showScreen('deckSelection');
});

document.getElementById('editDeckBtn').addEventListener('click', () => editCards(APP_STATE.currentDeckIndex));
document.getElementById('clearAudioBtn').addEventListener('click', clearAllAudio);
document.getElementById('exportDeckBtn').addEventListener('click', exportDeck);
document.getElementById('exportAllBtn').addEventListener('click', exportAllDecks);
document.getElementById('importBtn').addEventListener('click', importDecks);
document.getElementById('deleteDeckBtn').addEventListener('click', deleteDeck);

document.getElementById('deckEditForm').addEventListener('submit', function(e) {
    e.preventDefault();
    saveDeckSettings();
});

// Card navigation in edit mode
document.getElementById('prevEditCardBtn').addEventListener('click', function() {
    if (APP_STATE.currentEditCardIndex > 0) {
        APP_STATE.currentEditCardIndex--;
        updateCardEditForm();
    }
});

document.getElementById('nextEditCardBtn').addEventListener('click', function() {
    const deck = APP_STATE.decks[APP_STATE.currentDeckIndex];
    if (APP_STATE.currentEditCardIndex < deck.cards.length - 1) {
        APP_STATE.currentEditCardIndex++;
        updateCardEditForm();
    }
});

document.getElementById('renameDeckBtn').addEventListener('click', renameDeck);
document.getElementById('newCardBtn').addEventListener('click', addNewCard);
document.getElementById('deleteCardBtn').addEventListener('click', deleteCurrentCard);

// Card navigation in study mode
flashcard.addEventListener('click', function() {
    this.classList.toggle('flipped');
});

prevCardBtn.addEventListener('click', function() {
    if (APP_STATE.currentCardIndex > 0) {
        APP_STATE.currentCardIndex--;
        flashcard.classList.remove('flipped');
        currentCardEl.textContent = APP_STATE.currentCardIndex + 1;
        updateCardContent();
        updateProgressBar();
        updateNavButtons();
    }
});

nextCardBtn.addEventListener('click', function() {
    const deck = APP_STATE.decks[APP_STATE.currentDeckIndex];
    if (APP_STATE.currentCardIndex < deck.cards.length - 1) {
        APP_STATE.currentCardIndex++;
        flashcard.classList.remove('flipped');
        currentCardEl.textContent = APP_STATE.currentCardIndex + 1;
        updateCardContent();
        updateProgressBar();
        updateNavButtons();
    }
});

// Language toggle in study mode
languageToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
        const language = this.dataset.language;
        APP_STATE.activeLanguages[language] = !APP_STATE.activeLanguages[language];
        this.classList.toggle('active');
        updateCardContent();
    });
});

// Touch swipe functionality for card navigation
let touchStartX = 0;
let touchEndX = 0;

flashcard.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

flashcard.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - go to next card
        nextCardBtn.click();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - go to previous card
        prevCardBtn.click();
    }
}

// Calculate and display storage usage
function calculateStorageUsage() {
    const decksCopy = JSON.parse(JSON.stringify(APP_STATE.decks));
    
    // Calculate total size
    const totalSize = new Blob([JSON.stringify(decksCopy)]).size;
    
    // Calculate size without audio
    decksCopy.forEach(deck => {
        deck.cards.forEach(card => {
            for (const lang in card.questionAudio) {
                card.questionAudio[lang] = null;
            }
            for (const lang in card.answerAudio) {
                card.answerAudio[lang] = null;
            }
        });
    });
    
    const sizeWithoutAudio = new Blob([JSON.stringify(decksCopy)]).size;
    
    // Calculate audio size
    const audioSize = totalSize - sizeWithoutAudio;
    
    return {
        total: formatBytes(totalSize),
        audio: formatBytes(audioSize),
        data: formatBytes(sizeWithoutAudio)
    };
}

// Format bytes to human-readable size
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Create new deck
function createNewDeck() {
    APP_STATE.currentDeckIndex = -1;
    
    // Reset form
    document.getElementById('deckEditForm').reset();
    document.getElementById('deckEditTitle').textContent = 'Create New Deck';
    
    showScreen('deckEdit');
}

/** ADDED */

// Delete current deck
function deleteDeck() {
  const deck = APP_STATE.decks[APP_STATE.currentDeckIndex];
  
  // Show confirmation dialog with the deck name to ensure users know what they're deleting
  const confirmMessage = `Are you sure you want to delete the deck "${deck.name}"?\n\nThis action cannot be undone.`;
  
  if (confirm(confirmMessage)) {
      // Remove deck from array
      APP_STATE.decks.splice(APP_STATE.currentDeckIndex, 1);
      
      // Save decks
      saveDecks();
      
      // Return to deck selection screen
      showScreen('deckSelection');
      
      // Update deck list
      renderDeckList();
      
      showToast('Success', `Deck "${deck.name}" has been deleted`, '🗑️');
  }
}

function renameDeck() {
  const deck = APP_STATE.decks[APP_STATE.currentDeckIndex];
  
  // Show prompt with current name
  const newName = prompt('Enter new deck name:', deck.name);
  
  // If user didn't cancel and provided a name
  if (newName !== null && newName.trim() !== '') {
      const oldName = deck.name;
      deck.name = newName.trim();
      
      // Save decks
      saveDecks();
      
      // Update card edit header
      document.getElementById('cardEditDeckName').textContent = `Edit Cards - ${deck.name}`;
      
      showToast('Success', `Deck renamed from "${oldName}" to "${deck.name}"`, '✏️');
  } else if (newName !== null && newName.trim() === '') {
      showToast('Error', 'Deck name cannot be empty', '❌');
  }
}


// Initialize the app when DOM is loaded
showScreen('deckSelection');
});
