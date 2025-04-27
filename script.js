document.addEventListener("DOMContentLoaded", function () {
    const downloadBtn = document.getElementById("download");
  
    if (downloadBtn) {
      downloadBtn.addEventListener("click", function () {
        const element = document.body;
  
        const opt = {
          margin: 0.5,
          filename: "cv.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };
  
        html2pdf().set(opt).from(element).save();
      });
    }
  });