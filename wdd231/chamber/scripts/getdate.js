let yr = new Date().getFullYear();
    let lastModified = document.lastModified;
    let author = "Venezuela";
    let place = "Chamber of Commerce";
 
document.getElementById("copywrite").innerHTML = `\u00A9 ${yr} ${author} ${place}`;
document.getElementById("lastModified").innerHTML = `Last Modified: ${lastModified}`;