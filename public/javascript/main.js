function indexHoverChange(image) {
    if (image == "Patient"){
        document.getElementById("indexImageHover").src = "image/index/patients.jpg"
    }
    else if (image == "Visitors"){
        document.getElementById("indexImageHover").src = "image/index/visitors.jpg"
    }
    else if (image == "Healthcare Professionals"){
        document.getElementById("indexImageHover").src = "image/index/healthcare_professionals.jpg"
    }
    else if (image == "Community Partners"){
        document.getElementById("indexImageHover").src = "image/index/community.jpg"
    }
    else{
        document.getElementById("indexImageHover").src = "image/index/largeblue.png"
    }
}