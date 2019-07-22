function indexHoverChange(image) {
    if (image == "Patient"){
        document.getElementById("indexImageHover").src = "image/largeyellow.png"
    }
    else if (image == "Healthcare Professionals"){
        document.getElementById("indexImageHover").src = "image/largegreen.png"
    }
    else if (image == "Community Partners"){
        document.getElementById("indexImageHover").src = "image/largepurple.png"
    }
    else{
        document.getElementById("indexImageHover").src = "image/largeblue.png"
    }
}