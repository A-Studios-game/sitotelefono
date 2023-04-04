navigator.mediaDevices.getUserMedia({ video: true })
  .then(function(stream) {
    var video = document.getElementById("video");
    video.srcObject = stream;
  })
  .catch(function(err) {
    console.log("Errore nell'ottenere l'accesso alla fotocamera:", err);
  });
  var peerConnection = new RTCPeerConnection();

// Aggiungere lo stream video alla connessione peer-to-peer
stream.getTracks().forEach(function(track) {
  peerConnection.addTrack(track, stream);
});

// Creare un'offerta di connessione
peerConnection.createOffer().then(function(offer) {
  return peerConnection.setLocalDescription(offer);
}).then(function() {
  // Invia l'offerta di connessione al server
}).catch(function(err) {
  console.log("Errore nella creazione dell'offerta di connessione:", err);
});
// Ricevere l'offerta di connessione dal telefono
peerConnection.setRemoteDescription(offer)
  .then(function() {
    // Creare una risposta di connessione
    return peerConnection.createAnswer();
  })
  .then(function(answer) {
    return peerConnection.setLocalDescription(answer);
  })
  .then(function() {
    // Invia la risposta di connessione al telefono
  })
  .catch(function(err) {
    console.log("Errore nella gestione della connessione peer-to-peer:", err);
  });

// Aggiungere un listener per ricevere i pacchetti di dati dal telefono
peerConnection.addEventListener('track', function(event) {
  var stream = event.streams[0];
  var video = document.getElementById("video");
  video.srcObject = stream;
});
