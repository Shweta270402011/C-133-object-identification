function setup() {
    canvas=createCanvas(640,420);
    canvas.center();

    objDetect=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="status: detecting Objects";

} 

img="";
status="";
objects=[];



function preload() {
img=loadImage("dog-and-kitten.jpg");

}

function modelLoaded() {
    console.log("modelLoaded");
    status=true;
    objDetect.detect(img,gotResult);
   }


function draw() {
    image(img,0,0,640,420);
    /*stroke("red");
    noFill();
    rect(30,60,450,350);
    text("dog",45,75);

    stroke("red");
    noFill();
    rect(300,90,270,320);
    text("cat",320,120);*/
    if(status!="") {
        for(i=0; i<objects.length; i++) {
            document.getElementById("status").innerHTML="status:object Detected  ";
            per=floor(objects[i].confidence*100);
            text(objects[i].label+" "+per+"%",objects[i].x,objects[i].y);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }
    }
}




function gotResult(error,results) {
if (error) {
    console.error(error);
}
else {
    console.log(results);
    objects=results;
}
}

