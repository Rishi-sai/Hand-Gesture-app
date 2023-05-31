prediction= "";


//https://teachablemachine.withgoogle.com/models/Thx-6XyBL/model.json

Webcam.set({
   width:350,
   height:300,
   image_format : 'png',
   png_quality:90 
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap (function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
    
}
console.log('ml5 version:',ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Thx-6XyBL/model.json',modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
    
}

function speak() {
    var sybth = window.speechSynthesis;
    speak_data = toSpeak;
    
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    }else{

        console.log(results);
        document.getElementById("result_gesture__name").innerHTML = results[0].label;
        prediction = results[0].label;
toSpeak = "";
        if (prediction == "Amazing") {
            toSpeak = "This is Amazing";
            document.getElementById("update_gesture").innerHTML = "&#128076;;";
        }else if(prediction == "Victory"){
            toSpeak = "This is Victory";
            document.getElementById("update_gesture").innerHTML = "&#9996;";

        }else if(prediction == "Best"){
            toSpeak = "This is Best";
            document.getElementById("update_gesture").innerHTML = "&#128077;";

        }else if(prediction == "Yo-yo"){
            toSpeak = "This is Yo-yo";
            document.getElementById("update_gesture").innerHTML = "&#129304;";

        }else if(prediction == "Not good"){
            toSpeak = "This is Not good";
            document.getElementById("update_gesture").innerHTML = "&#128078;";

        }


speak();

    }





    
}