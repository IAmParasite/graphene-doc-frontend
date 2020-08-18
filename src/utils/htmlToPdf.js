// utils -> htmlToPdf.js
// 导出页面为PDF格式
import html2Canvas from "html2canvas";
import JsPDF from "jspdf";
export default {
  install(Vue) {
    Vue.prototype.getPdf = function() {
      var title = this.htmlTitle;     // 需要导出页面的标题，在导出的页面的data中声明 htmlTitle，具体看下方代码
      html2Canvas(document.querySelector(".v-note-show"), {    // 需要导出页面内容的容器的 id 跟此处 "#pdfDom" 一致
        allowTaint: true,
        useCORS: true
      }).then(function(canvas) {
        let contentWidth = canvas.width;
        let contentHeight = canvas.height;
        let pageHeight = (contentWidth/ 592.28 * 841.89 );
        let leftHeight = contentHeight;
        let position = 0;
        let imgWidth = 595.28;
        let imgHeight = (592.28 / contentWidth) * contentHeight;
        let pageData = canvas.toDataURL("image/jpeg", 1.0);
        let PDF = new JsPDF("", "pt", "a4");
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, "JPEG", 0, 0, imgWidth, imgHeight);
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
            leftHeight -= pageHeight;
            position -= 841.89;
            if (leftHeight > 0) {
              PDF.addPage();
            }
          }
        }
        PDF.save(title + ".pdf");
      });
    };
  }
};

