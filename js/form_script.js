(function() {
 if (!("FormData" in window) || !("FileReader" in window)) {
 return;
 }
 var form = document.querySelector(".form");
 var area = form.querySelector(".upload-images");
 var template = document.querySelector("#image-template").innerHTML;
 var queue = [];
 form.addEventListener("submit", function(event) {
   event.preventDefault();
   var data = new FormData(form);
   queue.forEach(function(element) {
   data.append("images", element.file);
   });
   request(data, function(response) {
   console.log(response);
   });
 });

 //ajax

 function request(data, fn) {
   var xhr = new XMLHttpRequest();
   var time = (new Date()).getTime();
   xhr.open("post", "https://echo.htmlacademy.ru/adaptive?" + time);
   xhr.addEventListener("readystatechange", function() {
   if (xhr.readyState == 4) {
   fn(xhr.responseText);
   }
   });
   xhr.send(data);
 }

 // image preview

 form.querySelector("#upload_photo").addEventListener("change", function(){
   var files = this.files;
   for (var i = 0; i < files.length; i++) {
     preview(files[i]);
   }
   this.value = "";
 });

 function preview(file) {
   if (file.type.match(/image.*/)) {
     var reader = new FileReader();

     reader.addEventListener("load", function(event) {
       var html = Mustache.render(template, {
         "image": event.target.result,
         "name": file.name
       });

       var div = document.createElement("div");
       div.classList.add("photo__item");
       div.innerHTML = html;

       area.appendChild(div);

       div.querySelector(".photo__del").addEventListener("click", function(event) {
         event.preventDefault();
         removePreview(div);
       });

       queue.push({
         "file": file,
         "div": div
       });
     });

     reader.readAsDataURL(file);
 }

 // removes photo

 function removePreview(div) {
   queue = queue.filter(function(element) {
     return element.div != div;
   });
   div.parentNode.removeChild(div);
 }
 }
})();

// for plus minus btns (duration)

(function() {
 var elements = document.querySelectorAll(".plus-minus_duration");
 for (var i = 0; i < elements.length; i++) {
 initNumberField(elements[i]);
 }
 function initNumberField(parent) {
   var input = parent.querySelector("input");
   var minus = parent.querySelector(".plus-minus__btn--minus");
   var plus = parent.querySelector(".plus-minus__btn--plus");
   minus.addEventListener("click", function() {
     changeNumber(false);
   });
   plus.addEventListener("click", function() {
     changeNumber(true);
   });
   function changeNumber(operation) {
     var value = Number(input.value);
     if (isNaN(value)) {
       value = 0;
     }
     if (operation) {
       input.value = value + 1;
     } else {
       input.value = value - 1;
     }
   }
 }
})();

// companions

(function () {
  "use strict";
  var pink = document.querySelector("body");

  pink.inputValueInc = function (input) {
    if (!!input) {
      var sum = parseInt(input.value);
      if (isNaN(sum)) {
        sum = 0;
      }
      input.value = sum + 1;
    }
  };

  pink.inputValueDec = function (input) {
  if (!!input) {
    var sum = parseInt(input.value);
    if (isNaN(sum)) {
      sum = 0;
    }
    input.value = sum - 1;
  }
};
  var companionsArea = document.querySelector(".form__item .companions");
  var companionsCount = document.querySelector("#companions_count");
  var companionsCountMinus = document.querySelector("#companions_count_minus");
  var companionsCountPlus = document.querySelector("#companions_count_plus");

  !!companionsCountPlus && companionsCountPlus.addEventListener("click", function(event) {
    event.preventDefault();
    addCompanion();
  });

  !!companionsCountMinus && companionsCountMinus.addEventListener("click", function(event) {
    event.preventDefault();
    delCompanion();
  });

  function addCompanion() {
    var templateCompanions = document.querySelector("#companion-template").innerHTML;
    var companionNum = companionsArea.querySelectorAll(".form__item .companions").length + 1;

    if (!!companionsArea && !!templateCompanions) {
      var html = Mustache.render(templateCompanions, {
        "num": companionNum
      });
      companionsArea.innerHTML = companionsArea.innerHTML + html;
      pink.inputValueInc(companionsCount);
    };
  };

  function delCompanion() {
    if (!!companionsCount && companionsCount.value > 0) {

      var companionAll = !!companionsArea && companionsArea.querySelectorAll(".form__item .companions");
      var elem = companionAll[companionAll.length - 1];

      !!companionAll && companionsArea.removeChild(elem);
      pink.inputValueDec(companionsCount);
    }
  }
}());
